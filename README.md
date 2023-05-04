## 项目介绍
<image src="https://github.com/lycarrot/apply-monitor/blob/main/docs/assets/logo.png" width="80%">
本项目是一个完整的监控平台体系，项目信息收集sdk、服务端接口API信息处理均已实现，监控后台信息平台管理还在实现中，采用monorepo+pnpm方式开发。

## 项目结构
整体项目核心包括三部分
```
├── _tests sdk测试
├── packages *项目核心
    ├── monitor 信息收集sdk
    ├── report  上传sourcemap插件
    ├── server 服务端处理平台
├── .npmrc
├── pnpm-workspace.yaml
|── pnpm-lock.yaml
├── package.json
└── README.md
```
## 项目整体架构
<image src="https://github.com/lycarrot/apply-monitor/blob/main/docs/assets/framework.png" width="70%">

### monitor（信息收集）
整个sdk其实是做了俩部分工作，信息采集+信息上报
#### 信息采集
信息采集包括三个部分：错误监控、行为监控、性能监控三个部分
<image src="https://github.com/lycarrot/apply-monitor/blob/main/docs/assets/info.png" width="80%">
#### 信息上报
##### 上报方法
关于信息上报的方式有三种：sendBeacon>image>XMLHttpRequest，默认采用的sendBeacon，如果不兼容这个api，会选择image上报，最后才会选择XMLHttpRequest方式进行上传。当然也可以通过配置自行选择上报方式。
- sendBeacon:该方法会将少量异步数据发送到后台，所以用这种方式传输时，不会影响页面本身加载的请求，同时这种是异步方式的。
- image:采用的是1*1像素的透明 gif 进行上报，因为gif图片格式体积小，可以避免阻塞页面加载，影响用户体验,该方式也是支持跨域方式得。
- XMLHttpRequest:该方式的问题主要是可能会占用页面本身请求，阻塞页面加载，同时也需要考虑跨域的问题
##### 上报时机
- 错误监控:触发时会直接上报
- 其它：会把相应的信息上报加人一个队列里面进行缓存，然后在页面加载完成或页面隐藏时这些时机进行上报，这样可以避免监控sdk的请求阻塞页面加载。

### server（存储和分析）
服务端采用的koa2+mysql+redis+typescript方式开发，整个服务端可以分为俩部分，信息收集处理存储、提取存储数据分析。
#### 存储部分
存储主要是指sdk上报的性能、行为、错误这三部分信息收集，拿到上报的信息之后，会首先对数据做个清洗，然后假如同时监控了多个项目，所以可能存在一下子发送过多的数据，导致服务端信息处理过载崩溃，所以在加入mysql存储之前，会对数据做层队列缓存，缓存方式采用的是kue+redis。
<image src="https://github.com/lycarrot/apply-monitor/blob/main/docs/assets/report.png" width="80%">
#### 数据分析
主要对项目上报的数据进行处理，然后展示在后台分析平台。

### report(webpack上报插件)
因为sdk上报的错误代码信息都是经过压缩处理的，是无法直观分析到代码具体报错位置的。可以通过匹配到相应的source-map文件，通过错误信息的行列数与对应的 source-map 文件，处理后得到源文件的具体错误信息。所以这里编写了个webpack插件，在代码打包完成后，会把相应的source-map文件上传到服务端。
- webpack打包生成文件触发afterEmit钩子，拿到相应的source-map文件资源，然后把它们以form-data的形式发送到服务端。
- 然后再把相应的source-map文件资源删除，在webpack的done钩子阶段执行
