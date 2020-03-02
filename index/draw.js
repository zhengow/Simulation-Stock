
var pnlChart = echarts.init(document.getElementById("pnlChart"));
var stockChart=echarts.init(document.getElementById("stockChart"));

function drawprice(){
	var idx;
	if(vueShow.name=="ZC")
		idx=0;
	else{
		idx=vueShow.name[2]+vueShow.name[3];
		idx = (idx-48)*2+1;
		if(vueShow.name[4]=='P')
			idx++;
	}
	
	var option={
		title:{
			text:vueShow.name
		},
		xAxis:{
			data:vueStock.ticks
		},
		yAxis:{},
		series:[{
			name:'series name',
			type:'line',
			data:vueStock.stocks[idx]
		}]
	};
	stockChart.setOption(option);
}


function drawpnl(){
var option={
	title:{
		text:'PNL'
	},
	grid:{
		x:100
	},
	legend:{
		data:['p']
	},
	xAxis:{
		data:vueStock.ticks
	},
	yAxis:{},
	series:[{
		name:'series name',
		type:'line',
		data:vueTrade.pnl
	}]
};
pnlChart.setOption(option);
}
