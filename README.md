## 目标：兼容小程序云开发

本仓库主要提供一个如何通过 chameleon-tool 开发小程序端的云开发案例;
因为各端的兼容性问题，目前云开发暂时不集成到 chameleon 命令行内部，提供通过配置的方式进行兼容云开发，具体实现步骤如下；

## 使用chameleon开发小程序云开发步骤

首先要全局安装 chameleon-tool

```
npm i chameleon-tool -g 
```

### 1 在项目根目录新建 `project.config.json` 文件

参考微信[配置](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/functions/ide.html)


```json
{
	"cloudfunctionRoot": "cloudfunctions/",
	"setting": {
		"urlCheck": true,
		"es6": true,
		"postcss": true,
		"minified": true,
		"newFeature": true,
		"enhance": true
	},
	"appid": "wx2dd60ffdc3f8f2bb",
	"projectname": "chameleon-x-cloud",
	"libVersion": "2.8.1",
	"simulatorType": "wechat",
	"simulatorPluginLibVersion": {}
}
```
### 2 新建云开发目录

比如在项目根目录添加 cloudfunctions/  所有的云函数在该目录中

### 3 在chameleon.config.js 中新增 webpack 回调处理，将云开发目录copy到dist/wx的目录中去；


**主要目的是将 project.config.json 和 云函数目录加到构建后的目录中去**


`cml.projectRoot` 代表当前项目的根目录；

- 安装相关插件

```
npm i copy-webpack-plugin@4.5.2 -D
```

- 在文件首部引入相关依赖


```javascript
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
```
- 在回调中修改配置,将 project.config.json 和 云函数目录加到构建后的目录中去

```javascript
cml.utils.plugin('webpackConfig', function(params) {
  let { type, media, webpackConfig } = params
  if (type === 'wx') {
    debugger;
    console.log('rebuild')
    let projectConfigPath = path.resolve(cml.projectRoot,'project.config.json');
    //新增配置，将project.config.json 和 云函数目录copy到对应的仓库即可
    if(fs.existsSync(projectConfigPath) && fs.statSync(projectConfigPath).isFile()){
      const projectConfigJson = JSON.parse(fs.readFileSync(projectConfigPath));
      const outputPath = webpackConfig.output.path;
      const from = path.resolve(cml.projectRoot,projectConfigJson.cloudfunctionRoot);
      const to = path.resolve(outputPath,projectConfigJson.cloudfunctionRoot);
      const fromJson = path.resolve(cml.projectRoot,'project.config.json');
      const toJson = path.resolve(outputPath,'project.config.json');
      webpackConfig.plugins.push(
        new CopyWebpackPlugin([
          {
            from,
            to
          }
        ], {}),
      ),
      webpackConfig.plugins.push(
        new CopyWebpackPlugin([
          {
            from:fromJson,
            to:toJson
          }
        ], {}),
      )
    }
    
  }
  return { type, media, webpackConfig }
})

```
### 4 开发尝试

在项目根目录执行 `cml wx dev -n` ; 用微信开发者工具打开 `dist/wx` 即可看到效果；





