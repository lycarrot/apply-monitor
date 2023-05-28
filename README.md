## 项目介绍

<image src="https://img-1301800639.cos.ap-guangzhou.myqcloud.com/logo.png" width="80%"><br/>

<p align="center">
<image src="https://github.com/lycarrot/apply-monitor/actions/workflows/pr-main.yml/badge.svg">
<p>

本项目是一个完整的监控平台体系，项目信息收集 sdk、服务端接口 API 信息处理均已实现，监控后台信息平台管理还在实现中，采用 monorepo+pnpm 方式开发。

## 项目结构

```
├── .changeset 包版本维护
├── .github
    ├── .workflows  github-actions配置
├── .husky 发布到github校验
├── docs  静态资源
├── _tests sdk测试
├── packages *项目核心
    ├── eslint-config eslint通用规范
    ├── monitor 信息收集sdk
    ├── report  上传sourcemap插件
    ├── server 服务端处理平台
├── .eslintignore
├── .eslintrc
├── .npmrc
├── .nvmrc
├──.prettierrc
├── commitlint.config
├── pnpm-workspace.yaml
|── pnpm-lock.yaml
├── package.json
└── README.md
```

## 项目整体架构

整个监控体系核心部分主要分成三部分，首先是 sdk 植入到各个需要监控到的项目中，然后监控信息会上报到统一的的服务器进行处理存储，最后是统一的监控平台对监控信息进行展示
<image src="https://img-1301800639.cos.ap-guangzhou.myqcloud.com/monitor.png">

### 核心部分

信息收集 sdk：<a href="https://github.com/lycarrot/apply-monitor/tree/main/packages/monitor">monitor</a></br>
信息处理分析：<a href="https://github.com/lycarrot/apply-monitor/tree/main/packages/server">server</a><br/>
信息管理平台(实现中)：<a href="https://github.com/lycarrot/apply-monitor/tree/main/packages/monitor">admin</a><br/>

#### <a href="https://github.com/lycarrot/apply-monitor/tree/main/packages/monitor">monitor（信息收集 sdk）</a>

整个 sdk 其实是做了俩部分工作，信息采集+信息上报

#### 信息采集

信息采集包括三个部分：错误监控、行为监控、性能监控三个部分

<image src="https://img-1301800639.cos.ap-guangzhou.myqcloud.com/sdk.png"/>

#### 信息上报

##### 上报方法

关于信息上报的方式有三种：sendBeacon>image>XMLHttpRequest，默认采用的 sendBeacon，如果不兼容这个 api，会选择 image 上报，最后才会选择 XMLHttpRequest 方式进行上传。当然也可以通过配置自行选择上报方式。

- sendBeacon:该方法会将少量异步数据发送到后台，所以用这种方式传输时，不会影响页面本身加载的请求，同时这种是异步方式的。
- image:采用的是 1\*1 像素的透明 gif 进行上报，因为 gif 图片格式体积小，可以避免阻塞页面加载，影响用户体验,该方式也是支持跨域方式得。
- XMLHttpRequest:该方式的问题主要是可能会占用页面本身请求，阻塞页面加载，同时也需要考虑跨域的问题

#### 上报时机

- 错误监控:触发时会直接上报
- 其它：会把相应的信息上报加人一个队列里面进行缓存，然后在页面加载完成或页面隐藏时这些时机进行上报，这样可以避免监控 sdk 的请求阻塞页面加载。

#### <a href="https://github.com/lycarrot/apply-monitor/tree/main/packages/server">server（存储和分析）</a>

服务端采用的 koa2+mysql+redis+typescript 方式开发，整个服务端可以分为俩部分，信息收集处理存储、提取存储数据分析。

#### 存储部分

存储主要是指 sdk 上报的性能、行为、错误这三部分信息收集，拿到上报的信息之后，会首先对数据做个清洗，然后假如同时监控了多个项目，所以可能存在一下子发送过多的数据，导致服务端信息处理过载崩溃，所以在加入 mysql 存储之前，会对数据做层队列缓存，缓存方式采用的是 kue+redis。

<image src="https://img-1301800639.cos.ap-guangzhou.myqcloud.com/report.png" >

#### 数据分析

主要对项目上报的数据进行处理，然后展示在后台分析平台。

#### <a href="https://github.com/lycarrot/apply-monitor/tree/main/packages/report">report(webpack 上报插件)</a>

因为 sdk 上报的错误代码信息都是经过压缩处理的，是无法直观分析到代码具体报错位置的。可以通过匹配到相应的 source-map 文件，通过错误信息的行列数与对应的 source-map 文件，处理后得到源文件的具体错误信息。所以这里编写了个 webpack 插件，在代码打包完成后，会把相应的 source-map 文件上传到服务端。

- webpack 打包生成文件触发 afterEmit 钩子，拿到相应的 source-map 文件资源，然后把它们以 form-data 的形式发送到服务端。
- 然后再把相应的 source-map 文件资源删除，在 webpack 的 done 钩子阶段执行
