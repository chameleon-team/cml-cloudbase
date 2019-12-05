## 目标：兼容小程序云开发

本仓库主要提供一个如何通过 chameleon-tool 开发小程序端的云开发案例;
因为各端的兼容性问题，目前云开发暂时不集成到 chameleon 命令行内部，提供通过配置的方式进行兼容云开发，具体实现步骤如下；

## 使用chameleon开发小程序云开发步骤

### 1 配置 chameleon.config.js

首先配置 新增一个 cloudConfig 字段，这里面用于配置各个小程序端的 云开发配置；
这里以微信云开发进行讲解；

```

```




### 2 新建云开发目录


### 3 在chameleon.config.js 中新增 webpack 回调处理，将云开发目录copy到dist/wx的目录中去；