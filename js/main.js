function BgAdapter(url, parentSelector, addapterSelector, options) {
    this.url = url;
    this.parent = document.querySelector(parentSelector);
    this.addapter = document.querySelector(addapterSelector);
    this.options = options;
    this.bgWidth = null;
    this.bgHeight = null;
    this.parentWidth = null;
    this.parentHeight = null;
}

BgAdapter.prototype.getImgSize = function(cb) {
    var self  = this;
    cb = cb || function() {}
    var img = new Image();
    img.onload = function() {
        self.bgWidth = img.width;
        self.bgHeight = img.height
        cb({
            w: img.width,
            h: img.height,
        });
        
        img = null;
    }
    img.onerror = function(e) {
        cb(e);
    }
    img.src = this.url;
}

BgAdapter.prototype.getStyle = function(dom) {
    return getComputedStyle(dom);
}

BgAdapter.prototype.parseSize = function(cb) {
    var self = this;
    var ratio = 1;
    var scale = 1;
    self.parentHeight = getComputedStyle(this.parent).height;
    self.parentWidth = getComputedStyle(this.parent).width;

    var style = getComputedStyle(this.parent);
    // console.log(style.backgroundSize)

    var parentRatio = parseFloat(self.parentWidth) / parseFloat(self.parentHeight);
    this.getImgSize(function(res) {
        var width = res.w;
        var height = res.h;
        ratio = width / height;

        var mainWidth,mainHeight,mainLeft,mainTop;

        var bgSize = style.backgroundSize;
        var bgPos = style.backgroundPosition;
        console.log(bgPos)
        // 解析backgroundSize
        if(bgSize === 'cover') {
            if (ratio < parentRatio) {
                // 如果图比容器宽
                mainWidth = parseFloat(self.parentWidth);
                scale = mainWidth / width;
                mainHeight = parseFloat(height * scale);
            } else {
                // 如果图比容器高或相等
                mainHeight = parseFloat(self.parentHeight);
                scale = mainHeight / height;
                mainWidth = parseFloat(scale * width);
            }
        } else if (bgSize === 'contain') {
            if (ratio > parentRatio) {
                // 如果图比容器宽
                mainWidth = parseFloat(self.parentWidth);
                scale = mainWidth / width;
                mainHeight = parseFloat(height * scale);
            } else {
                // 如果图比容器高或相等
                mainHeight = parseFloat(self.parentHeight);
                scale = mainHeight / height;
                mainWidth = parseFloat(scale * width);
            }
        } else {
            // backgroundSize为其它的时候
            var result = []; 
            var sizeArr = bgSize.split(' ');
            if(sizeArr.length === 1) {
                mainWidth = sizeArr[0];
                mainHeight = sizeArr[0]
                // result = sizeArr[0] + " " + sizeArr[0];
            } else {
                mainWidth = sizeArr[0];
                mainHeight = sizeArr[1]
                // result = sizeArr[0] + " " + sizeArr[1];
            }
        }

        var posArr = bgPos.split(' ');

        mainLeft = posArr[0];
        mainTop = posArr[1];
        cb({
            w: mainWidth,
            h: mainHeight,
            left: mainLeft,
            top: mainTop
        })
    })
}

BgAdapter.prototype.set = function() {
    var self = this;
    this.parseSize(function(res) {

        var left = 0;
        var top = 0;
        var width = 0;
        var height = 0;

        if(res.w.indexOf('%') != -1) {
            width = parseFloat(self.parentWidth) * parseFloat(res.w) * 0.01;
        } else {
            width = parseFloat(res.w)
        }

        if(res.h.indexOf('%') != -1) {
            height = parseFloat(self.parentHeight) * parseFloat(res.h) * 0.01;
        } else {
            height = parseFloat(res.h);
        }

        if(res.top.indexOf('%') != -1) {
            top = parseFloat(res.top) * 0.01 * (parseFloat(self.parentHeight) - height)
        } else {
            top = parseFloat(res.top)
        }

        if(res.left.indexOf('%') != -1) {
            left = parseFloat(res.left) * 0.01 * (parseFloat(self.parentWidth) - width)
        } else {
            left = parseFloat(res.left)
        }
        // console.log(width, height)

        self.addapter.style.width = width + 'px';
        self.addapter.style.height = height + 'px';
        self.addapter.style.top = top + 'px';
        self.addapter.style.left = left + 'px';
        self.addapter.style.position = 'absolute';
    })
     
}
