var socket=io();

socket.on('id',function(msg){
	vueTrade.name = msg;
})

socket.on('rank',function(msg){
	vueUser.users=msg;
})

socket.on('stock', function(tick, stocks){
	vueStock.ticks.push(tick);
	var pnl = 0;
	var len = vueStock.stocks[0].length;
	for(i=0;i<stocks.length;i++){
		if(stocks[i]>vueStock.stocks[i][len-1]){
			vueStock.color[i]='red';
		}
		else{
			vueStock.color[i]='green';
		}
		vueStock.stocks[i].push(stocks[i]);
		vueTrade.stock[i] = stocks[i]*vueTrade.quantity[i];
		pnl+=vueTrade.stock[i];
		vueStock.high[i]=Math.max(vueStock.high[i],stocks[i]);
		vueStock.low[i]=Math.min(vueStock.low[i],stocks[i]);
	}
	pnl = Math.floor(pnl);
	vueTrade.stockValue = pnl;
	pnl += vueTrade.cash;
	vueTrade.pnl.push(pnl);
	drawprice();	
	drawpnl();
	socket.emit('user',vueTrade.name,pnl);
});

socket.on('clear', function(){
	vueStock.ticks = [];
	vueStock.stockValue = 0;
	vueStock.color = ['black','black','black','black','black','black','black','black','black','black','black'];
	vueStock.stocks = [[],[],[],[],[],[],[],[],[],[],[]];
	vueStock.high = [50,50,50,50,50,50,50,50,50,50,50];
	vueStock.low = [50,50,50,50,50,50,50,50,50,50,50];
	vueTrade.stock = [0,0,0,0,0,0,0,0,0,0,0];
	vueTrade.pnl=[];
	vueTrade.cash = 0;
	vueTrade.quantity = [0,0,0,0,0,0,0,0,0,0,0];
	vueStock.quantity = [0,0,0,0,0,0,0,0,0,0,0];
});

socket.on('initial', function(ticks,stocks){
	vueStock.color = ['black','black','black','black','black','black','black','black','black','black','black'];
	vueStock.stocks=stocks;
	vueStock.ticks=ticks;
	vueTrade.pnl=[];
	
	for(i=0;i<ticks.length;i++){
		vueTrade.pnl.push(0);
	}
});
