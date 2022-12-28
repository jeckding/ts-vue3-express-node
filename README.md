# Typescript + Express + Vue 3  
  Express + Vue 3 + Typescript  

`npm run serve` 同时运行客户端和服务器项目
 
`npm run build` 将客户端和服务器项目构建到 dist/

#### 如果你想单独运行服务器和客户端
 
`npm run dev:client` 运行客户端项目。
 
`npm run dev:server` 运行服务器项目。
  
  
`npm run build:client` 构建客户端项目。
 
`npm run build:server` 构建服务器项目。

项目使用concurrently同时启用多个进程；

server目录下为服务端：node + express
src下为客户端：vue3 + ts 