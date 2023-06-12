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
1. get the changes between the workspace and staging area
```bash
git diff > change.patch
```

2. get the change between an old version of your local repository and new one.
```bash
git diff old_commit_hash new_commit_hash > change.patch
```

3. diff for one file but not whole folder
```bash
git diff old_commit new_commit $file_name > change.patch
```

4. apply patches
```bash
git apply change.patch
```

{{<notice tip>}}

`git reflog` will show a more short commit hash code which is enough for the 
`git diff` command

{{</notice>}}