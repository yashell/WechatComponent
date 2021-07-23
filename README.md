# API

[![Build Status](https://travis-ci.org/lifei6671/mindoc.svg?branch=master)](https://www.gulpjs.com.cn/)



# 基础

## 相册Album

> 相册功能，提供图片单张多张上传、图片预览、营业执照上传,上传过程带进度


### 属性列表

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :-----| :----: | :----: | :----:| :----|
| urls | string |  | 是 | 图片参数，以英文逗号隔开的string |
| mode | string | edit | 否 | 编辑 edit 预览 preview 营业执照 premit |
| multiple | number | 1 | 否 | 每次可以选择几个文件（营业执照模式不生效） |
| max | number | 1 | 否 | 最多能够上传多少个文件 （营业执照模式不生效） |
| deleteBtn | boolean | false | 否 | 是否显示删除按钮 |
| upload-text | string | 点击上传 | 否 | 上传文字（浏览模式不生效） |
| bindevent | eventhandler |  | 否 | 图片上传的函数，返回Promise，Promise的callback里面必须resolve({urls})表示成功，否则表示失败 |


### 代码引入
在 page.json 中引入组件

```json
{
  "usingComponents": {
    "Album": "/components/Album/Album"
  }
}
```

### 代码示例
```html
# 浏览模式 
<Album addMode="preview" urls="{{picList}}"/>
# 编辑模式 
<Album multiple="{{9}}" deleteBtn="{{true}}" urls="{{picList}}" max="{{50}}" bindevent="onMyEvent" />
# 营业执照模式  
<Album  mode="premit" deleteBtn="{{true}}" urls="{{picList}}" bindevent="onMyEvent" />

onMyEvent(e) { this.setData({ picList: e.detail }) },
```



## 复选ActionCheckbox

> 该复选支持多项选中，且可以记录选中项


### 属性列表

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :-----| :----: | :----: | :----:| :----|
| show | boolean | false | 否 | 是否显示 |
| source | Array | [] | 是 | 所有选项 |
| selected | Array | [] | 是 | 已选中的选项 |
| overlay | boolean | true | 否 | 点击遮罩层是否关闭 |
| title | string | '请选择' | 否 | 标题 |
| bindevent | eventhandler |   | 否 | 自定义选择方法 控制selected参数 |
| bindcloseEvent | eventhandler |  | 否 | 自定义关闭方法 控制show |


### 代码引入
在 page.json 中引入组件

```json
{
  "usingComponents": {
    "ActionCheckbox": "/components/ActionCheckbox/ActionCheckbox"
  }
}
```

### 代码示例
```html
<ActionCheckbox show="{{ActionCheckboxShow}}" source="{{checkboxData}}" selected="{{picListSelect}}"
    title="选择药品包装数量" bindevent="selectEvent" bindcloseEvent="ActionCheckboxClose" />
```



## 单选ActionSheet

> 单选

### 属性列表

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :-----| :----: | :----: | :----:| :----|
| title | string |  | 否 | 标题 |
| show-cancel | boolean | true | 否 | 是否显示取消按钮 |
| cancel-text | string | | 否 | 取消按钮的文本 |
| mask-class | string | | 否 | 背景蒙层的class |
| ext-class | string | | 否 | ActionSheet额外的class |
| mask-closable | boolean | true  | 否 | 点击背景蒙层是否可以关闭ActionSheet|
| mask | boolean | true | 否 | 是否显示背景蒙层 |
| show | boolean | false | 否 | 是否显示ActionSheet |
| actions | Array | false | 是 | ActionSheet的按钮项的配置，每一项是包含text、value、type的Object，type的取值为warn和default，表示两种样式 |
| bindclose | eventhandler | | 否 | 点击背后的mask关闭掉ActionSheet触发的事件 |
| bindactiontap | eventhandler | | 否 | 点击ActionSheet的按钮项触发的事件，detail为{ value, index } |


### 代码引入
在 page.json 中引入组件

```json
{
  "usingComponents": {
    "ActionSheet": "/components/ActionSheet/ActionSheet"
  }
}
```

### 代码示例
```html
<ActionSheet bindactiontap="btnClick" show="{{showActionsheet}}" actions="{{groups}}" title="这是一个标题，可以为一行或者两行。"/>
```


## 浮动按钮FloatButton
### 属性列表

| 属性 | 类型 | 默认值 | 必填 | 说明 |
| :-----| :----: | :----: | :----:| :----|
| inButtonRight | number | 100 | 否 | 距离右边的距离rpx |
| inButtonBottom | number | 100 | 否 | 距离底部的距离rpx |
| color | string | #ff4f02 | 否 | 按钮颜色 |
| textColor | string | #fff | 否 | 文字颜色 |

### 代码引入
在 page.json 中引入组件

```json
{
  "usingComponents": {
    "FloatButton": "/components/FloatButton/FloatButton"
  }
}
```

### 代码示例
```html
<FloatButton inButtonRight="{{ 120 }}" inButtonBottom="{{ 260 }}"/>
```