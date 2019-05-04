# bg-location

因为之前开发时会遇到个需求：根据背景图来定位。

所以我得知道背景图的具体大小、位置。

所以诞生了这个库。

设置一个div（称之为adapter）。使其大小、位置与其父元素的背景图片一模一样。

这样就可以把要按照背景图定位的元素放到adapter里来定位。

# 使用方法

源码在`js/main.js`里。

引入js

	<script src="./js/main.js"></script>
	
写html结构

```html
<div id="container" style="position: relative;">
	<div id="bg-addapter">

	</div>
</div>
```
\#container为设置背景图片的（父标签）
\#bg-adapter为自动适应父标签背景图片的标签

执行js即可

```javascript
var bgAddapter = new BgAddapter('./img/download.png','#container', '#bg-addapter');

bgAddapter.set();
```

# 参数说明

## 1

背景图url，需要来计算背景图的宽高。（会自动加载）

## 2

父标签选择器

## 3

子标签选择器

# todo

* 用mutation实现父标签背景图变化后自动更新