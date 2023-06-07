---
title: "How to use diff tools to patch files?"
date: 2023-06-07T22:56:50+08:00
tags: [git, diff]
categories: [ShellNotes]
image: "cover.jpg"
toc: true
description: Introduce the `diff` command and `git diff` command to patch files
---
## `diff` and `patch` command to patch files
1. use `diff` command to generate patch file
```bash
diff -u old_file new_file > change.patch
```

2. apply `patch` to change old file to new one
```bash
patch old_file change.patch
```

{{<notice tip>}}

`-u` parameter will make the diff output use **unified** output format, which 
is easy-to-read like `git diff`'s output. It is optional.

{{</notice>}}

## `git diff` usage
