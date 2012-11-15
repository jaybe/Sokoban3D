	var three;
	var renderer;
	
	var moving = 0; // indicats moving in progress and blocks other moves
	var rotate = 0; // same to rotation
	var loading = 0;
	var cameratop;
	var camera;
	var player;
	var levelcount = 1;
	var you;
	var steps;
	var folder = "Original";
	folder = "Original";
	var kiste;
	var ground;
	var wallMaterial;		
	var sky;	
	var material;
	var wire;
	kiste = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("images/crate.jpg")
	});
	ground = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("images/ground.jpg")
	});
	wallMaterial = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("images/wall.jpg")
	});		
	sky = new THREE.MeshLambertMaterial({
		map: THREE.ImageUtils.loadTexture("images/Skybox.jpg")
	});	
	material = new THREE.MeshLambertMaterial({
			color: 0x0000ff
		});
	wire = new THREE.MeshBasicMaterial({
		color : 0x00ff00,
		wireframeLinewidth: 4,
		wireframe: true
	});		
	var textureImg = new Image();
        textureImg.src = "images/crate.jpg";
		var textureImg2 = new Image();
		textureImg2.src = "images/ground.jpg";
		var textureImg3 = new Image();
		textureImg3.src = "images/wall.jpg";
		var textureImg4 = new Image();
		textureImg4.src = "images/Skybox.jpg";
	var level;


//jQuery.parseJSON( json )
    window.requestAnimFrame = (function(callback){
        return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
    })();


 
    window.onload = function() {
	    renderer = new THREE.WebGLRenderer(); 
        renderer.setSize(window.innerWidth-20, window.innerHeight-20);
        document.body.appendChild(renderer.domElement);

		cameratop = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1, 3000);
		cameratop.position.y = 2500;
		cameratop.position.z = 100;
		cameratop.position.x = 100;
		cameratop.rotation.x = -Math.PI/2;
		
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1, 1000);
		camera.position.y = 50;
		camera.rotation.y = - Math.PI / 2;
		camera.position.z = 100;
		camera.position.x = 100;

		loadLevel(1);
	}
	
	function loadLevel(l) {
		if( l ==undefined ) {
		 l = levelcount;
		}
		loading = 1;
		$.getJSON( "levels/" + folder + '/' + l + '.json', function(data) {
			level = data;
			levelcount = l;
			newscene();
			steps = 0;
			updateInfo();
		});
	}
	function updateInfo() {
		$('#info').html( "Level: " + levelcount + " Steps: " + steps); 
	}
	function newscene(){
        // scene
        var scene = new THREE.Scene();
 
		var top = new THREE.Mesh(new THREE.CubeGeometry(3000, 10, 3000), sky);
        top.overdraw = true;
		top.position.z = 500;
		top.position.x = 500;
		top.position.y = 100;
   //     scene.add(top);
		camera.rotation.y = - Math.PI / 2;
	    var test = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), kiste);
		test.position.z = 1;
		test.position.x = 1;
		test.rotation.y =  Math.PI / 2;
		
		test.overdraw = true;
        scene.add(test);

		
		you = new THREE.Mesh(new THREE.CylinderGeometry(0, 25, 50, 50, 50, false), material);
		you.overdraw = true;
		you.rotation.x = Math.PI/2;
		you.position.z = 100;
		you.position.x = 100;
		you.rotation.z = - Math.PI / 2;
		scene.add(you);
		
		var boxes = new Array;
		var goles = new Array;
		
		var midx = Math.round(level.length/2);
		var midz = Math.round(level[midx].length/2);
		cameratop.position.z = midz*100;
		cameratop.position.x = midx*100;
		
		for( x = 0 ; x < level.length; x++) {
			for( y = 0 ; y < level[x].length; y++) {
				level[x][y] = parseInt(level[x][y]);
				if(level[x][y] == 1 ) {

					var wall = new THREE.Mesh(new THREE.CubeGeometry(100, 110, 100), wallMaterial);
					wall.overdraw = true;
					wall.position.z = y*100;
					wall.position.x = x*100;
					wall.position.y = 50;
					scene.add(wall)
				}
				if(level[x][y] == 2 ) {
					
					var box = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), kiste);
					box.overdraw = true;
					box.position.z = y*100;
					box.position.x = x*100;
					box.position.y = 25;
					scene.add(box);
					boxes.push(box);
				}
				if(level[x][y] == 3 ) {
					 
					var box = new THREE.Mesh(new THREE.CubeGeometry(55, 2, 55), wire);
					box.overdraw = true;
					box.position.z = y*100;
					box.position.x = x*100;
					box.position.y = 2;
					scene.add(box);
					goles.push(box);
				}
				if(level[x][y] == 4 ) {
					test.position.z = y;
					test.position.x = x;
					level[x][y]  = 0;
					camera.position.z = y*100;
					camera.position.x = x*100;
					you.position.z = y*100;
					you.position.x = x*100;
				}
				if(level[x][y] == 5 ) {
					
					var box = new THREE.Mesh(new THREE.CubeGeometry(50, 50, 50), kiste);
					box.overdraw = true;
					box.position.z = y*100;
					box.position.x = x*100;
					box.position.y = 25;
					scene.add(box);
					boxes.push(box);
					
					var box2 = new THREE.Mesh(new THREE.CubeGeometry(55, 2, 55), wire);
					box2.overdraw = true;
					box2.position.z = y*100;
					box2.position.x = x*100;
					scene.add(box2);
					goles.push(box2);
				}
 				if(level[x][y] !=6 && level[x][y] != 1 ) {
					var flor = new THREE.Mesh(new THREE.CubeGeometry(100, 10, 100), ground);
					flor.overdraw = false;
					flor.position.z = y*100;
					flor.position.x = x*100;
					flor.position.y = -5;
					scene.add(flor);
				}
				if(level[x][y] == 7 ) {
					
					var box = new THREE.Mesh(new THREE.CubeGeometry(55, 2, 55), wire);
					box.overdraw = true;
					box.position.z = y*100;
					box.position.x = x*100;
					box.position.y = 2;
					scene.add(box);
					goles.push(box);
					test.position.z = y;
					test.position.x = x;
					level[x][y]  = 3;
					camera.position.z = y*100;
					camera.position.x = x*100;
					you.position.z = y*100;
					you.position.x = x*100;
				}
			}
		}


 
        // add subtle ambient lighting
        var ambientLight = new THREE.AmbientLight(0x555555);
        scene.add(ambientLight);
 
        // add directional light source
        var directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(1, 1, 1).normalize();
        scene.add(directionalLight);
 
        // create wrapper object that contains three.js objects
        three = {
            renderer: renderer,
            camera: camera,
			cameratop: cameratop,
			rendercam: camera,
            scene: scene,
            test: test,
			boxes: boxes,
			you:you,
			goles: goles
        };
 

	   three.renderer.render(three.scene, three.camera);
		loading = 0;

}

