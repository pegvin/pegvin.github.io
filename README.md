# Personal Blog
This is the source of my personal blog
hosted at https://pegv.in

The project uses [jelly](https://codeberg.org/0ref/jelly)
to generate the site & `build.sh` is used
to automate alot of stuff.

```sh
$ ./build.sh clean  # Clean Build Files
$ ./build.sh serve  # Build, Serve on localhost:4000 & Auto-Rebuild on changes
$ ./build.sh deploy # Build & Deploy to Cloudflare Pages
$ ./build.sh unused # From `public/media`, List files with no reference anywhere else
```
