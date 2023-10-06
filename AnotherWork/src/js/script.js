import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);



const scene = new THREE.scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);


camera.position.set(-10,30,30);
orbit.update();


const boxGeo = new THREE.BoxGeometry();
const boxMat = new THREE.MeshBasicMaterial({color: 0x00FF00, side: THREE.DoubleSide});
const box = new THREE.Mesh(boxGeo, boxMat);

const planeGeo = new THREE.PlaneGeometry(30,30);
const planetMat = new THREE.MeshStandardMaterial
const plane = new THREE.Mesh(planetGeo, planetMat);
scene.add(plane);
plane.rotation.x = -.5 * Math.PI;

function animate(time) {
    box.rotation.x = time/1000;
    box.rotation.y = time/1000;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
