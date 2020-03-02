var vueUser = new Vue({
	el:"#userInfo",
	data:{
		users:[{id:0,pnl:0}],
	}
})

var vueStock = new Vue({
	el:"#priceInfo",
	data:{
		ticks:[],
		stocks:[[1],[1],[1],[1],[1],[1],[1],[1],[1],[1],[1]],
		high:[50,50,50,50,50,50,50,50,50,50,50],
		low:[50,50,50,50,50,50,50,50,50,50,50],
		cost:[[2,2,2,2,2,2,2,2,2,2,2]],
		profit:[[2,2,2,2,2,2,2,2,2,2,2]],
		quantity:[0,0,0,0,0,0,0,0,0,0,0],
		names:['ZC','ZC48C','ZC48P','ZC49C','ZC49P','ZC50C','ZC50P','ZC51C','ZC51P','ZC52C','ZC52P'],
		color:['red','black','black','black','black','black','black','black','black','black','black']
	},
	methods:{
		BUY:function(idx){
			var len = this.ticks.length;
			vueTrade.cash-=10000*this.stocks[idx][len-1];
			vueTrade.quantity[idx]+=10000;
			vueStock.quantity[idx]+=10000;
		},
		SELL:function(idx){
			var len = this.ticks.length;
			vueTrade.cash+=10000*this.stocks[idx][len-1];
			vueTrade.quantity[idx]-=10000;
			vueStock.quantity[idx]-=10000;
		}
	}
})

var vueTrade = new Vue({
	el:"#accountInfo",
	data:{
		name:"",
		quantity:[0,0,0,0,0,0,0,0,0,0,0],
		cash:0,
		stockValue:0,
		stock:[0,0,0,0,0,0,0,0,0,0,0],
		pnl:[1000]
	}
})

var vueBuySell = new Vue({
	el:"#trade",
	methods: {
		Hint:function(){
			alert("Click the left mouse key can quickly buy, right is sell(some browser doesn't support right click T_T)")
		},
		BUY:function(){
			var len = vueStock.ticks.length;
			var idx = find(vueStock.names,vueShow.name);
			vueTrade.cash-=10000*vueStock.stocks[idx][len-1];
			vueTrade.quantity[idx]+=10000;
			vueStock.quantity[idx]+=10000;
		},
		SELL:function(){
			var len = vueStock.ticks.length;
			var idx = find(vueStock.names,vueShow.name);
			vueTrade.cash+=10000*vueStock.stocks[idx][len-1];
			vueTrade.quantity[idx]-=10000;
			vueStock.quantity[idx]-=10000;
		}
	}
})

var vueShow = new Vue({
	el:"#stockChartHead",
	data:{
		name:'ZC',
		names:['ZC','ZC48C','ZC48P','ZC49C','ZC49P','ZC50C','ZC50P','ZC51C','ZC51P','ZC52C','ZC52P']
	}
})

var vueClick = new Vue({
	el:"#stockChart",
	methods:{
		BUY:function(event){
			console.log("BUY");
			var len = vueStock.ticks.length;
			var idx = find(vueStock.names,vueShow.name);
			vueTrade.cash-=10000*vueStock.stocks[idx][len-1];
			vueTrade.quantity[idx]+=10000;
			vueStock.quantity[idx]+=10000;
		},
		SELL:function(){
			console.log("SELL");
			var len = vueStock.ticks.length;
			var idx = find(vueStock.names,vueShow.name);
			vueTrade.cash+=10000*vueStock.stocks[idx][len-1];
			vueTrade.quantity[idx]-=10000;
			vueStock.quantity[idx]-=10000;
		}
	}
})

function find(array,target){
	for(var i = 0; i<array.length;i++){
		if(target==array[i]){
			return i;
		}
	}
	return -1;
}

