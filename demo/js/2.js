var container, stats;
var camera, scene, renderer,controls;
var INTERSECTED;
var raycaster;/*射线*/
var mouse;
var intersects = [];
var mouseX = 0,
    mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    width = document.getElementById('webgl').clientWidth;
    height = document.getElementById('webgl').clientHeight;
    /*渲染器*/
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setClearColor( 0x333333, 1 );
    /*相机*/
    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.x = -150;
    camera.position.y = 100;
    camera.position.z = 200;
    /*鼠标控制动*/
    controls = new THREE.OrbitControls( camera );
    // 场景
    scene = new THREE.Scene();
    /*灯光AmbientLight环境光*/
    var ambient = new THREE.AmbientLight(0x444444);
    /*灯光追加到场景中*/
    scene.add(ambient);
    /*directionalLight定向光*/
    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 0, 1 ).normalize();
    scene.add(directionalLight);
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.getElementById('webgl').appendChild( stats.domElement );
    clock = new THREE.Clock();
    // model
    var onProgress = function(xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            //console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function(xhr) {};

    var mtlLoader = new THREE.MTLLoader();
    mtlLoader.setPath( 'objModle/' );
    mtlLoader.load('798dlds.mtl', function(materials) {
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath( 'objModle/' );
        objLoader.load('798dlds.obj', function(object) {
            //console.log(object);
            scene.add( object );
            //create a blue LineBasicMaterial
            var materialTemp = new THREE.LineBasicMaterial({
                color: 0x00ffff,
                linecap: 'round', //ignored by WebGLRenderer
                linejoin:  'round' //ignored by WebGLRenderer
            });
            var geometry = new THREE.Geometry();
            for(var i = 0 ; i < object.children.length ; i++){
                if(object.children[i].name.indexOf("Sphere") != -1){
                    /*计算边界几何球体，更新.boundingSphere属性。
                     默认情况下不计算边界球。他们需要明确的计算，否则他们是零。*/
                    object.children[i].geometry.computeBoundingSphere();
                    /*控制点的颜色变化*/
                    object.children[i].material.color.setRGB(255,0,0);
                    /*控制点的显示隐藏*/
                    object.children[i].visible = true;
                    //console.log(object.children[i].name  + "x y z " + " " + object.children[i].geometry.boundingSphere.center.x + object.children[i].geometry.boundingSphere.center.y + object.children[i].geometry.boundingSphere.center.z)
                    geometry.vertices.push(object.children[i].geometry.boundingSphere.center);


                }
                /*Mark*/
                /*  if(object.children[i].name.indexOf("Object") != -1){
                 /!*坐标*!/
                 var setP=object.children[i].geometry.center ();
                 console.log(setP);
                 /!*精灵*!/
                 var spritey = makeTextSprite( i,
                 { fontsize: 10, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:255, g:100, b:100, a:0.8} } );
                 spritey.position.set(setP.x,setP.y,setP.z);
                 scene.add( spritey );
                 }*/
            }
            var line = new THREE.Line(geometry, materialTemp);
            scene.add(line);
        }, onProgress, onError);
        controls.update();

    });

    raycaster = new THREE.Raycaster();/*1.新建一个Raycasting对象*/
    mouse = new THREE.Vector2();/*2.新建一个Vector2对象保存鼠标位置信息*/
    document.getElementById('webgl').appendChild(renderer.domElement);
    document.addEventListener('click', onDocumentClick, false);
    /*window.addEventListener('resize', onWindowResize, false);*//*,监听鼠标点击事件*/
    render()

}

function makeTextSprite( message, parameters )
{
    if ( parameters === undefined ) parameters = {};

    var fontface = parameters.hasOwnProperty("fontface") ?
        parameters["fontface"] : "Arial";

    var fontsize = parameters.hasOwnProperty("fontsize") ?
        parameters["fontsize"] : 18;

    var borderThickness = parameters.hasOwnProperty("borderThickness") ?
        parameters["borderThickness"] : 4;

    var borderColor = parameters.hasOwnProperty("borderColor") ?
        parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };

    var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
        parameters["backgroundColor"] : { r:255, g:255, b:255, a:1.0 };

    /*var spriteAlignment = THREE.SpriteAlignment.topLeft;*/

    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    context.font = "Bold " + fontsize + "px " + fontface;

    // get size data (height depends only on font size)
    var metrics = context.measureText( message );
    var textWidth = metrics.width;

    // background color
    context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
        + backgroundColor.b + "," + backgroundColor.a + ")";
    // border color
    context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
        + borderColor.b + "," + borderColor.a + ")";

    context.lineWidth = borderThickness;
    roundRect(context, borderThickness/2, borderThickness/2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
    // 1.4 is extra height factor for text below baseline: g,j,p,q.

    // text color
    context.fillStyle = "rgba(0, 0, 0, 1.0)";

    context.fillText( message, borderThickness, fontsize + borderThickness);

    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas)
    texture.needsUpdate = true;

    var spriteMaterial = new THREE.SpriteMaterial(
        { map: texture, useScreenCoordinates: false} );
    var sprite = new THREE.Sprite( spriteMaterial );
    sprite.scale.set(100,50,1.0);
    return sprite;
}
function roundRect(ctx, x, y, w, h, r)
{
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y);
    ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r);
    ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h);
    ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r);
    ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function onDocumentClick(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    controls.update();

}
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    raycaster.setFromCamera(mouse, camera);
    camera.lookAt(scene.position);
    //3.定义射线拾取的物体(光线穿透物体)
    var intersects = raycaster.intersectObjects(scene.children);/*获取投射射线和此网格之间的交叉点。 Raycaster.intersectObject将调用此方法。*/
    /*/拾取物体数大于0时 */
    if (intersects.length > 0) {
        //获取第一个物体
        if (INTERSECTED != intersects[0].object) {
            if (INTERSECTED) INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
             INTERSECTED = intersects[0].object;
             INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
            //改变物体的颜色(红色)
            INTERSECTED.material.color.set( 0xff0000 );
        }
    } else {
        if (INTERSECTED) INTERSECTED.material.color.set(INTERSECTED.currentHex);
        INTERSECTED = null;
    }


    controls.update();

}
