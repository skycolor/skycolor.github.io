class Circle {
	//创建对象
	//以一个圆为对象
	//设置随机的 x，y坐标，r半径，_mx，_my移动的距离
	//this.r是创建圆的半径，参数越大半径越大
	//this._mx,this._my是移动的距离，参数越大移动
	constructor(x, y , r) {
			this.x = x;
			this.y = y;
			this.r = Math.random() * r;
			this._mx = 1 - 2*Math.random();
			this._my = 1 - 2*Math.random();
			this.isDie = false;
		}
		//canvas 画圆和画直线
		//画圆就是正常的用canvas画一个圆
		//画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
	drawCircle(ctx) {
		ctx.beginPath();
		//arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
		ctx.arc(this.x, this.y, this.r, 0, 360)
		ctx.closePath();
		ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
		ctx.fill();
	}
	drawLine(ctx, _circle) {
			let dx = this.x - _circle.x;
			let dy = this.y - _circle.y;
			let d = Math.sqrt(dx * dx + dy * dy)
			if(d < 150) {
				ctx.beginPath();
				//开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
				ctx.moveTo(this.x, this.y); //起始点
				ctx.lineTo(_circle.x, _circle.y); //终点
				ctx.closePath();
				ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
				ctx.stroke();
			}
		}
		// 圆圈移动
		// 圆圈移动的距离必须在屏幕范围内
	move() {
		this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
		this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
		this.x += this._mx / 2;
		this.y += this._my / 2;
	}
} //鼠标点画圆闪烁变动
class currentCirle extends Circle {
	constructor(x, y) {
		super(x, y);
		this._mx = 0;
		this._my = 0;
	}

	drawCircle(ctx) {
		ctx.beginPath();
		this.r = 8;
		ctx.arc(this.x, this.y, this.r, 0, 360);
		ctx.closePath();
		ctx.fillStyle = 'rgba(255, 77, 54, 0.6)'
		ctx.fill();

	}
}

//更新页面用requestAnimationFrame替代setTimeout
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

let canvas = document.getElementById('canvas'),
	ctx = canvas.getContext('2d'),
	circleNum ,
	w, h, r,  circles = [];

let draw = function() {
	ctx.clearRect(0, 0, w, h);
	if(circles.length == 0) return;
	for(let i = 0; i < circles.length; i++) {
		let circle = circles[i];
		if(circle.isDie) continue;
		circle.move();
		circle.drawCircle(ctx);
		for(j = i + 1; j < circles.length; j++) {
			circle.drawLine(ctx, circles[j])
		}
	}
	requestAnimationFrame(draw)
}

let init = function(num) {
	w = canvas.width = canvas.offsetWidth;
	h = canvas.height = canvas.offsetHeight;
	r = Math.min(parseInt(window.innerWidth/48) , parseInt(window.innerHeight/80));
	circleNum = parseInt(window.innerWidth/15);
	for(var i = 0; i < circleNum; i++) {
		circles.push(new Circle(Math.random() * w, Math.random() * h , r));
	}
	draw();
}

init(circleNum);

window.onresize = () => {
	circles.splice(0, circles.length);
	setTimeout(function() {
		init();
	}, 5)
}

var app = angular.module("app", []).controller("controller", function($scope) {
	$scope.list = data;
});