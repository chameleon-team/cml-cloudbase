## 目标

本仓库主要提供一个如何通过 chameleon-tool 开发小程序端的云开发案例

## 使用chameleon开发小程序云开发步骤

### 1 配置 chameleon.config.js

首先配置 新增一个 cloudConfig 字段，这里面用于配置各个小程序端的 云开发配置；
这里以微信云开发进行讲解；

### 2 新建云开发目录


### 3 在chameleon.config.js 中新增 webpack 回调处理，将云开发目录copy到dist/wx的目录中去；