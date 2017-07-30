

(function($,win,doc){


	var flag=1;

	//var flag2=1;


	//计算播放进度
	function progress(curr,total,ele){
		var iWidth=parseInt((curr/total).toFixed(2)*100);
		ele.css('width',iWidth+'%');
	}


	//事件绑定相关
	var handler={
		init:function(){
			handler.bindEvent();

			//针对iphone微信端音频自动播放兼容
			doc.addEventListener("WeixinJSBridgeReady", function () { 
      				doc.getElementById('one').play(); 
      				$('#play').addClass('pause').removeClass('play');

			}, false);

			
			$('#audio-one-btn').click();
		},

		bindEvent:function(){

			var audioOne=doc.getElementById('one');
			var audioTwo=doc.getElementById('two');

			var totalOne=null;
			var totalTwo=null;

			//播放前准备状态
			$('#one').on("canplay",function(){
				totalOne=audioOne.duration;
			});
			$('#two').on("canplay",function(){
				totalTwo=audioTwo.duration;
			});

			//播放完成状态
			$('#one').on("ended",function(){
				$('#play').addClass('play').removeClass('pause');
			});


			//播放中的进度控制
			$('#one').on("timeupdate",function(){
				var currOne=audioOne.currentTime;
				progress(currOne,totalOne,$('#progress'));
			});

			$('#two').on("timeupdate",function(){
				var currTwo=audioTwo.currentTime;
				progress(currTwo,totalTwo,$('#progress'));
			});

			$('#two').on("ended",function(){
				$('#play').addClass('play').removeClass('pause');
			});


			//切换
			$("#audio-one-btn").on("click",function(){
				
				flag=1;

				audioTwo.pause();

				//初始化当前进度
				audioOne.currentTime=0;
				//自动播放
				
				$('#play').click();
				
				
				$('#play').addClass('pause').removeClass('play');
				
				$(this).addClass('active');
				$('#audio-two-btn').removeClass('active');
			});
			$("#audio-two-btn").on("click",function(){
				event.stopPropagation();
				flag=0;

				audioOne.pause();
				//初始化当前进度
				audioTwo.currentTime=0;
				//自动播放
				$('#play').click();
				$('#play').addClass('pause').removeClass('play');
				
				$(this).addClass('active');
				$('#audio-one-btn').removeClass('active');
			});


			//播放控制
			$("#play").on("click",function(){

				if(flag){
					if(audioOne.paused){
						$(this).addClass('pause').removeClass('play');
						audioOne.play();
					}else {
						$(this).addClass('play').removeClass('pause');
						audioOne.pause();
					}
				}else {
					if(audioTwo.paused){
						$(this).addClass('pause').removeClass('play');
						audioTwo.play();
					}
					else {
						$(this).addClass('play').removeClass('pause');
						audioTwo.pause();
					}
				}
			})

		}
	}



	$(function(){


		handler.init();
	})



})(jQuery,window,document)