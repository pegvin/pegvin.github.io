---
title Android Apps in C
date 21st Apr, 2024
last_modified_at
---

Android apps are heavily sandboxed using Android Runtime (ART)
& All of the Android APIs are only available using Java. So
whilst it is possible to run native code on Android, If you
want to make a `.apk`, You need a Java wrapper to run your native
code (There's a way around & I'll talk about that later).

Around Android 1.6, NDK was introduced. It was a way to offload
performance intensive tasks to native code using C/C++. This also
meant that NDK would only expose some Android APIs & Most of the
Android APIs would still be sitting behind Java & To use them in
your native code or to interact with your App's Java code,
You'd need Java Native Interface (JNI).

Now, The Android API provides a [NativeActivity](https://developer.android.com/reference/android/app/NativeActivity)
class which is just a Java wrapper for your Native code & The
documentation puts it really nicely:

> Convenience for implementing an activity that will be implemented
> purely in native code. That is, a game (or game-like thing). There
> is no need to derive from this class; you can simply declare it in
> your manifest, and use the NDK APIs from there.

This is what [CNLohr](https://www.youtube.com/@CNLohr) used in his
project [rawdrawandroid](https://github.com/cnlohr/rawdrawandroid).
And his video on the topic is the primary inspiration behind this
article.

[![Android WITHOUT JAVA - YouTube Video By CNLohr](https://img.youtube.com/vi/Cz_LvaN36Ag/0.jpg)](https://youtu.be/Cz_LvaN36Ag)

Although his Makefile was pretty messy to me, So tried to simplify
things alot & You can view that here: <https://github.com/pegvin/rawdrawandroid>

---

References:
- https://developer.android.com/tools/aapt2
- https://connortumbleson.com/2018/02/19/taking-a-look-at-aapt2/
- https://github.com/android/ndk
- https://developer.android.com/develop/ui/views/layout/display-cutout
- https://youtu.be/-JQWrNUDud8
- https://www.reddit.com/r/C_Programming/comments/1avg1na/a_phone_app_in_c/
- https://stackoverflow.com/questions/12822185/is-it-possible-to-create-ui-elements-with-the-ndk-lack-of-specs-in-android-d
- https://www.hanshq.net/command-line-android.html
- https://github.com/scummvm/scummvm/tree/master/backends/platform/android
- https://source.android.com/docs/core/runtime
- https://stackoverflow.com/a/4121660/14516016
- https://youtu.be/NT8blJ2-jeU
- https://www.youtube.com/playlist?list=PL0C9C46CAAB1CFB2B
- https://hereket.com/posts/android_from_command_line/
