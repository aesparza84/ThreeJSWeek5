import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui';

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
renderer.shadowMap = true;
document.body.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0x334455);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x334455);
scene.add(directionalLight);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);
directionalLight.position(-20,10,0);
directionalLight.castShadow = true;

camera.position.set(-10,30,30);
orbit.update();


const boxGeo = new THREE.BoxGeometry();
const boxMat = new THREE.MeshBasicMaterial({color: 0x00FF00, side: THREE.DoubleSide});
const box = new THREE.Mesh(boxGeo, boxMat);

const planeGeo = new THREE.PlaneGeometry(30,30);
const planetMat = new THREE.MeshStandardMaterial();
const plane = new THREE.Mesh(planetGeo, planetMat);
plane.receiveShadow = true;
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;



const sphereGeo = new THREE.SphereGeometry(4, 36, 36);
const sphereMat = new THREE.MeshStandardMaterial({color: 0x00FF00, wireframe: true});
const sphere = new THREE.Mesh(boxGeo, boxMat);
sphere.position.set(-10,10,0);


const gui = new dat.GUI();
const guiOptions = {
    SphereColor: '#00FF00',
    wireFrame: true,
    speed: .02,
    angle: .02
};

gui.addColor(guiOptions, 'SphereColor').onChange(function(e) {sphere.material.color.set(e);});
gui.add(guiOptions, 'wireframe').onChange(function(e){sphere.material.wireframe = e; });
gui.add(guiOptions, 'angle', 0,1);
gui.add(guiOptions, 'speed', 0,1);

var angle = 0;
var speed = .01;

function animate(time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    renderer.render(scene, camera);

    angle += guiOptions.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(angle));

    renderer.render(camera, scene);
}

renderer.setAnimationLoop(animate);