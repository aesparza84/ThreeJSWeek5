import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);



//Light--------------------//
const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);


const directionalLight = new THREE.DirectionalLight(0x334455, 26);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

const lightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(lightCameraHelper);
directionalLight.shadow.camera.top = 40;
directionalLight.shadow.camera.right = 40;
directionalLight.shadow.camera.left = -40;
directionalLight.shadow.camera.bottom = -40;

directionalLight.position.set(-20,10,0);
directionalLight.castShadow = true;

//camera.position.set(1,2,4);
camera.position.set(-10,30,30);
orbit.update();

//Shapes--------------------------------//
    //Box---------------------------//
const boxGeo = new THREE.BoxGeometry();
const boxMat = new THREE.MeshBasicMaterial({color: 0x44FF11, side: THREE.DoubleSide});
const box = new THREE.Mesh(boxGeo, boxMat);
scene.add(box);

    //Plane-------------//
const planeGeo = new THREE.PlaneGeometry(30,30);
const planeMat = new THREE.MeshStandardMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeo, planeMat);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -.5  * Math.PI;

    //Sphere-------------------------//
const sphereGeo = new THREE.SphereGeometry(4, 36, 36);
const sphereMat = new THREE.MeshStandardMaterial({color: 0xFF4400, wireframe: false});
const sphere = new THREE.Mesh(sphereGeo, sphereMat);
sphere.castShadow = true;
scene.add(sphere);
sphere.position.set(-10,10,10);


const coneGeo = new THREE.ConeGeometry(3,5,25);
const coneMat = new THREE.MeshStandardMaterial({color: 0x22FF88, side: THREE.DoubleSide});
const cone = new THREE.Mesh(coneGeo, coneMat);
cone.castShadow = true;
scene.add(cone);
cone.position.set(5,5,-5);

const torusGeo = new THREE.TorusGeometry(2, 1, 14, 24);
const torusMat = new THREE.MeshStandardMaterial({color: 0xFF0000, side: THREE.DoubleSide});
const torus = new THREE.Mesh(torusGeo, torusMat);
torus.castShadow = true;
scene.add(torus);
torus.position.set(1,5,0);
torus.rotateY(4.8);


const gui = new dat.GUI();
const guiOptions = {
    SphereColor: '#00FF00',
    wireFrame: true,
    Speed: .02,
    angle: .02,

    BigConeColor: '#00FF00',
    wireFrame: true,
    Conespeed: .02,
    Coneangle: .02,

    TorusColor: '#00FF00',
    wireFrame: true,
    TorusScale: 1,
    TorusSpeed: 1000
    
};
gui.addColor(guiOptions, 'SphereColor').onChange(function(e) {sphere.material.color.set(e);});
gui.add(guiOptions, 'wireFrame').onChange(function(e) {sphere.material.wireframe = e;});
gui.add(guiOptions, 'angle', 0,1);
gui.add(guiOptions, 'Speed', 0,1);


gui.addColor(guiOptions, 'BigConeColor').onChange(function(e) {cone.material.color.set(e);});
gui.add(guiOptions, 'wireFrame').onChange(function(e) {cone.material.wireframe = e;});
gui.add(guiOptions, 'Coneangle', -1,1);
gui.add(guiOptions, 'Conespeed', 0,1);


gui.addColor(guiOptions, 'TorusColor').onChange(function(e) {torus.material.color.set(e);});
gui.add(guiOptions, 'wireFrame').onChange(function(e) {torus.material.wireframe = e;});
gui.add(guiOptions, 'TorusScale', 1, 5);
gui.add(guiOptions, 'TorusSpeed', 10,1000);


var speed = .01;

var coneSpeed =1;
var coneAngle =1.5;

var torSpeed =1000;
var torScale = 1;
 
function animate(time) {
    //box.rotation.x = time/1000;
    //box.rotation.y = time/1000;

    speed += guiOptions.Speed;
    sphere.position.y = 10 * Math.abs(Math.sin(speed));

    coneSpeed += guiOptions.Conespeed;
    coneAngle += guiOptions.Coneangle;
    cone.position.x = (coneAngle *0.1) * (Math.sin(coneSpeed));
    cone.position.y = (coneAngle *0.1) * (Math.cos(coneSpeed));

    torSpeed = guiOptions.TorusSpeed;
    torus.rotation.y = time/torSpeed;
    torus.rotation.x = time/200;
    
    torScale = guiOptions.TorusScale;
    torus.scale.set(torScale, torScale, 3);

    renderer.render(scene, camera);
}

//renderer.render(scene, camera);
renderer.setAnimationLoop(animate);