(function ($) {
    function preLoad(imgs,options) {
        this.imgs=(typeof imgs==="string")?[imgs]:imgs;
        this.opts=$.extend({},preLoad.DEFAULTS,options);
        if(this.opts.order){
            this._order();
        }else {
            this._unorder();
        }

    };
    preLoad.DEFAULTS={
        order:"unorder",
        each:null,//每张图片加载完后执行
        all:null//所有图片加载完后执行
    };
    preLoad.prototype._order=function () {//有序加载
        var imgs=this.imgs,
            opts=this.opts,
            count=0,
            len=imgs.length;
        load();
        function load() {
            var igObj=new Image();
            $(igObj).on('load error',function () {
                opts.each&&opts.each(count);
                if (count>=len){//所有图片已经加载完
                    opts.all&&opts.all();
                }else {
                    load();
                }
                count++;
            });
            igObj.src=imgs[count];
        }
    },
    preLoad.prototype._unorder=function () {//无序加载
        var imgs=this.imgs,
            opts=this.opts,
            count=0,
            len=imgs.length;
        $.each(imgs,function (i,src) {
            if(typeof src!='string') return;
            var igObj=new Image();
            $(igObj).on('load error',function () {
                opts.each&&opts.each(count);
                if (count>=len-1){
                    opts.all&&opts.all();
                }
                count++;
            });
            igObj.src=src;
        });
    };
    $.extend({
        preLoad:function (imgs,opts) {
            new preLoad(imgs,opts)
        }
    });
})(jQuery);
