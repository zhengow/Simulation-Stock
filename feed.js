var pricefunc;
var clearfunc;
var flag=0;
var tick=0;
var ticks=[];
var quantity = 11;
var startPrice = 50;
var stocks = [];
var prices=[];
var last=[];
var high=[];
var low=[];
var totalTick = 600;
for(i=0;i<quantity;i++){
	stocks[i]=[];
	prices[i]=startPrice;
	last[i]=startPrice;
	high[i]=startPrice;
	low[i]=startPrice;
}


var interval_send;
clearInterval(interval_send);

function run(){
	console.log("running");
	tick = 0;
	ticks = [];
	stocks = [];
	for(i=0;i<quantity;i++){
		stocks[i]=[];
		prices[i]=startPrice;
		last[i]=startPrice;
		high[i]=startPrice;
		low[i]=startPrice;
	}

	clearfunc('clear');
	interval_send = setInterval(sendprice,200);
}

function sendprice(){
	ticks.push(tick);
	for(i = 0; i<quantity; i++){
		stocks[i].push(last[i]);
		last[i] = next(prices[i]);
		stocks[i].push(last[i]);
		prices[i]=last[i];
		high[i]=Math.max(high[i],last[i]);
		low[i]=Math.min(low[i],last[i]);
	}
	pricefunc('stock', tick, prices);
	tick++;
	if(tick>totalTick){
		clearInterval(interval_send);
	}
}

function initial_send(initial){
	initial('initial',ticks,stocks);
}

function start(onChange,clear){
	pricefunc = onChange;
	clearfunc = clear;
	run();
	interval = setInterval(run,125000);
}

function stop(){
	clearInterval(interval);
}

function next(price){
	var res = price;
	var annualVariance = 1000;
	var tickVariance = annualVariance/6/totalTick;
	var step = 1000;
	for(var i = 0; i<step; i++){
		var flag = Math.random()-0.5;
		flag = flag>0?1:-1;
		flag = flag*(Math.sqrt(tickVariance))*Math.sqrt(1/step);
		res += flag;
	}
	var tmp = Math.floor(res*100)/100;
	res = res-tmp>0.005?tmp+0.01:tmp;
	res = Math.floor(res*100)/100;
	return res;
}

exports.start = start;
exports.stop = stop;
exports.initial_send = initial_send;