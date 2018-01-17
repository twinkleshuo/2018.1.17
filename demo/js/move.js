var wangyanMove={
	getStyle:function (obj,name){
		return (obj.currentStyle || getComputedStyle(obj,false))[name];
	},
	startMove:function (obj,json,options){
		clearInterval(obj.timer);
		options=options || {};
		options.easing=options.easing|| 'ease-out';
		options.duration=options.duration || 800;

		var count=Math.floor(options.duration/30);
		var start={};
		var dis={};

		for(var name in json){
			start[name]=parseFloat(wangyanMove.getStyle(obj,name));

			dis[name]=json[name]-start[name];
		}
		var n=0;

		obj.timer=setInterval(function(){
			n++;

			for(var name in json){

				switch(options.easing){
					case 'linear':
						var a=n/count;
						var cur=start[name]+dis[name]*a;
						break;
					case 'ease-in':
						var a=n/count;
						var cur=start[name]+dis[name]*a*a*a;
						break;
					case 'ease-out':
						var a=1-n/count;
						var cur=start[name]+dis[name]*(1-a*a*a);
						break;
				}

				if(name=='opacity'){
					obj.style.opacity=cur;
					obj.style.filter='alpha(opacity:'+cur*100+')';
				}else{
					obj.style[name]=cur+'px';
				}
			}

			if(n==count){
				clearInterval(obj.timer);
				options.complete && options.complete();
			}
		},30);
	},
	getDir:function (obj,ev){
		var x = obj.offsetLeft+obj.offsetWidth/2-ev.clientX;
		var y = obj.offsetTop+obj.offsetHeight/2-ev.clientY;
		return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
	},
	through:function (obj){
		obj.onmouseover=function(ev){
			var oS = this.children[1];
			var oEvent = ev||event;
			var oFrom = oEvent.fromElement||oEvent.relatedTarget;
			if(this.contains(oFrom))return;
			var dir = wangyanMove.getDir(this,oEvent);
			switch(dir){
				case 0:
					oS.style.top = 0;
					oS.style.left = '200px';
					break;
				case 1:
					oS.style.top = '200px';
					oS.style.left = 0;
					break;
				case 2:
					oS.style.top = 0;
					oS.style.left = '-200px';
					break;
				case 3:
					oS.style.top = '-200px';
					oS.style.left = 0;
					break;
			}
			wangyanMove.startMove(oS,{left:0,top:0},{duration:300});
		};
		obj.onmouseout=function(ev){
			var oS = this.children[1];
			var oEvent = ev||event;
			var oTo = oEvent.toElement||oEvent.relatedTarget;
			if(this.contains(oTo))return;
			var dir = wangyanMove.getDir(this,oEvent);
			switch(dir){
				case 0:
					wangyanMove.startMove(oS,{left:200,top:0},{duration:300});
					break;
				case 1:
					wangyanMove.startMove(oS,{left:0,top:200},{duration:300});
					break;
				case 2:
					wangyanMove.startMove(oS,{left:-200,top:0},{duration:300});
					break;
				case 3:
					wangyanMove.startMove(oS,{left:0,top:-200},{duration:300});
					break;
			}
		};
	}
};
window.onload=function(){
	var oUl = document.getElementsByTagName('ul')[0];
	var aLi = oUl.children;
	for(var i=0;i<aLi.length;i++){
		wangyanMove.through(aLi[i]);
	}
};

