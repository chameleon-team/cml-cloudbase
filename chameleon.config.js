
// 设置静态资源的线上路径
const publicPath = '//www.static.chameleon.com/cml';
// 设置api请求前缀
const apiPrefix = 'https://api.chameleon.com';
const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');
cml.config.merge({
  enableLinter: false,
  check: {
    enable: false,
  },
  base: {
    dev: {
      domain: {
        domain1: "localhost",
        domain2: "localhost"
      },
    },
    build: {
      domain: {
        domain1: "http://api.cml.com",
        domain2: "http://api2.cml.com"
      },
    }
  },
  templateLang: "cml",
  templateType: "html",
  platforms: ["web","weex","wx","alipay","baidu","qq"],
  buildInfo: {
    wxAppId: '123456'
  },
  wx: {
    dev: {
    },
    build: {
      apiPrefix
    }
  },
  web: {
    dev: {
      analysis: false,
      console: false
    },
    build: {
      analysis: false,
      publicPath: `${publicPath}/web/`,
      apiPrefix
    }
  },
  weex: {
    dev: {
    },
    build: {
      publicPath: `${publicPath}/weex/`,
      apiPrefix
    },
    custom: {
      publicPath: `${publicPath}/wx/`,
      apiPrefix
    }
  }
})
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

