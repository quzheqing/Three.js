
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
    
    var startMoXins = [];
	var jiBenMoXins = [];
	var ruKouMoXins = [];
	var xunLuMoXins = [];
	var daoShiMoXins = [];
	var jiBen_ruKou = [];
	var ruKou_xunLu = [];
	var daoShi_xunLu = [];

	var box3d = document.getElementById('box-3d')

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
	loader.load( 'js/modules/01.sea' );
    loader2.load( 'js/modules/02.sea' );
    loader3.load( 'js/modules/dm.sea' );
    loader4.load( 'js/modules/ml.sea' );
    loader5.load( 'js/modules/Android.sea' );
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
  
  
	
	//新3D
	$('#service').click(function(){
		removeSprite('box461')
		setSp('box461', 20, 20, 10, 'img/here1.png')
		Road(['box461','box033','box1125','box134'])
	})
	//服务列表
	$('#service_list')
	//底部dl点击事件
	$.each($('#bom_nav .nav dl'), function(index, content) {
		$(this).click(function(){
			onWindowResize()
		})
	})
	
	
	function Road(lineArr) {
		//判断line
		if(line) {
			//line有值则移除
			scene.remove(line)
		}
		
		var start = scene.getObjectByName('spbox461')
		console.log(scene.getObjectByName('spbox437'))
		console.log(scene.getObjectByName(lineArr[0]))
		start.position.x = scene.getObjectByName(lineArr[0]).position.x;
		start.position.y = 12;
		start.position.z = scene.getObjectByName(lineArr[0]).position.z;
		console.log(2333)
		spriteTween = createjs.Tween.get(start.position, {
			override: true,
			loop: false,
			_useTicks: true
		})
		var geometry1 = new THREE.Geometry();
		line = new THREE.Line();
		num = 0;
		for(var i = 0; i < lineArr.length; i++) {
			if(lineArr[i] != '') {
				var objA = scene.getObjectByName(lineArr[i])
				//小球显示隐藏
				console.log(objA)
				console.log(objA.geometry.boundingSphere.center)
				geometry1.vertices.push(objA.position);
				spriteTween.to({
					x: objA.position.x,
					y: 12,
					z: objA.position.z
				}, 800)
				console.log(spriteTween)
			}
		}
		line = new THREE.Line(geometry1, materialTemp)
		console.log(line)
		scene.add(line)
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
	//根据obj模型设置精灵
	function setSp(objName, imgSizeX, imgSizeY, height, imgFile) {
		//导入精灵图片
		var texture = new THREE.TextureLoader().load(imgFile);
		var mat = new THREE.SpriteMaterial();
		mat.map = texture; //材质的Map属性用于添加纹理
		mat.needsUpdate = true;
		var sprite = new THREE.Sprite(mat);
		sprite.name = 'sp' + objName;
		var objName = scene.getObjectByName(objName)
		var setp = objName.position;
		console.log(setp)
		sprite.scale.set(imgSizeX, imgSizeY);
		sprite.position.set(setp.x, setp.y + parseInt(height), setp.z);
		sprite.material.transparent = true;
		sprite.material.opacity = 1;
		console.log(sprite)
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
		obj.material[0].color.setRGB(num.r,num.g,num.b)
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
        container3d.position.set( - cx, - cy, - cz );
        controls.update();
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
        
        box3d.appendChild( container );
        camera = new THREE.PerspectiveCamera( 55, box3d.clientWidth / box3d.clientHeight, 200, 2000 );     //模型太大，导致在SEA
        controls = new THREE.OrbitControls( camera,box3d );
        //禁用滚轮放大缩小
//      controls.enableZoom = false;
        //禁用旋转
//      controls.enableRotate = false;
        container3d = new THREE.Object3D();
        scene.add( container3d );
		raycaster = new THREE.Raycaster();
        //camera.position.set( 300, 300,300 );
        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setPixelRatio( box3d.devicePixelRatio );
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
		
		//光线碰撞位置正确
		var canvas = document.getElementById('box-3d');
		var width = document.getElementById('box-3d').clientWidth;
		var height = document.getElementById('box-3d').clientHeight;
		var rect = canvas.getBoundingClientRect();
		var x = event.clientX - rect.left; // left offset
		var y = event.clientY - rect.top; //top offset
		mouse.x = (x / width) * 2 - 1;
		mouse.y = -(y / height) * 2 + 1;
		var ray = new THREE.Raycaster();
		ray.setFromCamera(mouse, camera);
		scene.updateMatrixWorld();
		
		
		
//		raycaster.setFromCamera( mouse, camera );
		var intersects = ray.intersectObjects( scene.children,true );
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
        console.log(event.pageX)
        //鼠标按下可以旋转
//      controls.enableRotate = true;
//      render()
    }
    function onDocumentMouseUp( event ) {
        event.preventDefault();
        //鼠标弹起禁止旋转
//      controls.enableRotate = false;
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
