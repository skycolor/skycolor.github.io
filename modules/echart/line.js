(function(){
	
	init();
	
	function init(){
		initEchart1();
	}
	
	function initEchart1(){
		var myEchart = echarts.init(document.getElementById('echartMain1'));
		var opt = {
			xAxis: [{		//x轴名称，以及刻度值	
				name : '时间' ,
				type: 'category',
				data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul' ,'Aug']
			}],
			tooltip: {
		        trigger: 'axis'		//坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用
		    },
			yAxis: [{		//y轴名称
					name : '流量(m³/s)' ,
					type: 'value'
				}
			],
			series: [		//线性坐标系里的值
				{
		            type:'line',
		            smooth : true ,
		            data: [25 , 55 ,56 , 44 , 55 , 51 , 56 , 49]
		        }
			]
		};
		// 使用刚指定的配置项和数据显示图表。
		myEchart.setOption(opt);
	}
	
})()
