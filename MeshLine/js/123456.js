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
	function spOpacity(name) {
		var sprite = scene.getObjectByName(name)
		var tween = createjs.Tween.get(sprite.material)
			.to({
				opacity: 0.2
			}, 200)
			.to({
				opacity: 0.4
			}, 200)
			.to({
				opacity: 0.6
			}, 200)
			.to({
				opacity: 0.8
			}, 200)
			.to({
				opacity: 1
			}, 200)
	}

	//路线
	var line = ''

	function wayRoad(lineArr) {
		var geometry = new THREE.Geometry();
		line = new THREE.Line();
		for(var i = 0; i < lineArr.length; i++) {
			var obj = scene.getObjectByName(lineArr[i])
			obj.geometry.computeBoundingSphere();
			obj.material.materials[0].color.setRGB(255, 0, 255)
			geometry.vertices.push(obj.position);
		}

		line = new THREE.Line(geometry, materialTemp)
		//		console.log(line)
		scene.add(line)
	}

	//更改颜色函数
	var num = {
		r: 255,
		g: 0,
		b: 0
	}
	//设置精灵
	function createSprite(imageFile, name) {
		//导入精灵图片
		var texture = new THREE.TextureLoader().load(imageFile);
		var mat = new THREE.SpriteMaterial();
		mat.map = texture; //材质的Map属性用于添加纹理
		mat.needsUpdate = true;
		var sprite = new THREE.Sprite(mat);
		sprite.name = name;
		return sprite;
	}
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
	//移除贴图
	function removeSprite(objName) {
		scene.getObjectByName('sp' + objName)
		scene.remove(scene.getObjectByName('sp' + objName))
	}
	//移除文本
	function removeText(objName) {
		scene.getObjectByName('text' + objName)
		scene.remove(scene.getObjectByName('text' + objName))
	}
	//移除球体
	function removeSphere(objName) {
		for(var i = 0; i < 15; i++) {
			scene.getObjectByName(objName + i)
			scene.remove(scene.getObjectByName(objName + i))
		}
	}
	//根据obj创建文字贴图
	function createText(text, text2, objName, color) {
		//先用画布将文字画出
		var canvas = document.createElement("canvas");
		canvas.width = 320;
		canvas.height = 256;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.font = "normal 30px 微软雅黑";
		ctx.lineWidth = 4;
		ctx.textAlign = 'left';
		ctx.fillText(text, 140, 120);
		ctx.font = "normal 22px 微软雅黑";
		ctx.textAlign = 'center';
		ctx.fillText(text2, 180, 150);
		ctx.closePath();

		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;

		//使用Sprite显示文字
		var material = new THREE.SpriteMaterial({
			map: texture
		});
		var textObj = new THREE.Sprite(material);
		//文字缩放比例x,y,z
		textObj.name = 'text' + objName;
		var objName = scene.getObjectByName(objName)
		var setp = objName.position;
		//文字加入场景
		textObj.scale.set(22, 20, 22);
		textObj.position.set(setp.x, setp.y + 10.1, setp.z);
		scene.add(textObj)
	}

	//	更改高度
	function setHeight(name, height) {
		var obj = scene.getObjectByName(name)
		console.log(obj)
		//		obj.material[0].color.setRGB(num.r,num.g,num.b)
		obj.scale.y = height;
	}
	//设置颜色
	function setRgb(name, num) {
		var obj = scene.getObjectByName(name)
		console.log(obj)
		obj.material[0].color.setRGB(num.r,num.g,num.b)
		//赋予新材质改变颜色，有阴影等效果
//		obj.material = new THREE.MeshPhongMaterial({
//			color: 0xff00ff
//		});
	}
	//创建文字贴图
	function createSpriteText(text, text2, name, color) {
		//先用画布将文字画出
		var canvas = document.createElement("canvas");
		canvas.width = 256;
		canvas.height = 256;
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = color;
		ctx.font = "normal 30px 微软雅黑";
		ctx.lineWidth = 4;
		ctx.fillText(text, 90, 100);

		ctx.font = "normal 20px 微软雅黑";
		ctx.fillText(text2, 125, 130);

		var texture = new THREE.Texture(canvas);
		texture.needsUpdate = true;

		//使用Sprite显示文字
		var material = new THREE.SpriteMaterial({
			map: texture
		});
		var textObj = new THREE.Sprite(material);
		//文字缩放比例x,y,z
		textObj.scale.set(10, 5, 10);
		textObj.position.set(0, 0, 98);
		textObj.name = name;
		return textObj;
	}
	var bbox;

	function focus() {
		bbox = new THREE.Box3().setFromObject(container3d);
		var cx = bbox.min.x + (bbox.max.x - bbox.min.x) * .5;
		var cy = bbox.min.y + (bbox.max.y - bbox.min.y) * .5;
		var cz = bbox.min.z + (bbox.max.z - bbox.min.z) * .5;
		var sub = new THREE.Vector3().subVectors(bbox.max, bbox.min)
		var dist = Math.max(sub.x, sub.y, sub.z);
		var radius = dist * Math.sqrt(.5);
		camera.near = dist / 1000;
		camera.far = dist * 200;
		camera.updateProjectionMatrix();
		//调整摄像机的位置
		camera.position.set(1.2216374967811707, 100.60354859064611, 168.1973998977555);
		container3d.position.set(-cx, -cy, -cz);
		controls.update();
	}
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
		//camera.position.set( 300, 300,300 );
		renderer = new THREE.WebGLRenderer({
			antialias: true
		});
		renderer.setPixelRatio(box3d.devicePixelRatio);
		renderer.setSize(box3d.clientWidth, box3d.clientHeight);
		//renderer.setClearColor( 0x4F145F, 1 );
		renderer.setClearColor(0xeeeeee, 1);
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
		var intersects = ray.intersectObjects(scene.children, true);
		if(intersects.length > 0) {
			console.log(intersects)
			console.log(intersects[0].object) //捕获鼠标点击的模型
			
			
// 			var projector = new THREE.Projector();  
//			var vector = new THREE.Vector3();  
////			vector = projector.projectVector(vector.setFromMatrixPosition(intersects[0].object.matrixWorld), camera); 
//			vector = vector.setFromMatrixPosition(intersects[0].object.matrixWorld).project(camera)
//			  
//			var halfWidth = window.innerWidth / 2;  
//			var halfHeight = 580;  
//			console.log(vector.x * halfWidth + halfWidth)
//			var result = {  
//			    x: Math.round(vector.x * halfWidth + halfWidth),  
//			    y: Math.round(-vector.y * halfHeight + halfHeight)
//			};  
//			console.log(result)
//			$('#min-detail').css({
//				left: result.x - 60,
//				top: result.y - 160
//			})
			
			//小详情弹窗
			if(intersects[0].object.name.indexOf("box") >= 0) {
				getMinDetail(intersects[0].object.name)
			}

			if(intersects[0].object.name == 'box437') {
				removeSprite('box437')
				removeText('box437')
				setRgb('box437', {
					r: 255,
					g: 1,
					b: 1
				})
				setSp('box437', 24, 12, "img/draw.png")
				createText('艺术中心', 'welcome', 'box437', {
					r: 255,
					g: 1,
					b: 1
				})
				spOpacity('spbox437')
				spOpacity('textbox437')
			} else {
				removeSprite('box437')
				removeText('box437')
				setRgb('box437', {
					r: 1,
					g: 1,
					b: 1
				})
			}
			if(intersects[0].object.type == 'Sprite' && intersects[0].object.name != undefined && intersects[0].object.name != '') {
				if(INTERSECTED != intersects[0].object) {
					INTERSECTED = intersects[0].object
					INTERSECTED.visible = false;

					$('#draw-detail').slideDown()
					//判断line
					if(line) {
						//line有值则移除
						scene.remove(line)
					}
					//移除路线贴图
				}
			}
		} else {
			INTERSECTED = null;
		}
		renderer.render(scene, camera);
	}

	//监听点击事件函数
	function onDocumentMouseDown(event) {
		event.preventDefault();
		console.log(event)
		$('#min-detail').hide()
		if(tanBox) {
			setHeight(tanBox, 0.000199)
		}
		$('#min-detail').css({
			left: event.pageX - 60,
			top: event.pageY - 160
		})
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
		console.log(event.pageX)
		//鼠标按下可以旋转
		//      controls.enableRotate = true;
		//      render()
	}

	function onDocumentMouseUp(event) {
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
		renderer.setSize(box3d.clientWidth, box3d.clientHeight);
	}