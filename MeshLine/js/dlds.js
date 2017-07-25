

//3D相关
$(function() {
	var mouse = new THREE.Vector2();

	var camera, renderer, composer, controls;

	var loader;
	var startMoXins = [];
	var jiBenMoXins = new Array();
	var ruKouMoXins = new Array();
	var xunLuMoXins = new Array();
	var daoShiMoXins = new Array();
	var starMoXins = [];
	var jiBen_ruKou = [];
	var ruKou_xunLu = [];
	var daoShi_xunLu = [];
	
	var scene;
	scene = new THREE.Scene();
	scene.position.x = 0;
	scene.position.y = 0;
	scene.position.z = 0;

	var box3d = document.getElementById('box-3d');
	var canvas = document.getElementById('box-3d');
	var width = document.getElementById('box-3d').clientWidth;
	var height = document.getElementById('box-3d').clientHeight;
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(width, height);
	canvas.appendChild(renderer.domElement);
	//renderer.setClearColor(0xa0a0a0);
	renderer.setClearColor(0xf2f2f0);
	renderer.sortObjects = false;
	camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 10000);

	// Disable autoclear, we do this manually in our animation loop.
	//renderer.autoClear = false;
	// Double resolution (twice the size of the canvas)
	var sampleRatio = 2;
	// This render pass will render the big result.
	var renderModel = new THREE.RenderPass(scene, camera);
	// post-processing

	composer = new THREE.EffectComposer(renderer);
	composer.setSize(window.innerWidth * sampleRatio, window.innerHeight * sampleRatio);
	var renderPass = new THREE.RenderPass(scene, camera);
	var copyPass = new THREE.ShaderPass(THREE.CopyShader);
	composer.addPass(renderPass);

	var vh = 1.4,
		vl = 1.2;

	var colorCorrectionPass = new THREE.ShaderPass(THREE.ColorCorrectionShader);
	colorCorrectionPass.uniforms["powRGB"].value = new THREE.Vector3(vh, vh, vh);
	colorCorrectionPass.uniforms["mulRGB"].value = new THREE.Vector3(vl, vl, vl);
	composer.addPass(colorCorrectionPass);

	var vignettePass = new THREE.ShaderPass(THREE.VignetteShader);
	vignettePass.uniforms["darkness"].value = 1.0;
	composer.addPass(vignettePass);
	composer.addPass(renderModel);
	composer.addPass(copyPass);
	copyPass.renderToScreen = true;


	loader = new THREE.SEA3D({
		autoPlay: true, // Auto play animations
		container: scene // Container to add models
	});

	loader.onComplete = function(e) {
		var childrens = loader.meshes;
		//console.log(childrens);
		//var Texture = new THREE.TextureLoader().load('/lou.jpg');
		var material1 = new THREE.MeshPhongMaterial({
			color: 0xffffff,
			emissive: 0x000000,
			specular: 0xffffff,
			shininess: 50,
			shading: THREE.FlatShading
		});
		var material2 = new THREE.MeshPhongMaterial({
			color: 0x000000,
			emissive: 0x000000,
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
		//color: 0xff0000, ambient: 0xffffff, specular: 0xcccccc, shininess:50, metal:true,
		for(var i = 0; i < childrens.length; i++) {
			var name = childrens[i].name;
			if(name.indexOf("Wu") >= 0) {
				jiBenMoXins.push(childrens[i]);
				childrens[i].material = material1;
				//childrens[i].visible=false;
				var ghj = "";
			} else if(name.indexOf("Star") >= 0) {
				startMoXins.push(childrens[i])
				childrens[i].material = material3;
			} else if(name.indexOf("Db") >= 0) {
				//childrens[i].visible=false;
			} else if(name.indexOf("Ru") >= 0) {
				ruKouMoXins.push(childrens[i]);
				childrens[i].material = material3;
			} else if(name.indexOf("Lu") >= 0) {
				xunLuMoXins.push(childrens[i]);
				childrens[i].material = material4;
			} else {
				childrens[i].material = material2;
				childrens[i].visible = false;
			}
		}
		//遍历基本模型。
		$.each(jiBenMoXins, function(i) {
			jiBenMoXins[i].scale.y = 4;
		});
		camera = new THREE.PerspectiveCamera(55, canvas.clientWidth / canvas.clientHeight, 0.1, 10000);
		var cam = loader.getCamera("Camera001");
		camera.position.copy(cam.position);
		camera.rotation.copy(cam.rotation);
		controls = new THREE.OrbitControls(camera ,canvas);
		
		controls.enableZoom = true;
		controls.enableDamping = false;
		controls.enableKeys = true;
		$('.nav .active').click();
		animate();

	};

	loader.load('js/modules/798001.tjs.sea');
//	loader.load('js/modules/ccc.tjs.sea');
//	loader.load('js/modules/01.sea');
//	loader.load('js/modules/02.sea');

	function onWindowResize() {

		//camera.aspect = window.innerWidth/window.innerHeight;
		var canvas = document.getElementById('box-3d');
		containerWidth = canvas.clientWidth;
		containerHeight = canvas.clientHeight;
		composer.setSize(containerWidth, containerHeight);
		renderer.setSize(containerWidth, containerHeight);
		camera.aspect = containerWidth / containerHeight;
		camera.updateProjectionMatrix();
	}
	//
	//  //
	//
	var clock = new THREE.Clock();
	//
	function animate() {

		var delta = clock.getDelta();

		requestAnimationFrame(animate);

		// Update SEA3D Animations
		THREE.SEA3D.AnimationHandler.update(delta);
		//console.log(camera);
//		if(camera.position.y < 100)
//			camera.position.set(camera.position.x, 100, camera.position.z);
		//render.clear();
		render(delta);

		//stats.update();

	}
	//
	function render(dlt) {
		//renderer.render( scene, camera );
		var can = document.getElementsByTagName('canvas')[0]
		//监听canvas的鼠标按下事件，旋转视角
		can.addEventListener('mousedown', onDocumentMouseDown, false);
		can.addEventListener('mousemove', onDocumentMouseMove, false);
		can.addEventListener('mouseup', onDocumentMouseUp, false);
		window.addEventListener('resize', onWindowResize, false);
		composer.render(dlt);

	}
	function onDocumentMouseMove(event) {}

	function onDocumentMouseDown(event) {}
	function onDocumentMouseUp(event) {
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
		var collisionResults = ray.intersectObjects(jiBenMoXins, true);
		if(collisionResults.length > 0) {
			//把选中的对象放到全局变量SELECTED中
			SELECTED = collisionResults[0].object;
			console.log(collisionResults[0].object);
			
		}
	}
	
})