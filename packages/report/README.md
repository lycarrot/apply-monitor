## apply-monitor/report

### 安装方式

使用 npm:

```
npm install @apply-monitor/report --save-dev
```

使用 yarn:

```
yarn add @apply-monitor/report --dev
```

### 使用方式

```js
// webpack.config.js
import ApplyMonitorReport from '@apply-monitor/report'

const webpackConfig = {
  plugins: [
    new ApplyMonitorReport({
      url: 'sourcemap上报地址',
      project: '项目名称',
      version: '项目版本',
    }),
  ],
}

export default webpackConfig
```

### 配置项

| Name        | Description                           | tyep    | default  | isRequired |
| ----------- | ------------------------------------- | ------- | -------- | ---------- | ----- |
| url         | 上传 sourmap 的 url                   | string  | ''       | true       |
| project     | 项目名称,必须和 sdk 配置项目名称一致  | string  | ''       | true       |
| version     | 项目版本，必须和 sdk 配置版本名称一致 | string  | ''       | true       |
| include     | 上传包含的文件                        | RegExp  | /\.js$   | \.map$/    | false |
| exclude     | 上传不包含的文件                      | RegExp  | null     | false      |
| afterDelMap | 上传完文件后是否删除                  | boolean | false    | false      |
| delInclude  | 上传方式                              | RegExp  | /\.map$/ | false      |