function checkWin () {
		for( x = 0 ; x < level.length; x++) {
			for( y = 0 ; y < level[x].length; y++) {
				if(level[x][y] == 2 ) {
					return false;
				}
				if(level[x][y] == 3 ) {
					return false;
				}
			}
		}
		return true;
}	
	
window.onkeydown = keyp;
window.onkeyup = keypu;
	
function keypu (Ereignis) {	
	if( ! three || ! three.camera ) {
		return;
	}
	if( Ereignis.which == 77 ) { 
		three.rendercam = three.camera;
		///three.renderer.render(three.scene, three.camera);
		return;
	}	
}

function keyp (Ereignis) {
	if(loading || ! three || ! three.camera ) {
		return;
	}
	if( Ereignis.which == 77 ) {
		three.rendercam = three.cameratop;
		//three.renderer.render(three.scene, );
		//return;
	}
	if(! moving && ! rotate ) {
	//console.log(you.position);
	if( Ereignis.which == 37 ) { //left key
		three.test.rotation.y +=  Math.PI / 2;
		rotate_cam_animate( new Date().getTime(), three, -Math.PI / 2, Math.PI / 50 );
		you.rotation.z -=  Math.PI / 2;
	}
	if( Ereignis.which == 39 ) { //left right
		three.test.rotation.y -=  Math.PI / 2;
		//three.camera.rotation.y -=  Math.PI / 2;
		rotate_cam_animate( new Date().getTime(), three, Math.PI / 2, -Math.PI / 50 );
		you.rotation.z +=  Math.PI / 2;
	}
	if( Ereignis.which == 38 ) { //left front
		//three.camera.position.x +=  15;
		var x1 = Math.round(three.test.position.x);
		var z1 = Math.round(three.test.position.z);
		three.test.translateZ(1);
		three.renderer.render(three.scene, three.camera);
		var x = Math.abs(Math.round(three.test.position.x));
		var z = Math.abs(Math.round(three.test.position.z));
		var x2 = x - x1;
		var z2 = z - z1;
	   //console.log(x + "x " + z + "z " + x1 + "x1 " + z1 + "z1 " + x2 + "x2 " + z2 + "z2 " +level[x][z] + "l1 " + level[x+x2][z+z2] +"l2");
		steps++;
		if(level[x][z] == 1 ) {
			three.test.position.x = x1; 
			three.test.position.z = z1;
			steps--;
		} else if(level[x][z] == 0 || level[x][z] == 3 ) {
			move_cam_animate( new Date().getTime(), three, 100);
			//three.camera.translateZ(-100); //  +=  15;
		} else if((level[x][z] == 2 || level[x][z] == 5 ) && level[x+x2][z+z2] != 1 && level[x+x2][z+z2] != 2 && level[x+x2][z+z2] != 5 ) {
			var found = 0;
			//console.log("search box" +  x*100  + " " + z * 100);
			for(var i = 0; i < three.boxes.length; i++) {
				var b = three.boxes[i];
				//console.log("box "  + b.position.x + " " +  b.position.z);
				if(  b.position.x == x*100 &&  b.position.z == z * 100 && ! found ) {
					found = 1;
					level[x][z] = level[x][z] - 2;
					level[x+x2][z+z2] = level[x+x2][z+z2] + 2;
					b.position.x = (x+x2)*100;
					b.position.z = (z+z2)*100;
					//three.camera.translateZ(-100); //  +=  15;			
					move_cam_animate( new Date().getTime(), three, 100);
				}
			}
			if( ! found ) {
				three.test.position.x = x1; 
				three.test.position.z = z1;
			}

		} else {
			console.log( "stop " + x + "x " + z + "z " + x1 + "x1 " + z1 + "z1 " + x2 + "x2 " + z2 + "z2 " +level[x][z] + "l1 " + level[x+x2][z+z2] +"l2");
			three.test.position.x = x1; 
			three.test.position.z = z1;	
		}

	}
	}
	if( Ereignis.which == 66) {
		loadLevel(levelcount - 1);
	}
	if( Ereignis.which == 78) {
		loadLevel(levelcount + 1);
	}
	if( Ereignis.which == 82) {
		loadLevel(levelcount);
	}
	you.position = camera.position;
		updateInfo();
	three.renderer.render(three.scene, three.rendercam);
	if( checkWin() ) {

		loadLevel(levelcount + 1);
	}


	//---
/*	if( Ereignis.which == 90 ) { //90 = z
		three.camera.rotation.z -=  Math.PI / 2;
	}
	if( Ereignis.which == 89 ) { //89 = .getCoordinates().
		three.camera.rotation.y -=  Math.PI / 2;
	}
	if( Ereignis.which == 88 ) { //88 = x
		three.camera.rotation.x -=  Math.PI / 2;
	}	*/
	//console.log(Ereignis.which);
	//Ereignis.preventDefault();
}

    function  rotate_cam_animate(lastTime, three, distance, step){
        // update
		rotate = 1;
        var date = new Date();
        var time = date.getTime();
        var timeDiff = time - lastTime;
		if(timeDiff > 3 ) {
			distance = distance + step;
			three.camera.rotation.y += step;
			if( Math.abs(distance) < Math.abs(step) ) {
				three.camera.rotation.y += -distance
				distance = 0;
			}
			lastTime = time;

		}
		three.renderer.render(three.scene, three.rendercam);
		if(distance == 0 ) {
			rotate = 0;
			return;
		}
        
        // render

 
        // request new frame
        requestAnimFrame(function(){
            rotate_cam_animate(lastTime, three, distance, step);
        });
    }

    function move_cam_animate(lastTime, three, distance){
        // update
		moving = 1;
        var date = new Date();
        var time = date.getTime();
        var timeDiff = time - lastTime;
		if(timeDiff > 1 ) {
			if(distance < 10 ) {
				
				three.camera.translateZ(- distance);
				distance = 0 ;
			} else {
				distance = distance - 8;
				three.camera.translateZ(-8);
			}
			
			 //  +=  15;
			lastTime = time;
		}
		three.renderer.render(three.scene, three.rendercam);
		if(distance <= 0 ) {
			moving = 0;
			return;
		}
         
        // render
        
 
        // request new frame
        requestAnimFrame(function(){
            move_cam_animate(lastTime, three, distance);
        });
    }
	

