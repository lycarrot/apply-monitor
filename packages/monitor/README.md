## apply-monitor/monitor

### 安装方式

使用 npm:

```
 npm install @apply-monitor/monitor --save-dev
```

使用 yarn:

```
 yarn add @apply-monitor/monitor --dev
```

### 使用方式

```js
import Monitor from '@apply-monitor/monitor'

new Monitor({
  url: '项目上报地址',
  project: '项目名称',
  version: '版本',
})
```

### 配置项

| Name              | Description                   | tyep    | default      | isRequired |
| ----------------- | ----------------------------- | ------- | ------------ | ---------- |
| url               | 上传 url                      | string  | ''           | true       |
| project           | 项目名称                      | string  | ''           | true       |
| proSub            | 子项目名称                    | string  | ''           | false      |
| version           | 项目版本                      | string  | ''           | true       |
| isCollectErr      | 是否收集错误                  | boolean | true         | false      |
| isCollectPer      | 是否收集用户行为              | boolean | true         | false      |
| isCollectBehavior | 是否收集性能                  | boolean | true         | false      |
| sendWay           | 上传方式                      | string  | 'sendBeacon' | false      |
| isVue             | 开启 vue 路由跳转传入 Vue     | boolean | false        | false      |
| vue               | 是否开启 vue 错误收集         | boolean | false        | false      |
| isVueJump         | 是否开启监听 vue 路由跳转收集 | boolean | false        | false      |
| router            | 开启 vue 路由跳转传入路由     | router  | null         | false      |
