(function(){
	
	init();
	
	function init(){
		initEchart1();
		initEchart2();
	}
	
	
	//初始化第一个表格
	function initEchart1(){
		var myEchart = echarts.init(document.getElementById('echartMain1'));
		var opt = {
				xAxis: [{			//配置X轴刻度值
					type: 'category',
					data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' ,'Aug' , 'Sep' , 'Oct' , 'Nov' , 'Dec']
				}],
				tooltip: {
			        trigger: 'axis'		//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
			    },
				//用于显示在图表上方，表示含义
			    legend: {			//
			        data:[ '库水位' , '雨量', '水位' , '差值' , '库存' ]
			    },
			    //自定义颜色，和下面要显示的内容一一对应
				color : ["#cc565a" , "#4588f0" , "#434348" , "#93eb82" , "#f5a262" ] ,		
				//定义两个Y轴，左右两个
				yAxis: [{
						name : '雨量(mm)' ,
						type: 'value'
					} , 
					{
						name : '水位(m)',
						type : 'value'
					}
				],
				//显示的内容值
				series: [
					{
			            name : "库水位" ,
			            type:'line',
			            smooth : true ,
			            yAxisIndex: 1,			//数值对应的是index为1，也就是第二个Y轴
			            data: [25 , 55 ,56 , 44 , 55 , 51 , 56 , 49 , 56 , 52 , 44 , 54]
			        },
					{
						name : "雨量" ,
						type: 'bar',
						data: [39, 27, 33, 45, 29, 56, 31 , 44 , 41 , 22 , 32 , 12]
					},
					{
						name : "水位" ,
						type: 'bar',
						data: [32, 30, 39, 45, 19, 33, 32 , 13 , 32 , 53 , 18 , 42]
					},
					{
						name : "差值" ,
						type: 'bar',
						data: [15, 28, 28, 58, 29, 44, 24 , 32 , 24 , 36 , 26 , 18]
					},
					{
						name : "库存" ,
						type: 'bar',
						data: [25, 16, 47, 18, 55, 16, 32 , 28 , 29 , 42 , 12 , 9]
					}
				]
			};
			myEchart.setOption(opt);
	}
	
	function initEchart2(){
		var myChart = echarts.init(document.getElementById('echartMain2'));
			var xArr = [];
			var data1Arr = [];
			var data2Arr = [];
			var data3Arr = [];
			for(var i = 0 ; i < 50 ; i++){
				(function(index){
					xArr.push("数据" + index);
					data1Arr.push(Math.random() * 100);
					data2Arr.push(Math.random() * 100);
					data3Arr.push(Math.random() * 100);
				})(i)
			}
			
			var option = {
				/*配置页面样式，可以控制y轴以及x轴的样式，包括高度和位置
				  此处配置了第一个表格高度为35%，而下一个表格距顶部55%，］
				  同时高度也为35% , 这样这两个表格就从上到下以此排列
				 * */
				grid: [{			
			        left: 50,
			        right: 50,
			        height: '35%'
			    }, {
			        left: 50,
			        right: 50,
			        top: '55%',
			        height: '35%'
			    }],
			    /**
			     * 下面两个为配置X Y 轴，第二个表格的X轴隐藏
			     * 同时第二个表格使用grid的第二个
			     * */
				xAxis: [
					{
			            type : 'category',
			            data: xArr
			        },
			        {
			        		show : false ,
			            gridIndex: 1,
			            type : 'category',
			            data: xArr
			        }
				],
				yAxis: [
					{
			            name : '流量',
			            type : 'value'
			        },
			        {
			            gridIndex: 1,
			            name : '雨',
			            type : 'value',
			            inverse: true			//显示方式为反转
			        }
				],
				tooltip: {
			        trigger: 'axis'		//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
			    },
			    /* 当数据量很大时，可进行缩放 */
			    dataZoom: [			
			        {
			            type: 'slider',		//使用这个type，可以使用鼠标滚轮进行缩放
			            show: true,
			            xAxisIndex: [0, 1]
			        },
			        {
			            type: 'inside',
			            xAxisIndex: [0, 1]
			        }
			    ],
			    legend: {
			        data:[ '矫正流量' , '预报流量', '预报雨量']
			    },
				color : ["#b4e5e8" , "#8790d3" , "#60A6EE" ] ,
				series: [
					{
			            name : '矫正流量',
			            type : 'line',
			            smooth : true ,
			            data: data1Arr
			        },
			        {
			            name : '预报流量',
			            type : 'line',
			            smooth : true ,
			            data : data2Arr
			        },
			        /*
			         * 配置了x/y的Axis的index
			         * */
			        {
			            name : '预报雨量',
			            type : 'bar',
			            xAxisIndex: 1,
			            yAxisIndex: 1,
			            data: data3Arr
			        }
				]
			};
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
		
	}
	
})();
