---
title Arena Allocator - Part 1
date 4th Aug, 2024
last_modified_at
---

## The What
The idea behind a arena allocator is to group lifetimes
of allocated memory as much as possible and release it at once,
thus making memory management far more simpler.

A super simple example of how an arena might be used is this:
```c
arena_t arena;
arena_make(&arena); // Create a arena

// Allocate some memory
int *a = arena_alloc(sizeof(int));
char *b = arena_alloc(sizeof(char));
long long *c = arena_alloc(sizeof(long long));

// Do something with all of this

arena_destroy(&arena); // free all the memory
```
See how simple freeing the memory was? You allocated all the memory
you needed and released it all at once.

Infact if a function allocates memory, you can pass arena to it and
and then the function can use it allocate the memory it will return
and that memory is also release once your arena is destroyed.

A great example of it is this:
```c
arena_t arena;
arena_make(&arena);

char* outputFileName = arena_calloc(&arena, strlen(fileName) + 3);
if (outputFileName == NULL) goto free;
memcpy(outputFileName, fileName, extIndex + 1);
memcpy(outputFileName + extIndex + 1, "html", 4);

char* outputFilePath = fs_join_path(&arena, build, outputFileName);
if (outputFilePath == NULL) goto free;

char* inputFilePath = fs_join_path(&arena, root, fileName);
if (inputFilePath == NULL) goto free;

char* inputText = fs_read_file(&arena, inputFilePath);
if (inputText == NULL) goto free;

// Do something with all of this

free:
arena_destroy(&arena);
```
- The `fs_join_path` returns a newly allocated memory that contains 2 paths
  joined with appropriate path separator.
- The `fs_read_file` returns a newly allocated memory that contains file
  contents of a file.

By passing arena to the function the lifetime of that memory is now tied to
the arena and that memory is automatically released once the arena is destroyed.

## The Why
It's just simple, with no significant cost in runtime most of your memory
management code can now be heavily simplified, and worrying about freeing
memory would be least of your concerns.

## The How
Most basic type of arena allocator is this:
```c
typedef struct {
	void* data;
	unsigned int size, curr;
} arena_t;

void arena_make(arena_t* a) {
	a->data = calloc(1024, 1);
	a->size = 1024;
	a->curr = 0;
}

void* arena_alloc(arena_t* a, unsigned int size) {
	if (a->size - a->curr > size) {
		void* ptr = a->data + a->curr;
		a->curr += size;
		return ptr;
	}

	return NULL;
}

void arena_destroy(arena_t* a) {
	free(a->data);
	a = (arena_t){0};
}
```
a block of memory is allocated by `arena_make` and then when user requests
memory from arena, the logic checks if that much amount is available, if
so then it returns a pointer that points to `a->curr` in the `a->data` memory
and the `a->curr` is incremented by the amount of memory requested.  Finally
all the allocations can be simply released by `arena_destroy`.

And while this can still be very useful, this might not be just enough
for various cases where arena might need to grow.

Sadly we can't use `a->data = realloc(a->data, size)` since the newly
returned pointer by `realloc` isn't guaranteed to be same as old one.

We can go much memory lower-level and map pages of memory for us to use
but lets look at another relatively simple and very portable solution.

```c
typedef struct {
	char *data;
	unsigned int size, curr;
} arena_block_t;

typedef struct {
	arena_block_t *blocks;
	unsigned int numBlocks;
} arena_t;


int arena_make(arena_t* out) {
	arena_t a;
	a.numBlocks = 1;
	a.blocks = (arena_block_t*)malloc(sizeof(*a.blocks));
	if (a.blocks == NULL) return 1;

	a.blocks[0].curr = 0;
	a.blocks[0].size = 1024;
	a.blocks[0].data = (char*)malloc(1024);
	if (a.blocks[0].data == NULL) return 1;

	*out = a;

	return 0;
}

void* arena_alloc(arena_t* arena, unsigned int size) {
	int blockToUse = -1;
	for (unsigned int i = 0; i < arena->numBlocks; i++) {
		if (arena->blocks[i].size - (arena->blocks[i].curr) > size) {
			blockToUse = i;
			i++;
		}
	}

	if (blockToUse < 0) {
		arena->blocks = (arena_block_t*)realloc(arena->blocks, (arena->numBlocks + 1) * sizeof(*arena->blocks));
		if (arena->blocks == NULL) {
			return NULL;
		}
		arena->numBlocks++;
		blockToUse = arena->numBlocks - 1;

		arena->blocks[blockToUse].curr = 0;
		arena->blocks[blockToUse].size = size;
		arena->blocks[blockToUse].data = (char*)malloc(size);
		if (arena->blocks[blockToUse].data == NULL) {
			return NULL;
		}
	}

	void* ret = arena->blocks[blockToUse].data + arena->blocks[blockToUse].curr;
	arena->blocks[blockToUse].curr += size;

	return ret;
}

void arena_destroy(arena_t* arena) {
	for (unsigned int i = 0; i < arena->numBlocks; i++) {
		free(arena->blocks[i].data);
	}
	free(arena->blocks);
	arena->numBlocks = 0;
	arena->blocks = NULL;
}
```
While this looks very complicated it's very simple to understand, The `arena_t`
holds various `arena_block_t`, each `arena_block_t` is basically an arena of it's
own whose size is by default `1024`, so when user requests some memory from arena,
the program goes through each block and selects whichever has the amount of requested
memory and returns a pointer to the writeable memory.  BUT if none of the blocks have
that amount of memory then a new `arena_block_t` is added in the `arena_t` which can
hold the requested size amount exactly and then a pointer is returned to the writeable
memory.

You can view <https://codeberg.org/0ref/arena> for a much more "modular" implementation.

In part 2 we'll see how we can leverage memory mapping to simplify our arena implementation
much further and make it even faster.
