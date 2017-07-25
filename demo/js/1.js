$(function () {
    $("#weather_top").click(function () {
        $("#weather_center").toggle();
    });
    $("#weather_center").click(function () {
        $("#weather_footer").toggle();
    });
    $("#right_menu_flag").click(function () {
        $("#guide_menu").toggle();
    });
    $("#serviceList>li").click(function () {
        $(this).addClass("curSelect").siblings().removeClass("curSelect");
    });
})
$(function () {
    var container, stats;
    var camera, scene, renderer, controls;
    var raycaster, mouse, container3d;
    var clock;
    var timeScale = 1;
    init();
    function update() {
        var delta = clock.getDelta() * timeScale;
        requestAnimationFrame(update);
        renderer.render(scene, camera);
        controls.update();
    }

    function init() {
        /*场景*/
        scene = new THREE.Scene();
        container = document.createElement('div');
        document.body.appendChild(container);
        /*相机*/
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.x = -50;
        camera.position.y = 150;
        camera.position.z = 200;
        controls = new THREE.OrbitControls(camera);
        /*环境光*/
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        /*定向光*/
        var directionalLight = new THREE.DirectionalLight(0xffeedd);
        directionalLight.position.set(0, 0, 1).normalize();
        scene.add(directionalLight);
        var onError = function (xhr) {
        };
        var markFlag = true;

        /*导入obj文件模型*/
        var mtlLoader = new THREE.MTLLoader();
        mtlLoader.setPath('objModle/');
        mtlLoader.load('798dlds.mtl', function (materials) {
            materials.preload();
            var objLoader = new THREE.OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.setPath('objModle/');
            objLoader.load('798dlds.obj', function (object) {
                //console.log(object);
                scene.add(object);
                object.children[0].geometry.computeBoundingBox();
                object.children[0].geometry.center()
                var materialTemp = new THREE.LineBasicMaterial({
                    color: 0x00ffff,
                    linecap: 'round', //ignored by WebGLRenderer
                    linejoin: 'round' //ignored by WebGLRenderer
                });
                var geometry = new THREE.Geometry();
                for (var i = 0; i < object.children.length; i++) {
                    if (object.children[i].name.indexOf("Sphere") != -1) {
                        object.children[i].geometry.computeBoundingSphere();
                        //console.log(object.children[i].geometry);
                        object.children[i].material.color.setRGB(255, 0, 0);
                        object.children[i].visible = true;
                        var setp = object.children[i].geometry.boundingSphere.center;
                        //console.log(i + ":", setp.x, setp.y, setp.z);
                        geometry.vertices.push(object.children[i].geometry.boundingSphere.center);
                        console.log(setp);

                        if (markFlag) {
                            /*var spritey = makeTextSprite( i,
                             { fontsize: 10, borderColor: {r:255, g:0, b:0, a:1.0}, backgroundColor: {r:252, g:252, b:251, a:0.8} } );
                             spritey.position.set(setp.x,setp.y,setp.z);
                             scene.add( spritey );
                             markFlag=false;*/
                            /*导入精灵图片*/
                            var ballTexture = THREE.ImageUtils.loadTexture('img/2.png');
                            var crateMaterial = new THREE.SpriteMaterial({
                                map: ballTexture,
                                useScreenCoordinates: false
                            });
                            var sprite2 = new THREE.Sprite(crateMaterial);
                            //console.log(setp.x,setp.y+10,setp.z);

                            sprite2.scale.set(15, 23); // imageWidth, imageHeight
                            sprite2.position.set(setp.x, setp.y + 10, setp.z);
                            scene.add(sprite2);
                            markFlag = false;
                            var tween = createjs.Tween.get(sprite2.position)
                                .to({x: 52.919898986816406, y: 12.934100031852722, z: -78.66939926147461}, 5000)
                                .to({x: 52.202951431274414, y: 12.934100031852722, z: -44.81830024719238}, 5000)
                                .to({x: 39.74650001525879, y: 12.934100031852722, z: -44.07609939575195}, 2000)
                                .to({x: 35.96610069274902, y: 12.934100031852722, z: -3.103700041770935}, 5000)
                                .to({x: -47.70665168762207, y: 12.934100031852722, z: -1.6300000250339508}, 5000)
                                .to({x: -49.70979881286621, y: 12.934100031852722, z: 30.858500480651855}, 5000)
                                .to({x: -68.47019958496094, y: 12.934100031852722, z: 34.66460037231445}, 5000)
                                .to({x: -82.04104995727539, y: 12.934100031852722, z: 2.759750008583069}, 5000)
                                .to({x: -106.0634994506836, y: 12.934100031852722, z: -0.2046000063419342}, 5000)
                            //console.log(sprite2);
                        }
                    }
                }
                var line = new THREE.Line(geometry, materialTemp);
                scene.add(line);
            }, onProgress, onError);
        });


        //camera.position.set( 300, 300,300 );
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xF7F7F7, 1);
        //renderer.setClearColor( 0x4F145F, 1 );
        renderer.shadowMap.enabled = true;
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.toneMappingExposure = 3;
        renderer.toneMappingWhitePoint = 5;
        renderer.toneMapping = THREE.Uncharted2ToneMapping;

        container.appendChild(renderer.domElement);
        clock = new THREE.Clock();

        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                // console.log( Math.round(percentComplete, 2) + '% downloaded' );
            }
        };
        update();

    }

    var flag = true;
    var clock = new THREE.Clock();

    function makeTextSprite(message, parameters) {
        if (parameters === undefined) parameters = {};

        var fontface = parameters.hasOwnProperty("fontface") ?
            parameters["fontface"] : "Arial";

        var fontsize = parameters.hasOwnProperty("fontsize") ?
            parameters["fontsize"] : 18;

        var borderThickness = parameters.hasOwnProperty("borderThickness") ?
            parameters["borderThickness"] : 1;

        var borderColor = parameters.hasOwnProperty("borderColor") ?
            parameters["borderColor"] : {r: 0, g: 0, b: 0, a: 1.0};

        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?
            parameters["backgroundColor"] : {r: 255, g: 255, b: 255, a: 1.0};

        /*var spriteAlignment = THREE.SpriteAlignment.topLeft;*/

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;

        // get size data (height depends only on font size)
        var metrics = context.measureText(message);
        var textWidth = metrics.width;

        // background color
        context.fillStyle = "rgba(" + backgroundColor.r + "," + backgroundColor.g + ","
            + backgroundColor.b + "," + backgroundColor.a + ")";
        // border color
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + ","
            + borderColor.b + "," + borderColor.a + ")";

        context.lineWidth = borderThickness;
        roundRect(context, borderThickness / 2, borderThickness / 2, textWidth + borderThickness, fontsize * 1.4 + borderThickness, 6);
        // 1.4 is extra height factor for text below baseline: g,j,p,q.

        // text color
        context.fillStyle = "rgba(0, 0, 0, 1.0)";

        context.fillText(message, borderThickness, fontsize + borderThickness);

        // canvas contents will be used for a texture
        var texture = new THREE.Texture(canvas)
        texture.needsUpdate = true;

        var spriteMaterial = new THREE.SpriteMaterial(
            {map: texture, useScreenCoordinates: false});
        var sprite = new THREE.Sprite(spriteMaterial);
        /* sprite.scale.set(5,5,1.0);*/
        sprite.scale.set(100, 50, 1.0);
        return sprite;
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.lineTo(x + w - r, y);
        ctx.quadraticCurveTo(x + w, y, x + w, y + r);
        ctx.lineTo(x + w, y + h - r);
        ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
        ctx.lineTo(x + r, y + h);
        ctx.quadraticCurveTo(x, y + h, x, y + h - r);
        ctx.lineTo(x, y + r);
        ctx.quadraticCurveTo(x, y, x + r, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }


});