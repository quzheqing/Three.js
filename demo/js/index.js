$(function(){
	//天气详情隐藏显示
	$('.right-p2').click(function(){
		$("#detail").slideToggle();
	})
	var city = '北京'
	$.ajax({
		type:"get",
		url:"http://wthrcdn.etouch.cn/WeatherApi?city="+city,
		dateType:"xml",
		async:true,
		success:function(xml){
			var wendu = $(xml).find('wendu').text()
			$('.left-p1').text(wendu+'°')
			var pm25 = $(xml).find('environment>pm25').text()
			$('.right-p1').text('PM.2.5 '+ pm25)
			var day = $(xml).find('forecast weather').eq(0).find('day type').text()
			$('.det-top .p1').text(day)
			$('.det-top .p2').text(city+' 海淀区')
			$('.det-top .p3').text(wendu+'°')
			$.each($('.det-ul1').eq(1).find('li'), function(i) {
				var date = $(xml).find('weather').eq(i).find('date').text().split('星')[0]
				$(this).find('span').text(date)
			});
			$('.det-ul1').eq(1).find('li').eq(0).find('span').text('今天')
			for(var i = 0;i<$('.det-ul1').eq(0).find('li').length;i++){
				var d = new Date()
				var hour = d.getHours()
				hour+=i;
				if(hour>=24){
					hour =hour-24;
				}
				if(hour<10){
					hour = '0'+hour
				}
				$('.det-ul1').eq(0).find('li').eq(i).find('span').text(hour+':00')
			}
			
			$('.bottom-div1 .span4').text(pm25)
			var fengxiang = $(xml).find('>fengxiang').text()
			var fengli = $(xml).find('>fengli').text()
			$('.bottom-div2').find('dl').eq(0).find('dd').eq(0).text(fengxiang)
			$('.bottom-div2').find('dl').eq(0).find('dd').eq(1).text(fengli)
			
			$.each($(xml).find('weather'), function(i) {
				switch($(this).find('day type').text()){
					case '晴':
						$('.det-ul1').find('i').eq(i).html('&#xe603;')
						console.log($('det-ul1').find('i').eq(i).text())
						break;
					case '云':
						$('.det-ul1').find('i').eq(i).html('&#xe604;')
						break;
					case '多云':
						$('.det-ul1').find('i').eq(i).html('&#xe605;')
						break;
					case '中雨':
						$('.det-ul1').find('i').eq(i).html('&#xe606;')
						break;
					case '小雨':
						$('.det-ul1').find('i').eq(i).html('&#xe607;')
						break;
					case '大雨':
						$('.det-ul1').find('i').eq(i).html('&#xe608;')
						break;
					case '雷阵雨':
						$('.det-ul1').find('i').eq(i).html('&#xe609;')
						break;
					case '雨加冰雹':
						$('.det-ul1').find('i').eq(i).html('&#xe60a;')
						break;
					case '特大暴雨':
						$('.det-ul1').find('i').eq(i).html('&#xe60b;')
						break;
					case '暴雨':
						$('.det-ul1').find('i').eq(i).html('&#xe60c;')
						break;
					case '小雪':
						$('.det-ul1').find('i').eq(i).html('&#xe60d;')
						break;
				}
			});
		},
		error:function(){
			console.log(error)
		}
	});
	//右侧btn按钮点击事件
	/*$('#box-r #right-btn').click(function(){
		console.log($('#box-r .right-line').css('display'))
		if($('#box-r .right-line').css('display')=='block'){
			$('#right-btn').animate({
				left:'-135px',
				width:'35px',
				height:'160px',
				marginTop:'-80px'
			})
			$('#right-btn img').css({
				transform:'rotate(0deg)'
			})
			$('.right-line').css({
				display:'none'
			})
			$('#serviceList').animate({
				right:'0px'
			})
			$('#search').css({
				display:'none'
			})
		}else{
			$('#right-btn').animate({
				left:'-50px',
				width:'50px',
				height:'200px',
				marginTop:'-100px'
			})
			$('#right-btn img').css({
				transform:'rotate(180deg)'
			})
			$('.right-line').css({
				display:'block'
			})
			$('#serviceList').animate({
				right:'-100px'
			})
			$('#search').css({
				display:'block'
			})
		}
		
	})*/
	
	//list服务清单点击事件
	//点击展会
	for(var i = 0;i<$('#box-r #serviceList li').length;i++){
		$('#box-r #serviceList li').eq(i).click(function(){
			$(this).addClass('active').siblings().removeClass('active');
			index = 0;
			clearInterval(timer)
			$('#banner').slideUp()
			$('#draw').slideUp()
			$('#jigou').slideUp()
			$('#search').slideUp()
			$('#draw-detail').slideUp()
			$('#way').slideUp()
			$("#detail").slideUp()
		})
	}
	//展会
	$('#box-r #serviceList li').eq(0).click(function(){
		$('#banner').slideDown()
		banChange()
		clearInterval(timer)
		timer = setInterval(banChange,3000);
	})
	//画廊
	$('#box-r #serviceList li').eq(4).click(function(){
		$('#draw').slideDown()
	})
	//画廊详情
	$('.go-btn').click(function(){
		$('#draw-detail').css({
			display:'none'
		})
		$('#way').css({
			display:'block'
		})
	})
	
	//路线规划
	$.each($('#way ul li'),function(){
		$(this).click(function(){
			if($(this).index()==$('#way ul li').length-1){
				$('#way ul').css({
					background:'#ccc'
				})
			}else{
				$('#way ul').css({
					background:'#fff'
				})
			}
			$(this).addClass('activeli').siblings().removeClass()
		})
	})
	$('#way .way-span2').click(function(){
		$('#way').css({
			display:'none'
		})
		$('#way-phone').css({
			display:'block'
		})
	})
	
	//发送路线到手机
	$('.phone-top button').click(function(){
		$('#way-phone').css({
			display:'none'
		})
		$('#way').css({
			display:'block'
		})
	})
	var iptStr = ''
	$.each($('.phone-bottom ul li'), function() {
		$(this).click(function(){
			iptStr += $(this).text();
			$('#phone-ipt').val(iptStr)
			$('#phone-ipt').focus()
		})
	});
	
	
	
	
	//机构
	$('#box-r #serviceList li').eq(5).click(function(){
		$('#jigou').fadeIn()
	})
	
	
	var timer = null;
	var index = 0;
	//展会轮播图
	function banChange(){
		if(index == $('.ban-ul li').length) {
			index = 0
		}
		$('.ban-ul li').eq(index).fadeIn().siblings().fadeOut();
		index++;
	}
	$('.ban-btnleft').click(function(){
		index-=2;
		if(index == -1){
			index = $('.ban-ul li').length-1;
		}
		banChange();
		clearInterval(timer)
		timer = setInterval(banChange,3000);
	})
	$('.ban-btnright').click(function(){
		clearInterval(timer)
		banChange();
		timer = setInterval(banChange,3000);
	})
	$('.ban-ul').mouseover(function(){
		clearInterval(timer)
	})
	$('.ban-ul').mouseout(function(){
		clearInterval(timer)
		timer = setInterval(banChange,3000);
	})
	
	
	//search搜索
	var searchStr = ''
	$('.search-top').click(function(){
		$('.search-detail').css({
			display:'block'
		})
	})
	$.each($('.search-left span'), function() {
		$(this).click(function(){
			console.log($(this).index())
			searchStr += $(this).text()
			$('#search-ipt').val(searchStr)
			$('#search-ipt').focus()
		})
	});
	//清空按钮
	$('#search-btn').click(function(){
		$('#search-ipt').val('')
		$('#search-ipt').focus()
		searchStr = ''
	})
	//删除按钮
	$('.search-right span').click(function(){
		searchStr = $('#search-ipt').val()
		searchStr = searchStr.substring(0,searchStr.length - 1);
		$('#search-ipt').val(searchStr)
		$('#search-ipt').focus()
	})
	
})



