var common={
    qiu:function(){
        var str= '<img class="html-qiu" src="images/qiu-html.png" alt="div培训">'+
                '<img class="css-qiu" src="images/qiu-css.png" alt="css培训">'+
                '<img class="js-qiu" src="images/qiu-js.png" alt="web前端开发培训">';
        var oQiuBox=document.createElement('div');
        oQiuBox.className='qiu-box';
        oQiuBox.innerHTML=str;
        document.body.appendChild(oQiuBox);
        var aQiu=document.querySelectorAll('.qiu-box img');
        var i=0;
        var timer=null;
        timer=setInterval(function(){
            if(i>=aQiu.length){
                clearInterval(timer);
                return;
            }
            aQiu[i].classList.add('active-to');
            (function(ind){
                if(i>aQiu.length)return;
                setTimeout(function(){
                    aQiu[ind].classList.remove('active-to');
                    aQiu[ind].classList.add('active');
                },6000);
            })(i);
            i++;
        },500);
    }
}