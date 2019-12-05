
// 设置静态资源的线上路径
const publicPath = '//www.static.chameleon.com/cml';
// 设置api请求前缀
const apiPrefix = 'https://api.chameleon.com';
const path = require('path');
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
  },
  cloudConfig:{
    wx:{
      "miniprogramRoot": "miniRoot/",
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
      "projectname": "cml-cloud",
      "libVersion": "2.8.1",
      "simulatorType": "wechat"
    }
  }
})
cml.utils.plugin('webpackConfig', function(params) {
  let { type, media, webpackConfig } = params
  if (type === 'wx') {
    debugger;
    const wxCloudConfig = cml.config.get().cloudConfig.wx;//拿到微信小程序云开发的配置，这里可以进行你想要的操作；
    const outputPath = webpackConfig.output.path;
    webpackConfig.output.path = path.resolve(outputPath,wxCloudConfig.miniprogramRoot)
    console.log(cml.config.get().cloudConfig.wx)
    console.log(cml.projectRoot);
    const from = path.resolve(cml.projectRoot,wxCloudConfig.cloudfunctionRoot);
    const to = path.resolve(outputPath,wxCloudConfig.cloudfunctionRoot);
    webpackConfig.plugins.push(
      new CopyWebpackPlugin([
        {
          from,
          to
        }
      ], {}),
    )
  }
  return { type, media, webpackConfig }
})

