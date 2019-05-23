# <img src="https://f.51fanbei.com/h5/app/activity/2018/01/companyicon.png" width = "40" height = "40" alt="图片名称" align=center /> [爱上街微信商城项目](http://192.168.106.70/static-web/alading-wx)

# alading-wx

> 爱上街商城项目

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 相关依赖

* [flyio](https://github.com/wendux/fly/blob/master/README-CH.md) - 同时支持浏览器、小程序、Node、Weex 及快应用的基于 Promise 的跨平台请求库
* [mpvue-entry](https://github.com/F-loat/mpvue-entry) - 集中式页面配置，不再需要重复编辑各页面的 main.js 文件
* [mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch) - 在 mpvue 中使用 vue-router 兼容的路由写法
* [xmlstring2json](https://github.com/vilien/xmlstring2json) - xml 字符串转换 json 格式，适用于微信小程序

## Tips

* 项目分为两部分，差异部分单独修改。
* `master` 作为小程序项目主分支
* `h5-master` 作为 H5 项目主分支
* 尽量避免使用不必要的小程序特有标签，如 text，image 等
* 避免直接使用 wx 对象，使用 import wx from 'wx' 的方式引入，便于 web 中改写

## 关于分包

* 目前把活动类页面分为子包
* 可通过 `root` 属性指定分包根路径，指定后 `subPackage` 属性会自动置为 `true`
* 可通过 `name` 属性指定分包别名，默认为分包目录名称，用于`分包预下载`时使用
* 可通过 `independent` 属性指定分包是否是`独立分包`，默认为`非独立分包`
* 可通过 `subPackage` 属性指定页面需分包加载

```bash
# 如 助力砍价
const helpBargain = {
  path: '/pBargain/pages/index',
  root: '/pBargain/pages',
  subPackage: true,
  name: 'bargain',
  independent: false,
  config: {
    navigationBarTitleText: '砍价免费拿'
  }
}
```

## 关于 webview

* 链接需引用`jweixin-1.3.2.js`以上版本才可调用 `wx.miniProgram`
* 传参尽量在 URL 后拼接，接收较方便（this.$root.$mp.query 即可接收）；postMessage 的方法，只在特定情况下才会接收到信息
* URL 需经过`encodeURI`后打开，避免白屏的 bug；若 URL 中有参数传递，URL 需经过`encode`转码，避免接收参数不齐全的 bug
* 目前只支持打开经过改写
  * 可视化链接（https://h5.51fanbei.com/h5/activity/201804/visualization.html?id=417&spread=wechat）
  * 搜索结果页（https://h5.51fanbei.com/h5/searchRoute/searchRoute.html?spread=wechat&searchGoodName=xx）
* 可视化链接条件：
  * `spread`参数必须为`wechat`，若要在 webview 中打开新的 webview，注意`spread`参数也必须为`wechat`
  * 可配置热区跳商品，跳链接（只能为可视化链接），不可配置跳转三级分类

## vue 中能用，但在 mpvue 中不支持的地方 汇总

* 标签中不支持部分 javascript 渲染表达式。
  * 方法的调用
  * 过滤器
  * v-if 指令中调用函数
  * toFixed 等运算）

## app 分享到小程序路径参数参考

* 商品详情页
  * wx.miniProgram.navigateTo({ url: '/pages/common/goodsDetail?goodsId=' + data.url })
* webview
  * wx.miniProgram.navigateTo({ url: '/pages/webview/index?url=' + BASE64.encoder(data.url) })
