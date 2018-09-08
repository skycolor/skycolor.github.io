(function($ , imgData , undefined){
	/*图片控件*/
	function ImgFigure(index , imgSrc , title , desc){
		this.index = index;
		this.imgSrc = imgSrc;
		this.title = title;
		this.desc = desc;
	}
	ImgFigure.prototype.returnHtmlStr = function(styleObj){			//返回渲染的HTML代码
		var strArr = [];
		strArr.push('<figure class="img-figure" style=' + JSON.stringify(styleObj) +  ' >');
		strArr.push('<img src="' + this.imgSrc + '" alt="' + this.title + '" />');
		strArr.push('<figcaption>');
		strArr.push('<h2 class="img-title">' +  this.title  + '</h2>');
		strArr.push('<div class="img-back">' + this.desc + '</div>');
		strArr.push('</figcaption>');
		strArr.push('</figure>');
		return strArr.join("");
	}
	ImgFigure.prototype.returnZeptoObj = function(eles){			//返回Zepto对象
		return eles.eq(this.index);
	}
	ImgFigure.prototype.setStyle = function(eles , styleObj){			//设置图片的样式
		this.returnZeptoObj(eles).attr("style","").css(styleObj);
	}
	ImgFigure.prototype.setPosAndRotate = function(pos , rotate){		//设置位置信息以及旋转角度
		this.pos = pos;
		this.rotate = rotate;
	}
	ImgFigure.prototype.transform = function(eles){			//图片移动
		var styleObj = this.pos , _this = this;
		if(this.rotate){
			['Moz', 'Ms', 'Webkit', ''].forEach(function(val){
				styleObj[val + 'Transform'] = 'rotate(' + _this.rotate + 'deg)';
			});
		}
		this.setStyle(eles , styleObj);
	}
	ImgFigure.prototype.setCenter = function(eles){		//图片翻转
		this.returnZeptoObj(eles).addClass("is-center");
	}
	ImgFigure.prototype.setInverse = function(eles){		//图片翻转
		this.returnZeptoObj(eles).addClass("is-inverse");
	}
	ImgFigure.prototype.resetClass = function(eles){		//图片class重置
		this.returnZeptoObj(eles).removeClass("is-inverse").removeClass("is-center ");
	}
	/*导航控件*/
	function ControllerNav(index){
		this.index = index;
	}
	ControllerNav.prototype.returnHtmlStr = function(){	//返回渲染的HTML代码
		return '<span class="controller-unit"></span>';
	}
	ControllerNav.prototype.returnZeptoObj = function(eles){			//返回Zepto对象
		return eles.eq(this.index);
	}
	ControllerNav.prototype.setCenter = function(eles){
		this.returnZeptoObj(eles).addClass("is-center");
	}
	ControllerNav.prototype.setInverse = function(eles){
		this.returnZeptoObj(eles).addClass("is-inverse");
	}
	ControllerNav.prototype.resetClass = function(eles){
		this.returnZeptoObj(eles).removeClass("is-center ").removeClass("is-inverse");
	}
	/*公共方法*/
	function getRangeRandom(min , max){			//获取范围内的随机值
		return Math.floor(Math.random()*(max - min) + min);
	}
	function get30DegRandom(){				//获取-30到30之间的随机值
		return ((Math.random() > 0.5 ? "+" : "-") + Math.ceil(Math.random() * 30));
	}
	var centerPos = {};		//中心位置
	var hPosRange = {leftSecX : [0 , 0] , rightSecX : [0 , 0] , y : [0 , 0]};		//水平方向的取值范围，分为左边的部分和右边的部分
	var vPosRange = {x : [0 , 0] , topY : [0 , 0]};		//垂直方向的取值范围
	var imgFigureArr = [] , controllerNavArr = [] , centerIndex , oldIndex ,
		imgSec = $('.img-sec') , nav = $('.controller-nav') , figures , navSpans;
	
	function joinDom(){			//加入DOM元素
		for(var index = 0 ; index < imgData.length ; index++){
			var item = imgData[index] ,
				imgFigure =  new ImgFigure(index , item.imgSrc , item.title , item.desc) ,
				controllerNav = new ControllerNav(index);
			imgFigureArr.push(imgFigure);
			imgSec.append(imgFigure.returnHtmlStr());
			controllerNavArr.push(controllerNav);
			nav.append(controllerNav.returnHtmlStr());
		}
	}
	
	function initParam(){			//初始化参数
		figures = imgSec.find('.img-figure');
		navSpans = nav.find(".controller-unit");
		var secW = imgSec.width() , imgW = figures.width() ,
			halfSecW = Math.ceil(secW/2) , halfImgW = Math.ceil(imgW/2) ,
			secH = imgSec.height() , imgH = figures.height() ,
			halfSecH = Math.ceil(secH/2) , halfImgH = Math.ceil(imgH/2);
		//中心图片的位置
		centerPos = {
			left : halfSecW - halfImgW ,
            top : halfSecH - halfImgH
		};
		//左右两边图片位置的取值范围
        hPosRange.leftSecX[0] = -halfImgW;
        hPosRange.leftSecX[1] = halfSecW - 3 * halfImgW;
        hPosRange.rightSecX[0] = halfSecW + halfImgW;
        hPosRange.rightSecX[1] = secW - halfImgW;
        hPosRange.y[0] = -halfImgH;
        hPosRange.y[1] = secH - halfImgH;
		//中轴线图片位置取值范围
        vPosRange.x[0] = halfSecW - imgW;
        vPosRange.x[1] = halfSecW;
        vPosRange.topY[0] = -halfImgH;
        vPosRange.topY[0] = halfSecH - 3 * halfImgH;
		//通过随机数获取中心图片索引
        centerIndex = Math.ceil(Math.random() * (imgFigureArr.length - 1));
        rearrangeImg(centerIndex);
        console.log(controllerNavArr.length , imgData.length)
	}
	
	function rearrangeImg(centerIndex){			//调整图片位置
		//第一步：处理位于中心的图片
		var centerImgArr = imgFigureArr.splice(centerIndex , 1) , centerImg = centerImgArr[0];		
		centerImg.setPosAndRotate(centerPos , 0);
		centerImg.setStyle(figures , {});
		centerImg.setCenter(figures);
		controllerNavArr[centerIndex].setCenter(navSpans);
		//第二步：处理中心轴的图片
		var topImgNum = Math.floor(Math.random() * 2) ,    //即1或0
			topImgIndex = Math.floor(Math.random() * (imgFigureArr.length - topImgNum)) ,
			topImgArr = imgFigureArr.splice(topImgIndex , topImgNum);
		for(var topIndex = 0 , topImg ; topImg = topImgArr[topIndex++];)
			topImg.setPosAndRotate({
                top : getRangeRandom(vPosRange.topY[0] , vPosRange.topY[1]) ,
                left : getRangeRandom(vPosRange.x[0] , vPosRange.x[1])
            } , get30DegRandom());
        //第三步：处理左右两侧的图片
        for(var i = 0 , j = imgFigureArr.length , k = j/2 ; i < j ; i++){
            var xPosRange = i < k ? hPosRange.leftSecX : hPosRange.rightSecX;
            imgFigureArr[i].setPosAndRotate({
                top : getRangeRandom(hPosRange.y[0] , hPosRange.y[1]) ,
                left : getRangeRandom(xPosRange[0] , xPosRange[1])
            } , get30DegRandom());
        }
        //第四步：拼接数组
        if(topImgArr && topImgArr[0]) imgFigureArr.splice(topImgIndex , 0 , topImgArr[0]);
        imgFigureArr.splice(centerIndex , 0 , centerImg);
        //第五步：页面样式重组
        for(var imgIndex = 0 , imgObj ; imgObj = imgFigureArr[imgIndex++]; )
        		imgObj.transform(figures);	
	}
	
	/*处理点击事件*/
	function handleEvent(){
		figures.each(function(index , dom){
			$(dom).click(function(){
				handleMain(index);
			});
		})
		
		navSpans.each(function(index , dom){
			$(dom).click(function(){
				handleMain(index);
			});
		})
		
		function handleMain(index){
			if(index == centerIndex){		//点击的是中心图片
				var figure = figures.eq(index) , navSpan = navSpans.eq(index);
				if(figure.hasClass("is-inverse")){
					figure.removeClass("is-inverse");
					navSpan.removeClass("is-inverse");
				}else{
					figure.addClass("is-inverse");
					navSpan.addClass("is-inverse")
				}
			}else{			//点击的是旁边的图片
				imgFigureArr[centerIndex].resetClass(figures);
				controllerNavArr[centerIndex].resetClass(navSpans);
				centerIndex = index;
				rearrangeImg(index);
			}
		}
	}
	
	/*处理canvas*/
	function handleCanvas(){
		$(".snow-canvas").snow();
	}
	
	function start(){		//页面入口
		joinDom();
		initParam();
		handleEvent();
		handleCanvas();
	}
	
	
	start();
	
})(Zepto , imgData)
