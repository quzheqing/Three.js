$(function() {


	//	3D地图
	var container;
	var camera, scene, renderer, controls;
	var loader, loader2, loader3, loader4, loader5;
	var raycaster, container3d;
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
	var camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 1, 1000 );
	var material6 = new THREE.MeshPhongMaterial({
			color: 0x151515,
			emissive: 0xff0000,
			specular: 0x000000,
			shininess: 100,
			shading: THREE.FlatShading
		});
	
	init();

	//设置sea参数
	loader = new THREE.SEA3D({
		container: container3d,
		async: true,
		scene: scene,
		runScripts: true,
		autoPlay: false,
		renderer: renderer
	});
	loader2 = new THREE.SEA3D({
		container: container3d,
		async: true,
		scene: scene,
		runScripts: true,
		autoPlay: false,
		renderer: renderer
	});
	//导入sea模型
	loader.load('js/modules/798001.tjs.sea');
	var tendonsMeshes, organsMeshes, bloodMeshes;
	loader.onComplete = function(e) {
		if(loader.background) {
//			scene.background = loader.background.color || loader.background.texture;
		}
//		camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);
		camera = new THREE.PerspectiveCamera(55, box3d.clientWidth / box3d.clientHeight, 0.1, 10000);
		var cam = loader.getCamera("Camera001");
		camera.position.copy(cam.position);
		camera.rotation.copy(cam.rotation);
		controls = new THREE.OrbitControls(camera ,box3d);
		//color: 0xff0000, ambient: 0xffffff, specular: 0xcccccc, shininess:50, metal:true,
		var childrens = loader.meshes;
		var material1 = new THREE.MeshPhongMaterial({
			color: 0x000000,
			emissive: 0xf8f8f8,
			specular: 0x000000,
			shininess: 50,
			shading: THREE.FlatShading
		});
		var material2 = new THREE.MeshPhongMaterial({
			color: 0x000000,
			emissive: 0x999999,
			specular: 0x000000,
			shininess: 30,
			shading: THREE.FlatShading
		});
		var material3 = new THREE.MeshPhongMaterial({
			color: 0x000000,
			emissive: 0xff0000,
			specular: 0x000000,
			shininess: 50,
			shading: THREE.FlatShading
		});
		var material4 = new THREE.MeshPhongMaterial({
			color: 0x000000,
			emissive: 0x00ff00,
			specular: 0x000000,
			shininess: 50,
			shading: THREE.FlatShading
		});
		var material5 = new THREE.MeshPhongMaterial({
			color: 0x151515,
			emissive: 0xfefefe,
			specular: 0x000000,
			shininess: 100,
			shading: THREE.FlatShading
		});
		
		for(var i = 0; i < childrens.length; i++) {
			var name = childrens[i].name;
			if(name.indexOf("Wu") >= 0) {
				jiBenMoXins.push(childrens[i]);
			} else if(name.indexOf("Star") >= 0) {
				startMoXins.push(childrens[i])
				childrens[i].material = material3;
			} else if(name.indexOf("Db") >= 0) {
				childrens[i].visible=false;
			} else if(name.indexOf("Ru") >= 0) {
				ruKouMoXins.push(childrens[i]);
				childrens[i].material = material3;
			} else if(name.indexOf("Lu") >= 0) {
				xunLuMoXins.push(childrens[i]);
				childrens[i].material = material4;
			}else if(name.indexOf("lumian") >= 0) {
				childrens[i].material = material2;
			}else if(name == "Rectangle001") {
				childrens[i].material = material5;
			} else {
				childrens[i].material = material5;
//				childrens[i].visible = false;
			}
		}
		
		strLoad = loader.meshes

		console.log(loader.meshes)
		controls.update();
	};
	loader2.onComplete = function(e) {
		strLoad2 = loader2.meshes
	};


	//更新
	function update() {
		var delta = clock.getDelta() * timeScale;
		requestAnimationFrame(update);
		THREE.AMMO.update(delta);
		THREE.SEA3D.ScriptHandler.dispatchUpdate(delta);
		THREE.SEA3D.AnimationHandler.update(delta);
		renderer.render(scene, camera);
	}

	//加载渲染
	function init() {
		
		
		
		THREE.AMMO.init();
		scene = new THREE.Scene();
		container = document.createElement('div');

		box3d.appendChild(container);
		camera = new THREE.PerspectiveCamera(55, box3d.clientWidth / box3d.clientHeight, 200, 2000); //模型太大，导致在SEA
		
		controls = new THREE.OrbitControls(camera, box3d);
		//禁用滚轮放大缩小
		//      controls.enableZoom = false;
		//禁用旋转
		//      controls.enableRotate = false;
		container3d = new THREE.Object3D();
		scene.add(container3d);
		raycaster = new THREE.Raycaster();
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setPixelRatio(box3d.devicePixelRatio);
		renderer.setSize(box3d.clientWidth, box3d.clientHeight);
		renderer.setClearColor(0xffffff, 1);
		renderer.shadowMap.enabled = true;
		renderer.gammaInput = true;
		renderer.gammaOutput = true;
		renderer.toneMappingExposure = 3;
		renderer.toneMappingWhitePoint = 5;
		renderer.toneMapping = THREE.Uncharted2ToneMapping;
		container.appendChild(renderer.domElement);
		clock = new THREE.Clock();
		//获取canvas，有效范围canvas
		var can = document.getElementsByTagName('canvas')[0]
		//监听canvas的鼠标按下事件，旋转视角
		can.addEventListener('mousedown', onDocumentMouseDown, false);
		//鼠标弹起停止旋转
		can.addEventListener('mouseup', onDocumentMouseUp, false);
		//		can.addEventListener('mouseleave',onDocumentMouseLeave, false);
		window.addEventListener('resize', onWindowResize, false);
		update();
	}

	//鼠标点击事件渲染函数
	function render() {
		//		requestAnimationFrame( render );
		camera.updateMatrixWorld();
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
		// 检测射线与多个物体的相交情况
		//基本模型
		var intersects = ray.intersectObjects(jiBenMoXins, true);
		if(intersects.length > 0) {
			//把选中的对象放到全局变量SELECTED中
			SELECTED = intersects[0].object;
			console.log(intersects[0].object);
			
			var arr = ["Lu169", "Lu15", "Lu058", "Lu059","Lu060","Lu050","Lu077"];
//			var arr = ["Lu169", "Lu15", "Lu058"]
			createLines(arr)
		}
		//入口模型
		var intersects = ray.intersectObjects(ruKouMoXins, true);
		if(intersects.length > 0) {
			//把选中的对象放到全局变量SELECTED中
			SELECTED = intersects[0].object;
			console.log(intersects[0].object);
		}
		//起点模型
		var intersects = ray.intersectObjects(startMoXins, true);
		if(intersects.length > 0) {
			//把选中的对象放到全局变量SELECTED中
			SELECTED = intersects[0].object;
			console.log(intersects[0].object);
		}
		//寻路模型
		var intersects = ray.intersectObjects(xunLuMoXins, true);
		if(intersects.length > 0) {
			//把选中的对象放到全局变量SELECTED中
			SELECTED = intersects[0].object;
			console.log(intersects[0].object);
			
			
			var arr = ["Lu169", "Lu04", "Lu053"];
			createLines(arr)
		}
		renderer.render(scene, camera);
	}

	//监听点击事件函数
	function onDocumentMouseDown(event) {
		event.preventDefault();
	}

	function onDocumentMouseUp(event) {
		event.preventDefault();
		render()
	}

	//监听窗口改变
	function onWindowResize() {
		camera.aspect = box3d.clientWidth / box3d.clientHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(box3d.clientWidth, box3d.clientHeight);
		resolution.set( box3d.clientWidth, box3d.clientHeight );
	}
	
	
	//创建线
	var mesh = ''
	function createLines(arr) {	
		if(mesh){
			scene.remove(mesh)
		}
		var line = new THREE.Geometry();
		line.vertices = []
		$.each(arr, function(index,content) {
			var a = scene.getObjectByName(content)
			line.vertices.push( a.position );
		});
		makeLine( line, 3 );
	}
	
	var resolution = new THREE.Vector2( window.innerWidth, window.innerHeight );
	//创建line
	
	function makeLine( geo, c ) {
		var g = new MeshLine();

		g.setGeometry( geo );
	
		var material = new MeshLineMaterial( {
			useMap: false,
			color: new THREE.Color( 0xed6a5a ),
			opacity: 1,
			resolution: resolution,
			sizeAttenuation: !false,
			lineWidth: 0.5,
			near: camera.near,
			far: camera.far
		});
		mesh = new THREE.Mesh( g.geometry, material );
		scene.add( mesh );
	
	}
	
})