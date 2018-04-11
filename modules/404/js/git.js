(function(window , $ , undefined){
	/*
	 * 节流函数
	 * fn 事件中实际需要调用的函数
	 * interval    函数最短隔多长时间调用
	 * */
	var throttle = function(fn , interval){
	    var _self = fn ,     timer ,        //定时器
	        isFirst = true;        //是否是第一次调用
	    return function(){
	        var args = arguments ,
	            _this = this;
	        if(isFirst){            //如果是第一次执行，不需要走定时器
	            _self.apply(_this , args);
	            return isFirst = false;
	        }
	        /*从第二次执行就要开始走定时器了*/
	        if(timer)    return;            //如果定时器内的函数还未执行return
	        timer = setTimeout(function(){        //定时函数
	            clearTimeout(timer);
	            timer = null;
	            _self.apply(_this , args);
	        } , interval || 100)
	    }
	}
	
	$(function(){
		var oldPos , imgArray;
		
		
		init();
		
		
		//页面load完成后执行
		function init(){
			initParam();
			document.body.addEventListener("mousemove", throttle(handleMouseMove , 20));
		}
		
		//初始化相关参数
		function initParam(){
    		imgArray = {
    			bg : { scale: 0.05, isFont: false } ,
		        text : { scale: 0.13, isFont: true } ,
		        cat : { scale: 0.12, isFont: true } ,
		        cat_shadow : { scale: 0.12, isFont: true } ,
		        speeder : { scale: 0.11, isFont: true } ,
		        speeder_shadow : { scale: 0.11, isFont: true } ,
		        building_1 : { scale: 0.12, isFont: false } ,
		        building_2 : { scale: 0.15, isFont: false } ,
    		};
		}
		
		
		//处理鼠标移动事件
		function handleMouseMove(e){
			var pageX = e.pageX , pageY = e.pageY;
			if(typeof oldPos != 'undefined'){
				var x = (pageX - oldPos.x) ,
					y = (pageY - oldPos.y);
				for(var key in imgArray ) {
					var item = imgArray[key];
			        var imgObj = $(".img_" + key);
			        imgObj.css({transform: "translate3d(" + (item.scale * x) + "px," + (item.scale * y) + "px , 0px)"})
			    }
			}
			oldPos = {
				x : pageX ,
				y : pageY
			}
		}
		
		
	})
	
	
	
	
	
	
	
	
})(window , Zepto)
