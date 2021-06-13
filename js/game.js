import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

 
var scene, camera, renderer, cube, controls, draughts, board;
 
function init() {
  draughts = new Draughts();
 
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x6699ff);
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const light = new THREE.PointLight( 0xffffff, 2, 200 );
  light.position.set(5, 10, 5);
  scene.add(light);
  
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
 
  const square = new THREE.BoxGeometry(1, 0.1, 1);
  const lightsquare = new THREE.MeshBasicMaterial( { color: 0x993300 } );
  const darksquare = new THREE.MeshBasicMaterial( { color: 0xffffcc });
 
  board = new THREE.Group();
 
  let squareNumber = 1;
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let cube;
      if (z % 2 == 0) {
        cube = new THREE.Mesh(square, x % 2 == 0 ? lightsquare : darksquare);
        if (x % 2 != 0) {
          cube.userData.squareNumber = squareNumber;
          squareNumber++;
        }
      } else {
        cube = new THREE.Mesh(square, x % 2 == 0 ? darksquare : lightsquare);
        if (x % 2 == 0) {
          cube.userData.squareNumber = squareNumber;
          squareNumber++;
        }
      }
 
      cube.position.set(x, 0, z);
      board.add(cube);
    }
  }
 
  scene.add(board);
 


    camera.position.y = 15;
	
	const radius =  0.2;  
	const tubeRadius =  0.2;  
	const radialSegments =  8;  
	const tubularSegments =  24;  
	const geometry_checkers = new THREE.TorusGeometry(radius, tubeRadius,radialSegments, tubularSegments);
	
 
	const material_checkers = new THREE.MeshBasicMaterial();
	material_checkers.color.set(0x9d9b9b);
	
	const material_checkers_black = new THREE.MeshBasicMaterial();
	material_checkers_black.color.set(0x00000);
  
  
	
	for (let x = 0; x < 4; x+=1){
		for (let z=0; z < 10; z+=1){
			if ((x % 2 == 0 && z % 2 != 0) || (x % 2 != 0 && z % 2 == 0)){
				  const checkers = new THREE.Mesh(geometry_checkers, material_checkers);
				  checkers.position.set(x, 0.2, z);
				  checkers.rotation.x = 90 * (Math.PI / 180);
				  scene.add(checkers);
				
			}
		}
		
	}
	
	
	for (let x = 6; x < 10; x+=1){
		for (let z=0; z < 10; z+=1){
			if ((x % 2 == 0 && z % 2 != 0) || (x % 2 != 0 && z % 2 == 0)){
				  const checkers = new THREE.Mesh(geometry_checkers, material_checkers_black);
				  checkers.position.set(x, 0.2, z);
				  checkers.rotation.x = 90 * (Math.PI / 180);
				  scene.add(checkers);
				
			}
		}
		
	}
	
 
  controls = new OrbitControls(camera, renderer.domElement);
 
  controls.target.set(4.5, 0, 4.5);
 
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI / 2;
 
  controls.enableDamping = true;
 
  window.requestAnimationFrame(animate);
}
 
function animate() {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
}
 
function onWindowResize() {
 
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
 
  renderer.setSize( window.innerWidth, window.innerHeight );
 
}
 
 
window.addEventListener('resize', onWindowResize);
 
window.onload = init;