//3D地图
/**
 *
 */
$(function(){
    var container;
    var camera, scene, renderer, controls;
    var loader,loader2,loader3,loader4,loader5;
    var raycaster,container3d;
    var mouse = new THREE.Vector2();
    var clock;
    var timeScale = 1;


    init();
    
    //设置sea参数
    loader = new THREE.SEA3D( {
        container : container3d,
        async: true,
        scene : scene,
        runScripts : true,
        autoPlay : false,
        renderer: renderer
    } );
    loader2 = new THREE.SEA3D( {
        container : container3d,
        async: true,
        scene : scene,
        runScripts : true,
        autoPlay : false,
        renderer: renderer
    } );
    loader3 = new THREE.SEA3D( {
        container : container3d,
        async: true,
        scene : scene,
        runScripts : true,
        autoPlay : false,
        renderer: renderer
    } );
    loader4 = new THREE.SEA3D( {
        container : container3d,
        async: true,
        scene : scene,
        runScripts : true,
        autoPlay : false,
        renderer: renderer
    } );
    loader5 = new THREE.SEA3D( {
        container : container3d,
        async: true,
        scene : scene,
        runScripts : true,
        autoPlay : false,
        renderer: renderer
    } );
	//导入sea模型
	loader.load( './modules/798/color/01.sea' );
    loader2.load( './modules/798/color/02.sea' );
    loader3.load( './modules/798/color/dm.sea' );
    loader4.load( './modules/798/color/ml.sea' );
    loader5.load( './modules/798/color/Android.sea' );
    var tendonsMeshes,organsMeshes,bloodMeshes;
    loader.onComplete = function( e ) {
        if ( loader.lights == undefined ) {
            var p1 = new THREE.PointLight( 0xFFFFFF, 1 );
            var p2 = new THREE.PointLight( 0xFFFFFF, .5 );
            var p3 = new THREE.PointLight( 0xFFFFFF, .5 );
            var p4 = new THREE.PointLight( 0xFFFFFF, .5 );
            var p5 = new THREE.PointLight( 0xFFFFFF, .5 );
            var p6 = new THREE.PointLight( 0xFFFFFF, .5 );
            p1.position.set( - 100000, 100000, - 100000 );
            p2.position.set( 100000, 100000, 100000 );
            p3.position.set( 100000, - 100000, 100000 );
            p4.position.set( 100000, - 100000, -100000 );
            p5.position.set( -100000, - 100000, -100000 );
            p6.position.set( -100000, - 100000, 100000 );
            container3d.add( p1 );
            container3d.add( p2 );
            container3d.add( p3 );
            container3d.add( p4 );
            container3d.add( p5 );
            container3d.add( p6 );
            loader.updateScene();
        }
        if (loader.background) {
            scene.background = loader.background.color || loader.background.texture;
        }
		//更改颜色
		setRgb('box461',{r:250,g:1,b:1})
		var objHere = scene.getObjectByName('box461')
		var setp = objHere.position;
		/*导入精灵图片*/
		spName0.scale.set(15, 15);
        spName0.position.set(setp.x, setp.y+10, setp.z);
        //设置精灵动画
        setInterval(function(){
        	var spriteTween = createjs.Tween.get(spName0.position)  
        	.to({x:spName0.position.x,y:spName0.position.y+2,z:spName0.position.z}, 200)
        	.to({x:spName0.position.x,y:spName0.position.y,z:spName0.position.z}, 200)
        	.to({x:spName0.position.x,y:spName0.position.y+2,z:spName0.position.z}, 200)
        	.to({x:spName0.position.x,y:spName0.position.y,z:spName0.position.z}, 200)
        },2000)
        scene.add(spName0);
    	strLoad = loader.meshes
    	
    	console.log(loader.meshes)
        focus();
        controls.update();   
    };
    loader2.onComplete = function( e ) {
    	strLoad2 = loader2.meshes
    };
    loader3.onComplete = function( e ) {
        bonesMeshes = loader3.meshes;
    };

    loader4.onComplete = function( e ) {
        tendonsMeshes = loader4.meshes;
    };

    loader5.onComplete = function( e ) {
        organsMeshes = loader5.meshes;
    };
	
	
	//贴图相关
	var strLoad = [];
	var strLoad2 = [];
	var flogSp1 = false;
	var flogSp2 = false;
	var flogSp3 = false;
	
	var spName0 = createSprite('img/here1.png')
	var sP = createSpriteText('南','','','red');
	var sP2 = createSpriteText('北','','','red');
	var sP3 = createSpriteText('西','','','red');
	var sP4 = createSpriteText('东','','','red');
	sP.scale.set(50,40,50);
	sP2.scale.set(50,40,50);
	sP3.scale.set(50,40,50);
	sP4.scale.set(50,40,50);
	sP.position.set(0,0,90)
	sP2.position.set(0,0,-90)
	sP3.position.set(-120,0,0)
	sP4.position.set(120,0,0)
	
	scene.add(spName0)
	scene.add(sP)
	scene.add(sP2)
	scene.add(sP3)
	scene.add(sP4)
	//路线初始数据
	var materialTemp = new THREE.LineBasicMaterial({
        color: 0xff0000,
        linewidth:'100',
        linecap: 'round', //ignored by WebGLRenderer
        linejoin: 'round' //ignored by WebGLRenderer
  	});
	
	//list服务清单点击事件
	//点击展会
	for(var i = 0;i<$('#box-r #serviceList li').length;i++){
		$('#box-r #serviceList li').eq(i).click(function(){
			//判断line
			if(line){
				//line有值则移除
				scene.remove(line)
			}
			//移除路线贴图
			removeAjax("js/drawRoad.json")
			removeAjax("js/index2.json")
			removeAjax("js/eatRoad.json")
			removeAjax("js/publicRoad.json")
			removeAjax("js/shop-buy.json")
		})
	}
	//服务点击
	$('#serviceList .list-ul li').eq(1).click(function(){
		getShop("js/publicRoad.json")
		createSphere()
	})
	//购物点击
	$('#serviceList .list-ul li').eq(2).click(function(){
		getShop("js/shop-buy.json")
	})
	var objPer = {}
	//餐饮点击
	$('#serviceList .list-ul li').eq(3).click(function(){
		getShop("js/eatRoad.json")
	})
	$('#serviceList .list-ul li').eq(4).click(function(){
		
	})
	
	
	//take me go点击事件
	$('.go-btn').click(function(){
		//判断line
		if(line){
			//line有值则移除
			scene.remove(line)
		}
		//移除路线贴图
		removeAjax("js/drawRoad.json")
		removeAjax("js/index2.json")
		removeAjax("js/eatRoad.json")
		removeAjax("js/publicRoad.json")
		url = "js/index2.json"
		getAjax()
	})
	//搜索框li单击事件
	$('.search-list').click(function(){
		$('#search').fadeOut()
		$('#draw-detail').fadeIn()
	})
	
	$('h1').click(function(){
		//判断line
		if(line){
			//line有值则移除
			scene.remove(line)
		}
		//移除路线贴图
		removeAjax("js/drawRoad.json")
		removeAjax("js/index2.json")
		removeAjax("js/eatRoad.json")
		removeAjax("js/publicRoad.json")
		$('#search').slideDown()
		$('.search-detail').fadeOut()
		$('#banner').fadeOut()
		$('#draw-detail').fadeOut()
		$('#draw').fadeOut()
		$('#jigou').fadeOut()
		$('#way').fadeOut()
	})
	$('.close').click(function(){
		$('.search-detail').css({
			display:'none'
		})
	})
	//搜索中li点击事件
	$('.search-bottom div span').click(function(){
		//判断line
		if(line){
			//line有值则移除
			scene.remove(line)
		}
		//移除路线贴图
		removeAjax("js/drawRoad.json")
		removeAjax("js/index2.json")
		removeAjax("js/eatRoad.json")
		removeAjax("js/publicRoad.json")
		$('#search').hide()
		url = "js/drawRoad.json"
		getAjax()
	})
	var geometry5 = new THREE.Geometry();
	var line5 = new THREE.Line();
	$('.way-ul li').click(function(){
		return false;
	})
	//给动态添加生成的路线li添加委托时间
	$('body').on('click','.way-ul li',function(){
		if($(this).index()==$('#way ul li').length-1){
			$('#way ul').css({
				background:'#ccc'
			})
		}else{
			$('#way ul').css({
				background:'#fff'
			})
		}
		$(this).addClass('activeli').siblings().removeClass()
		//点击li的下标
		var index = $(this).index()
		var arr = []
		for(var i = 0;i<index+2;i++){
			//空数组接收返回数据的数组
			arr.push(LineArr5[i])
		}
		//判断line
		if(line){
			//line有值则移除
			scene.remove(line)
		}
		wayRoad(arr)
		$.each(ballArr, function(i) {
			var obj = scene.getObjectByName(ballArr[i])
			obj.geometry.computeBoundingSphere();
			obj.material.opacity = 0;
		});
		ballMove(arr)
		perMove([arr[index],arr[index+1]])
		
	})
	//重新播放路线
	$('.way-span1').click(function(){
		roadPlay()
	})
	
	//展会轮播图点击事件
	$('.ban-ul li').click(function(){
		$('#banner').hide()
		$('#draw-detail').show()
	})
	
	//画廊里li点击事件
	$('#draw li').click(function(){
		$('#draw').hide()
		$('#draw-detail').show()
	})
	
	//机构li点击事件
	$('#jigou li').click(function(){
		$('#jigou').hide()
		$('#draw-detail').show()
	})
	
	
	
	//路线自动播放
	function roadPlay(){
		var time = 100;
		$.each($('.way-ul li'), function(j) {
//			console.log($('.way-ul li').length)
			roadTimer = setTimeout(function(){
//				clearTimeout(roadTimer)
				$('.way-ul li').eq(j).click()
			},time)
			time+=2000;
		});
		if(time>100){
			$('.way-tou').show()
		}
		setTimeout(function(){
			$('.way-tou').hide()
		},time)
	}
	
	var url,roadTimer = null;
	var LineArr5 = []
	//根据obj位置设置路线
	function getAjax(){
		var str = '';
		LineArr5 = []
		$.ajax({
			type:"get",
			url:url,
			dateType:"json",
			async:true,
			success:function(date){
				$('.way-ul').html('');
				$.each(date, function(i) {
					if(i>0){
						setRgb(date[i].obj,date[i].num)
						setSp(date[i].obj,date[i].imgSizeX,date[i].imgSizeY,date[i].imgFile)
						createText(date[i].text1,date[i].text2,date[i].obj,date[i].num)
						
						spOpacity('sp'+date[i].obj)
						spOpacity('text'+date[i].obj)
					}
					if(i<date.length-1){
						str+='<li class=""><i></i><span>'+(i+1)+'</span></li>'
					}
					LineArr5.push(date[i].obj)
				});
				$('.way-ul').html(str);
				$('.way-ul li').eq(0).addClass('activeli')
				$('#way').show()
				addSphere(LineArr5)
				//自动播放路线
				roadPlay()
			},
			error:function(){
				console.log(error)
			}
		});
	}
	
	//移除贴图及文字
	function removeAjax(url){
		$.ajax({
			type:"get",
			url:url,
			dateType:"json",
			async:true,
			success:function(date){
				$.each(date, function(i) {
					if(i>0){
						var num = {r:1,g:1,b:1}
						setRgb(date[i].obj,num)
						removeSprite(date[i].obj)
						removeSphere(date[i].obj)
						removeText(date[i].obj)
					}
				});
				
			},
			error:function(){
				console.log(error)
			}
		});
	}
	//创建贴图及文本
	function getShop(url){
		$.ajax({
			type:"get",
			url:url,
			dateType:"json",
			async:true,
			success:function(date){
				$('.way-ul').html('');
				$.each(date, function(i) {
					if(i>0){
						setRgb(date[i].obj,date[i].num)
						setSp(date[i].obj,date[i].imgSizeX,date[i].imgSizeY,date[i].imgFile)
						createText(date[i].text1,date[i].text2,date[i].obj,date[i].num)
						spOpacity('sp'+date[i].obj)
						spOpacity('text'+date[i].obj)
						//贴图及文字坐标点
				        var ccc = scene.getObjectByName('sp'+date[i].obj)
				        var ddd = scene.getObjectByName('text'+date[i].obj)
				        //贴图及文字动画
				        var spriteTween = createjs.Tween.get(ccc.position)  
				        	.to({x:ccc.position.x,y:ccc.position.y+2,z:ccc.position.z}, 200)
				        	.to({x:ccc.position.x,y:ccc.position.y,z:ccc.position.z}, 200)
				        	.to({x:ccc.position.x,y:ccc.position.y+2,z:ccc.position.z}, 200)
				        	.to({x:ccc.position.x,y:ccc.position.y,z:ccc.position.z}, 200)
				    	var textTween = createjs.Tween.get(ddd.position)  
				    		.to({x:ddd.position.x,y:ddd.position.y+2,z:ddd.position.z}, 200)
				    		.to({x:ddd.position.x,y:ddd.position.y,z:ddd.position.z}, 200)
				    		.to({x:ddd.position.x,y:ddd.position.y+2,z:ddd.position.z}, 200)
				    		.to({x:ddd.position.x,y:ddd.position.y,z:ddd.position.z}, 200)
					}
				});
				$('#way').hide()
			},
			error:function(){
				console.log(error)
			}
		});
	}
	//opacity变化
	function spOpacity(name){
		var sprite = scene.getObjectByName(name)
		var tween = createjs.Tween.get(sprite.material)
        	.to({opacity:0.2},200)
        	.to({opacity:0.4},200)
        	.to({opacity:0.6},200)
        	.to({opacity:0.8},200)
        	.to({opacity:1},200)
	}
	
	
	//路线
	var line = ''
	function wayRoad(lineArr){
		var geometry = new THREE.Geometry();
		line = new THREE.Line();
		for(var i = 0;i<lineArr.length;i++){
			var obj = scene.getObjectByName(lineArr[i])
			obj.geometry.computeBoundingSphere();
			obj.material.materials[0].color.setRGB(255,0,255)
			geometry.vertices.push(obj.position);
		}
		
		line = new THREE.Line(geometry, materialTemp)
//		console.log(line)
		scene.add(line)
	}
	//小人移动路线函数
	function perMove(lineArr){
		//重置移动小人位置
		var aaa = scene.getObjectByName(lineArr[0])
		var bbb = scene.getObjectByName(lineArr[1])
		
		objPer = scene.getObjectByName('Cylinder001')
		objPer.position.set(aaa.position.x,aaa.position.y,aaa.position.z)
		//小人移动坐标点
        var tween = createjs.Tween.get(objPer.position)          
            .to({x:bbb.position.x,y:bbb.position.y,z:bbb.position.z}, 2000)
            
        //贴图及文字坐标点
        var ccc = scene.getObjectByName('sp'+lineArr[1])
        var ddd = scene.getObjectByName('text'+lineArr[1])
        //贴图及文字动画
        var spriteTween = createjs.Tween.get(ccc.position)  
        	.to({x:ccc.position.x,y:ccc.position.y+2,z:ccc.position.z}, 200)
        	.to({x:ccc.position.x,y:ccc.position.y,z:ccc.position.z}, 200)
        	.to({x:ccc.position.x,y:ccc.position.y+2,z:ccc.position.z}, 200)
        	.to({x:ccc.position.x,y:ccc.position.y,z:ccc.position.z}, 200)
    	var textTween = createjs.Tween.get(ddd.position)  
    		.to({x:ddd.position.x,y:ddd.position.y+2,z:ddd.position.z}, 200)
    		.to({x:ddd.position.x,y:ddd.position.y,z:ddd.position.z}, 200)
    		.to({x:ddd.position.x,y:ddd.position.y+2,z:ddd.position.z}, 200)
    		.to({x:ddd.position.x,y:ddd.position.y,z:ddd.position.z}, 200)
	}
	
	//ball亮起函数
	function ballMove(arr){
		var time = 131
		$.each(ballArr, function(i) {
			if(i<(arr.length-2)*15){
				var obj = scene.getObjectByName(ballArr[i])
				obj.geometry.computeBoundingSphere();
				obj.material.opacity = 1;
			}else if(i<(arr.length-1)*15){
				setTimeout(function(){
					var obj = scene.getObjectByName(ballArr[i])
					obj.geometry.computeBoundingSphere();
//					console.log(obj)
					obj.material.opacity = 1;
				},time)
				time+=131
			}else{
				var obj = scene.getObjectByName(ballArr[i])
				obj.geometry.computeBoundingSphere();
				obj.material.opacity = 0;
			}
		});
	}
	
	//根据起始点创建球体
	var ballArr = [];
	var arrNum = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14]
	function addSphere(arr){
		var num =  (arr.length-1)*15
		ballArr = []
		for(var i = 0;i<arr.length-1;i++){
			var aaa = scene.getObjectByName(arr[i])
			var bbb = scene.getObjectByName(arr[i+1])
			var x1 = aaa.position.x;
			var x2 = bbb.position.x;
			var z1 = aaa.position.z;
			var z2 = bbb.position.z;
			var lessX = (x2-x1)/15;
			var lessZ = (z2-z1)/15;
			var time = 131
			$.each(arrNum, function(j) {
				createSphere(arr[i+1]+j,(x1+j*lessX),(z1+j*lessZ))
			});
		}
	}
	
	//创建球体
	var sphereName = []
	function createSphere(name,x,z){
		//设置球体的值
	    var radius = 1, segemnt = 0.1, rings = 0.1;
	 
	    var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
	 
	    var sphere = new THREE.Mesh(new THREE.SphereGeometry(radius,segemnt,rings),sphereMaterial);
	 
	    sphere.geometry.verticesNeedUpdate = true;
	    sphere.geometry.normalsNeedUpdate = true;
	    sphere.geometry.computeBoundingSphere();
	    sphere.material.transparent = true;
	    sphere.name = name;
	    sphere.material.opacity = 0;
	    sphere.position.set(x,0,z)
	    ballArr.push(sphere.name)
	    scene.add(sphere)
	}
	
	//更改颜色函数
	var num = {r:255,g:0,b:0}
	//设置精灵
	function createSprite(imageFile,name){
		//导入精灵图片
		var texture = new THREE.TextureLoader().load(imageFile);
	    var mat = new THREE.SpriteMaterial();
	    mat.map = texture;//材质的Map属性用于添加纹理
	    mat.needsUpdate = true;
	    var sprite = new THREE.Sprite(mat);
	    sprite.name = name;
	    return sprite;
	}
	//根据obj模型设置精灵
	function setSp(objName,imgSizeX,imgSizeY,imgFile){
		//导入精灵图片
		var texture = new THREE.TextureLoader().load(imgFile);
	    var mat = new THREE.SpriteMaterial();
	    mat.map = texture;//材质的Map属性用于添加纹理
	    mat.needsUpdate = true;
	    var sprite = new THREE.Sprite(mat);
	    sprite.name = 'sp'+objName;
		var objName = scene.getObjectByName(objName)
		var setp = objName.position;
        sprite.scale.set(imgSizeX, imgSizeY); 
        sprite.position.set(setp.x, setp.y+parseInt(imgSizeY)-2, setp.z);
        sprite.material.transparent = true;
        sprite.material.opacity = 0;
    	scene.add(sprite);
	}
	//移除贴图
	function removeSprite(objName){
		scene.getObjectByName('sp'+objName)
		scene.remove(scene.getObjectByName('sp'+objName))
	}
	//移除文本
	function removeText(objName){
		scene.getObjectByName('text'+objName)
		scene.remove(scene.getObjectByName('text'+objName))
	}
	//移除球体
	function removeSphere(objName){
		for(var i =0;i<15;i++){
			scene.getObjectByName(objName+i)
			scene.remove(scene.getObjectByName(objName+i))
		}
	}
	//根据obj创建文字贴图
	function createText(text,text2,objName,color){
        //先用画布将文字画出
        var canvas = document.createElement("canvas");
        canvas.width = 320;
        canvas.height = 256;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.font = "normal 30px 微软雅黑";
        ctx.lineWidth = 4;
        ctx.textAlign = 'left';
        ctx.fillText(text,140,120);
        ctx.font = "normal 22px 微软雅黑";
        ctx.textAlign = 'center';
        ctx.fillText(text2,180,150);
        ctx.closePath(); 
        
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        //使用Sprite显示文字
        var material = new THREE.SpriteMaterial({map:texture});
        var textObj = new THREE.Sprite(material);
        //文字缩放比例x,y,z
        textObj.name = 'text'+objName;
        var objName = scene.getObjectByName(objName)
		var setp = objName.position;
		//文字加入场景
        textObj.scale.set(22, 20,22); 
        textObj.position.set(setp.x, setp.y+10.1, setp.z);
        scene.add(textObj)
	}
	
	
	//设置颜色
	function setRgb(name,num){
		var obj = scene.getObjectByName(name)
		obj.material.materials[0].color.setRGB(num.r,num.g,num.b)
		//赋予新材质改变颜色，有阴影等效果
//		obj.material = new THREE.MeshPhongMaterial({
//	        color: 0x7777ff
//      });
	}
	//创建文字贴图
	function createSpriteText(text,text2,name,color){
        //先用画布将文字画出
        var canvas = document.createElement("canvas");
        canvas.width = 256;
        canvas.height = 256;
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = color;
        ctx.font = "normal 30px 微软雅黑";
        ctx.lineWidth = 4;
        ctx.fillText(text,90,100);
        
        ctx.font = "normal 20px 微软雅黑";
        ctx.fillText(text2,125,130);
        
        var texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        //使用Sprite显示文字
        var material = new THREE.SpriteMaterial({map:texture});
        var textObj = new THREE.Sprite(material);
        //文字缩放比例x,y,z
        textObj.scale.set(10,5,10);
        textObj.position.set(0,0,98);
        textObj.name = name;
        return textObj;
	}
    var bbox;
    function focus() {
        bbox = new THREE.Box3().setFromObject(container3d);
        var cx = bbox.min.x + ( bbox.max.x - bbox.min.x ) * .5;
        var cy = bbox.min.y + ( bbox.max.y - bbox.min.y ) * .5;
        var cz = bbox.min.z + ( bbox.max.z - bbox.min.z ) * .5;
        var sub = new THREE.Vector3().subVectors( bbox.max, bbox.min )
        var dist = Math.max( sub.x, sub.y, sub.z );
        var radius = dist * Math.sqrt( .5 );
        camera.near = dist / 1000;
        camera.far = dist * 200;
        camera.updateProjectionMatrix();
        //调整摄像机的位置
        camera.position.set( 1.2216374967811707, 100.60354859064611,168.1973998977555 );
        controls.update();
        container3d.position.set( - cx, - cy, - cz );
    }
	//更新
    function update() {
        var delta = clock.getDelta() * timeScale;
        requestAnimationFrame( update );
        THREE.AMMO.update( delta );
        THREE.SEA3D.ScriptHandler.dispatchUpdate( delta );
        THREE.SEA3D.AnimationHandler.update( delta );
        renderer.render(scene, camera );
    }
	
	//加载渲染
    function init() {
        THREE.AMMO.init();
        scene = new THREE.Scene();
        container = document.createElement( 'div' );
        var box3d = document.getElementById('box3d')
        box3d.appendChild( container );
        camera = new THREE.PerspectiveCamera( 55, box3d.clientWidth / box.clientHeight, 200, 2000 );     //模型太大，导致在SEA
        controls = new THREE.OrbitControls( camera );
        //禁用滚轮放大缩小
//      controls.enableZoom = false;
        //禁用旋转
        controls.enableRotate = false;
        container3d = new THREE.Object3D();
        scene.add( container3d );
		raycaster = new THREE.Raycaster();
        //camera.position.set( 300, 300,300 );
        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( box3d.clientWidth, box3d.clientHeight);
        //renderer.setClearColor( 0x4F145F, 1 );
        renderer.setClearColor( 0xeeeeee, 1 );
        renderer.shadowMap.enabled = true;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.toneMappingExposure = 3;
        renderer.toneMappingWhitePoint = 5;
        renderer.toneMapping = THREE.Uncharted2ToneMapping;
        container.appendChild( renderer.domElement );
        clock = new THREE.Clock();
        //获取canvas，有效范围canvas
        var can = document.getElementsByTagName('canvas')[0]
        //监听canvas的鼠标按下事件，旋转视角
		can.addEventListener('mousedown',onDocumentMouseDown, false);
		//鼠标弹起停止旋转
		can.addEventListener('mouseup',onDocumentMouseUp, false);
//		can.addEventListener('mouseleave',onDocumentMouseLeave, false);
		window.addEventListener( 'resize', onWindowResize, false );
        update();
    }
	
	
//鼠标点击事件渲染函数
	var INTERSECTED = null;
	function render() {
//		requestAnimationFrame( render );
		camera.updateMatrixWorld();
		//光线碰撞
		raycaster.setFromCamera( mouse, camera );
		var intersects = raycaster.intersectObjects( scene.children,true );
		if ( intersects.length > 0 ) {
			console.log(intersects[ 0 ].object)//捕获鼠标点击的模型
			if(intersects[ 0 ].object.name == 'box437'){
				removeSprite('box437')
				removeText('box437')
				setRgb('box437',{r:255,g:1,b:1})
				setSp('box437',24,12,"img/draw.png")
				createText('艺术中心','welcome','box437',{r:255,g:1,b:1})
				spOpacity('spbox437')
				spOpacity('textbox437')
			}else{
				removeSprite('box437')
				removeText('box437')
				setRgb('box437',{r:1,g:1,b:1})
			}
			if(intersects[ 0 ].object.type == 'Sprite' && intersects[ 0 ].object.name != undefined && intersects[ 0 ].object.name != ''){
				if ( INTERSECTED != intersects[ 0 ].object ) {
					INTERSECTED = intersects[ 0 ].object
					INTERSECTED.visible = false;
					$('#way').hide()
					$('#draw-detail').slideDown()
					//判断line
					if(line){
						//line有值则移除
						scene.remove(line)
					}
					//移除路线贴图
					removeAjax("js/drawRoad.json")
					removeAjax("js/index2.json")
					removeAjax("js/eatRoad.json")
					removeAjax("js/publicRoad.json")
					removeAjax("js/shop-buy.json")
				}
			}
		} else {
			INTERSECTED = null;
		}
		renderer.render( scene, camera );
	}
	
	//监听点击事件函数
    function onDocumentMouseDown( event ) {
        event.preventDefault();
        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
        //鼠标按下可以旋转
        controls.enableRotate = true;
        render()
    }
    function onDocumentMouseUp( event ) {
        event.preventDefault();
        //鼠标弹起禁止旋转
        controls.enableRotate = false;
        //鼠标弹起相机位置
        console.log(camera.position)
        render()
    }

	//监听窗口改变
    function onWindowResize() {
        camera.aspect = box3d.clientWidth / box3d.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( box3d.clientWidth, box3d.clientHeight );
    }
});










	