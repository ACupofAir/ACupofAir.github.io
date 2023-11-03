---
title: "ssh and scp Summary"
date: 2023-03-13T15:38:50+08:00
tags: [ssh, vscode, note]
categories: [ShellNotes]
image: "cover.png"
toc: true
description: 记录一下使用ssh协议跳板机代理环境连接vscode remote，以及服务器和本地中scp传输文件
---
## Config of vscode remote

> 目前遇过最复杂的场景就是需要配置代理连接跳板机，然后跳板机连服务器

vscode 的 ssh 配置可以通过命令搜索`ssh config`来打开`~/.ssh/config`文件

### 跳板机配置

> 跳板机和主机在同一网络环境中，主机通过跳板机来连接服务器，配置如下

- 直接在`~/.ssh/config`这个文件中配置

  ```julia
  Host target-server
      HostName xx.xx.xx.xx
      User $username
      ProxyJump target-server-gateway

  Host target-server-gateway
      HostName yy.yy.yy.yy
      User $username
  ```

- vscode `connect to host`命令的下拉选项中选择刚刚命名的 hostname`target-server`

- `target-server`:为目标服务器，`$username`为登录这个服务器的用户名，与普通登录不同的点在于多了`ProxyJump`其后为跳板机的 hostname
- `target-server-gateway`: 跳板机的 hostname，配置就是普通的登录模式

### windows vscode socks5 代理连服务器

- 首先需要下载 connect 并且配置到环境变量中`#ffffff`
  ```powershell
  scoop install connect
  ```

- 配置 ssh 的 config 文件, 例子中 sock 代理为本地 1080 端口,跳板机 ip `xx.xx.xx.xx`, 目标服务器 ip `yy.yy.yy.yyy`

  ```julia
  Host target-server-gateway
      HostName xx.xx.xx.xx
      User $username
      ProxyCommand connect -S 127.0.0.1:1080 %h %p

  Host target-server
      HostName yy.yy.yy.yy
      User $username
      ProxyCommand ssh -q -W %h:%p target-server-gateway
  ```
   
{{<notice note>}}
- `connect -S proxy.example.com target.com 22`: 通过 socks 代理服务器`proxy.example.com`访问`target.com`的 ssh 服务（from chatgpt3.5)
- `ssh -q` 参数是 quiet，不输出日志；
- `ssh -W 127.0.0.1:1080 user@target-server.com`: `ssh -W`用来指定 socks 代理服务器， 使用本地 1080socks 代理以 user 用户名连接 target-server.com 服务器
- `%h %p`似乎是分别指代 `hostname` 对应的 ip 和端口号
{{</notice>}}

## ssh, scp terminal

{{<notice error>}}
terminal socks 代理配置无效问题未解决
{{</notice>}}

### ssh 跳板机连 remote
- 一个跳板机
  ```bash
  ssh user@target-server -J user@target-server-gateway
  ```
- 多个跳板机
  ```bash
  ssh -J 跳板机1 跳板机2 跳板机3 目标服务器
  ```

### scp 跳板机文件传输
{{<notice warning>}}
注意以下命令都是本地执行
{{</notice>}}

- scp 本地到远程 with 跳板机(上传)
  ```bash
  scp -o 'ProxyJump user@gateway.com' -r ./local_folder_name user@server.com:/path_to_accept_folder
  ```
{{<notice note>}}
`-o`： 用于指定 SSH 客户端选项，chatgpt 说后面跟 key=value，但实测直接像上面的命令一样用空格隔开是可行的
{{</notice>}}

- scp 远程到本地 with 跳板机(下载)
  ```bash
  scp -o 'ProxyJump user@gateway.com -p 22' user@server.com:/path ./local_file_name
  ```