---
title: "搭建一个smb服务器"
date: 2024-04-25T18:35:14+08:00
tags: [linux]
categories: [ShellNotes]
image: "cover.jpg"
toc: true
description: 在Ubuntu2204上搭建一个smb服务器，并让多设备连接
---

## 在Ubuntu上安装samba

```bash
sudo apt-get install samba
```

## 创建samba账号，用于别的设备登陆时的认证, 下面中的`user_name`得是linux系统本身的用户

```bash
sudo smbpasswd -a user_name
```

然后配置这个用户的samba服务密码，在别的设备上连smb服务时使用的就是这套用户名和密码

## 配置samba要共享的文件夹，在`/etc/samba/smb.conf`文件中配置

* `path`为要分享文件夹的路径
* `users`为可以登录的用户名，就是第二步中配置的`user_name`
* `[data]`为其它设备时显示的路径，如上面的配置会将服务器上`/path/to/share`映射到smb服务路径`server_ip/Data`上

```bash
[Data]
path = /path/to/share
browseable = yes
writeable = yes
guest ok = yes
valid users = user_name
```

## 启动samba服务

```python
sudo service smbd start
```

## 在其它设备上连接smb服务

* `windows`: `win` + `R`快捷键调出运行输入框，输入`\\server_ip\`回车即可，建议在文件管理器中配置磁盘映射
* `windows + wsl`: `sudo mount -t drvfs //server_ip/Data /path/to/mount`
* `ipados/ios`: 文件app中连接服务器选项中输入`smb://server_ip/Data`， 然后选择`注册用户`选项，输入用户名与密码即可
