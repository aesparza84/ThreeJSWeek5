import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

import background from '/src/background.jpg'; // Credit: <a href="https://www.freepik.com/free-photo/abstract-flowing-neon-wave-background_15474089.htm#query=background&position=26&from_view=keyword">Image by rawpixel.com</a> on Freepik
import stars from '/src/stars.jpg'; //https://www.pxfuel.com/en/free-photo-obmtg/download
import one from '../img/one.jpg';
import two from '../img/two.jpg';
import thre from '../img/three.jpg';
import four from '../img/four.jpg';
import five from '../img/five.jpg';
import six from '../img/six.jpg';

import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';


var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
//renderer.setClearColor(0x334455);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000);
const orbit = new OrbitControls(camera, renderer.domElement);

//#region background
    const textureLoader = new THREE.TextureLoader();    
    scene.background = textureLoader.load(stars);         //This one is just a static background
        //Sets the background of the project
    const cubeLoader = new THREE.CubeTextureLoader();

    //We build out the cube walls with these images, builds a 'reactive space'
        //scene.background = cubeLoader.load([background,background,stars,stars,stars,stars]);
//#endregion

renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);





const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper);

const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);



//Light--------------------//
const ambientLight = new THREE.AmbientLight(0x222222);
scene.add(ambientLight);

//EITHER SPOTLIGHT OR DIRECTIONAL. NOT BOTH
//Directional = Sun
//Spotlight = Flashlight/Spotlight

//#region Directional Light

/*
const directionalLight = new THREE.DirectionalLight(0x334455, 26);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(directionalLightHelper);

//Helps ONLY for shadows; Uses shadow camera
const lightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(lightCameraHelper);
directionalLight.shadow.camera.top = 40;
directionalLight.shadow.camera.right = 40;
directionalLight.shadow.camera.left = -40;
directionalLight.shadow.camera.bottom = -40;

directionalLight.position.set(-20,10,0);
directionalLight.castShadow = true;
*/

//#endregion

//#region Spotlight

//Fog
    //scene.fog = new THREE.Fog(0xFFFFFF,0,200);
    //scene.fog = new THREE.FogExp2(0xFFFFFF, .01); Exponential fog, fogs up faster


    // const spotLight = new THREE.SpotLight(0xFFFFFF);
    // spotLight.castShadow = true;
    // spotLight.decay = 0;
    // spotLight.position.set(-20,20,0);

    // const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    // scene.add(spotLightHelper);
    // scene.add(spotLight);
//#endregion


//camera.position.set(40,50,20);
camera.position.set(-140,60,60);
orbit.update();


const mousePos = new THREE.Vector2();

window.addEventListener('mousemove', function(e){
    mousePos.x = (e.clientX / width) * 2-1;
    mousePos.y = (e.clientY / height) * 2+1;
})
const rayCaster = new THREE.Raycaster();



//#region Shapes from above

/*
    //Box---------------------------//
const boxGeo = new THREE.BoxGeometry();
const boxMat = new THREE.MeshBasicMaterial({color: 0x44FF11, side: THREE.DoubleSide});
const box = new THREE.Mesh(boxGeo, boxMat);
//scene.add(box);

    //Box2, uses a texture for the mesh
    const boxCoolGeo = new THREE.BoxGeometry(4,4,4);
    const boxCoolMat = new THREE.MeshBasicMaterial({color: 0xFF0000, map: textureLoader.load(stars)});
    //const boxCool = new THREE.Mesh(boxCoolGeo, boxCoolMat);


    const boxCoolMaterials = 
    [
        new THREE.MeshBasicMaterial({map:textureLoader.load(one)}),
        new THREE.MeshBasicMaterial({map:textureLoader.load(two)}),
        new THREE.MeshBasicMaterial({map:textureLoader.load(thre)}),
        new THREE.MeshBasicMaterial({map:textureLoader.load(four)}),
        new THREE.MeshBasicMaterial({map:textureLoader.load(five)}),
        new THREE.MeshBasicMaterial({map:textureLoader.load(six)})
    ];

    const boxCool = new THREE.Mesh(boxCoolGeo, boxCoolMaterials);

    boxCool.position.y = 10;
    boxCool.castShadow = true;
    //boxCool.material.map = textureLoader.load(stars); This is another way to apply texture
    scene.add(boxCool);

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

// const torusGeo = new THREE.TorusGeometry(2, 1, 14, 24);
// const torusMat = new THREE.MeshStandardMaterial({color: 0xFF0000, side: THREE.DoubleSide});
// const torus = new THREE.Mesh(torusGeo, torusMat);
// torus.castShadow = true;
// scene.add(torus);
// torus.position.set(1,5,0);
// torus.rotateY(4.8);

*/
//#endregion

//#region Week 7 stuff

//3D object
const starUrl = new URL('../assets/star.glb', import.meta.url);
const assetLoader = new GLTFLoader();
assetLoader.load(
    starUrl.href,
    function(gltf){
        const model = gltf.scene;
        scene.add(model);
        model.position.set(0,-10,0);        //Model from Sketchfab.com, Akshat
    },
    undefined,
    function(error){
        console.error(error);
    }
);



const plane2Geo = new THREE.PlaneGeometry(10,10,10,10);
const plane2Mat = new THREE.MeshBasicMaterial({color: 0xFFFFFF, side: THREE.DoubleSide});
const plane2 = new THREE.Mesh(plane2Geo, plane2Mat);
scene.add(plane2);
plane2.position.set(10,10,10);

plane2.geometry.attributes.position.array[0] = 5*Math.random();
plane2.geometry.attributes.position.array[1] = 5*Math.random();
plane2.geometry.attributes.position.array[2] = 5*Math.random();

//#region Planets
const sunShaderMaterial = new THREE.ShaderMaterial({       //The better way of creating shaders, in Index
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
});

const sunGeo = new THREE.SphereGeometry(6,7,7);
const sunMat = new THREE.MeshStandardMaterial({color: 0xFF0000, side: THREE.DoubleSide});
const sun = new THREE.Mesh(sunGeo, sunShaderMaterial);
scene.add(sun);
sun.position.set(0,-20,0);

const mercuryGeo = new THREE.SphereGeometry(1,7,7);
const mercuryMat = new THREE.MeshStandardMaterial({color: 0xCD5C5C, map: textureLoader.load(stars)});
// const mercuryMat = new THREE.MeshStandardMaterial({color: 0xCD5C5C, side: THREE.DoubleSide});
const mercury = new THREE.Mesh(mercuryGeo, mercuryMat);
//scene.add(mercury);
const mercuryOBJ = new THREE.Object3D();
mercuryOBJ.add(mercury);
scene.add(mercuryOBJ);

const venusGeo = new THREE.SphereGeometry(1.2, 7, 7);
const venusMat = new THREE.MeshStandardMaterial({color: 0xEAA560, map: textureLoader.load(stars)});
// const venusMat = new THREE.MeshStandardMaterial({color: 0xEAA560, side: THREE.DoubleSide});
const venus = new THREE.Mesh(venusGeo, venusMat);
const venusOBJ = new THREE.Object3D();
venusOBJ.add(venus);
scene.add(venusOBJ);

const earthGeo = new THREE.SphereGeometry(1.3, 7, 7);
const earthMat = new THREE.MeshStandardMaterial({color: 0x2136CD, map: textureLoader.load(stars)});
// const earthMat = new THREE.MeshStandardMaterial({color: 0x2136CD, side: THREE.DoubleSide});
const earth = new THREE.Mesh(earthGeo, earthMat);
const earthOBJ = new THREE.Object3D();
earthOBJ.add(earth);
scene.add(earthOBJ);

const marsGeo = new THREE.SphereGeometry(1.2, 7, 7);
const marsMat = new THREE.MeshStandardMaterial({color: 0xE26D58, map: textureLoader.load(stars)});
// const marsMat = new THREE.MeshStandardMaterial({color: 0xE26D58, side: THREE.DoubleSide});
const mars = new THREE.Mesh(marsGeo, marsMat);
const marsOBJ = new THREE.Object3D();
marsOBJ.add(mars);
scene.add(marsOBJ);

const jupiterGeo = new THREE.SphereGeometry(6, 7, 7);
const jupiterMat = new THREE.MeshStandardMaterial({color: 0xD5A237, map: textureLoader.load(stars)});
// const jupiterMat = new THREE.MeshStandardMaterial({color: 0xD5A237, side: THREE.DoubleSide});
const jupiter = new THREE.Mesh(jupiterGeo, jupiterMat);
const jupiterOBJ = new THREE.Object3D();
jupiterOBJ.add(jupiter);
scene.add(jupiterOBJ);

const saturnGeo = new THREE.SphereGeometry(5.5, 7, 7);
const saturnMat = new THREE.MeshStandardMaterial({color: 0xD8CB82, map: textureLoader.load(stars)});
// const saturnMat = new THREE.MeshStandardMaterial({color: 0xD8CB82, side: THREE.DoubleSide});
const saturn = new THREE.Mesh(saturnGeo, saturnMat);
const saturnOBJ = new THREE.Object3D();
saturnOBJ.add(saturn);

    const ringAGeo = new THREE.RingGeometry(9, 6);
    const ringAMat = new THREE.MeshStandardMaterial({color: 0xFF0000, side: THREE.DoubleSide});
    const ringA = new THREE.Mesh(ringAGeo, ringAMat);
    ringA.rotateX(45);
    const ringCGeo = new THREE.RingGeometry(8, 7);
    const ringCMat = new THREE.MeshStandardMaterial({color: 0xFF3300, side: THREE.DoubleSide});
    const ringC = new THREE.Mesh(ringCGeo, ringCMat);
    ringC.rotateX(45);
    const ringDGeo = new THREE.RingGeometry(8, 7);
    const ringDMat = new THREE.MeshStandardMaterial({color: 0xFF00FF, side: THREE.DoubleSide});
    const ringD = new THREE.Mesh(ringDGeo, ringDMat);
    ringD.rotateX(45);
    saturnOBJ.add(ringA);
    saturnOBJ.add(ringC);
    saturnOBJ.add(ringD);
    scene.add(saturnOBJ);

const uranasGeo = new THREE.SphereGeometry(5, 7,7);
const uranasMat = new THREE.MeshStandardMaterial({color: 0x4A8FAF, map: textureLoader.load(stars)});
// const uranasMat = new THREE.MeshStandardMaterial({color: 0x4A8FAF, side: THREE.DoubleSide});
const uranas = new THREE.Mesh(uranasGeo, uranasMat);
const uranasOBJ = new THREE.Object3D();
uranasOBJ.add(uranas);
scene.add(uranasOBJ);

const neptuneGeo = new THREE.SphereGeometry(4.5, 7, 7);
const neptuneMat = new THREE.MeshStandardMaterial({color: 0x98E5E2, map: textureLoader.load(stars)});
//const neptuneMat = new THREE.MeshStandardMaterial({color: 0x98E5E2, side: THREE.DoubleSide});
const neptune = new THREE.Mesh(neptuneGeo, neptuneMat);
const neptuneOBJ = new THREE.Object3D();
neptuneOBJ.add(neptune);

    const ringBGeo = new THREE.RingGeometry(10, 7);
    const ringBMat = new THREE.MeshStandardMaterial({color: 0xD8CB82, side: THREE.DoubleSide});
    const ringB = new THREE.Mesh(ringBGeo, ringBMat);
    ringB.rotateX(60);
    const ringEGeo = new THREE.RingGeometry(9, 6);
    const ringEMat = new THREE.MeshStandardMaterial({color: 0xD8CB82, side: THREE.DoubleSide});
    const ringE = new THREE.Mesh(ringEGeo, ringEMat);
    ringE.rotateX(60);
    neptuneOBJ.add(ringB);
    neptuneOBJ.add(ringE);
    scene.add(neptuneOBJ);

const plutoGeo = new THREE.SphereGeometry(1, 7, 7);
const plutoMat = new THREE.MeshStandardMaterial({color: 0x223333, map: textureLoader.load(stars)});
// const plutoMat = new THREE.MeshStandardMaterial({color: 0x223333, side: THREE.DoubleSide});
const pluto = new THREE.Mesh(plutoGeo, plutoMat);
const plutoOBJ = new THREE.Object3D();
plutoOBJ.add(pluto);
scene.add(plutoOBJ);

//#region Sun lights
const sunTargetA = new THREE.Object3D();
const sunTargetB = new THREE.Object3D();
sunTargetA.position.set(sun.position.x-10, sun.position.y, sun.position.z);
sunTargetB.position.set(sun.position.x+10, sun.position.y, sun.position.z);
scene.add(sunTargetA);
scene.add(sunTargetB);

 const sunLightA = new THREE.SpotLight(0xFFFFFF);
 sunLightA.castShadow = true;
 sunLightA.decay = 0;
 sunLightA.position.set(sun.position.x, sun.position.y, sun.position.z);
 sunLightA.target = sunTargetA;

     const sunLightAHelper = new THREE.SpotLightHelper(sunLightA);
     //scene.add(sunLightAHelper);
     scene.add(sunLightA);
     sunLightA.angle = 10;

const sunLightB = new THREE.SpotLight(0xFFFFFF);
sunLightB.castShadow = true;
sunLightB.decay = 0;
sunLightB.position.set(sun.position.x, sun.position.y, sun.position.z);
sunLightB.target = sunTargetB;
    
    const sunLightBHelper = new THREE.SpotLightHelper(sunLightB);
    scene.add(sunLightBHelper);
    scene.add(sunLightB);
    sunLightA.angle = 2.1;

sunLightA.intensity = 8;
sunLightB.intensity = 8;
//#endregion

    mercury.position.set(sun.position.x+10, sun.position.y, sun.position.z);
    mercury.rotateX(-.5);

    venus.position.set(sun.position.x+20, sun.position.y, sun.position.z);
    venus.rotateX(0.4);

    earth.position.set(sun.position.x+34, sun.position.y, sun.position.z);
    earth.rotateX(0.2);

    mars.position.set(sun.position.x+48, sun.position.y, sun.position.z);

    jupiter.position.set(sun.position.x+68, sun.position.y, sun.position.z);
    jupiter.rotateX(.3);
    
    saturn.position.set(sun.position.x+90, sun.position.y, sun.position.z);
        ringA.position.set(saturn.position.x, saturn.position.y, saturn.position.z);
        ringC.position.set(saturn.position.x, saturn.position.y+.5, saturn.position.z);
        ringD.position.set(saturn.position.x, saturn.position.y-.5, saturn.position.z);
        saturn.rotateX(-.4);

    uranas.position.set(sun.position.x+120, sun.position.y, sun.position.z);
    uranas.rotateX(.7);

    neptune.position.set(sun.position.x+145, sun.position.y, sun.position.z);
        ringB.position.set(neptune.position.x, neptune.position.y, neptune.position.z);
        ringE.position.set(neptune.position.x-.5, neptune.position.y, neptune.position.z);
        neptune.rotateX(2);

    pluto.position.set(sun.position.x+164, sun.position.y, sun.position.z);
//#endregion 
//#endregion

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
    TorusSpeed: 1000,

    angle: 0.2,
    penumbra: 0,
    intensity: 1    
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

//------------------//
gui.add(guiOptions, "angle", 0,1);
gui.add(guiOptions, "penumbra", 0,1);
gui.add(guiOptions, "intensity", 0,1);


var speed = .01;

var coneSpeed =1;
var coneAngle =1.5;

var torSpeed =1000;
var torScale = 1;
 
function animate(time) {
    //box.rotation.x = time/1000;
    //box.rotation.y = time/1000;

    /*
    speed += guiOptions.Speed;
    sphere.position.y = 10 * Math.abs(Math.sin(speed));

    
    coneSpeed += guiOptions.Conespeed;
    coneAngle += guiOptions.Coneangle;
    cone.position.x = (coneAngle *0.1) * (Math.sin(coneSpeed));
    cone.position.y = (coneAngle *0.1) * (Math.cos(coneSpeed));
    */

    // torSpeed = guiOptions.TorusSpeed;
    // torus.rotation.y = time/torSpeed;
    // torus.rotation.x = time/200;
    
    // torScale = guiOptions.TorusScale;
    // torus.scale.set(torScale, torScale, 3);

        //spotLight.angle = guiOptions.angle;    
        //spotLight.penumbra = guiOptions.penumbra;
        //spotLight.intensity = guiOptions.intensity;
    
    rayCaster.setFromCamera(mousePos, camera);
    const intersectObj = rayCaster.intersectObjects(scene.children);
    //console.log(intersectObj);

    // for (let index = 0; index < intersectObj.length; index++)
    // {
    //     if (intersectObj[i].object.id == sphere.id)
    //     {
    //         intersectObj[i].object.material.color.set(0xFF0000);    
    //     }

    //     if (intersectObj[i].object.id == boxCool.id)
    //     {
    //         intersectObj[i].object.material.color.set(0x00FF00); //Or you can have it rotate when mouse over
    //     }
        
    // }
    sun.rotateY(.01);

    mercuryOBJ.rotateY(.027);
    mercury.rotateY(.03);

    venusOBJ.rotateY(.011);
    venus.rotateY(.04);
    
    earthOBJ.rotateY(.01);
    earth.rotateY(.04);

    marsOBJ.rotateY(.008);
    mars.rotateY(0.03);

    jupiterOBJ.rotateY(0.006);
    jupiter.rotateY(0.009);

    saturnOBJ.rotateY(0.004);
    saturn.rotateY(0.01);

    uranasOBJ.rotateY(0.006);
    uranas.rotateY(0.03);

    neptuneOBJ.rotateY(0.007);
    neptune.rotateY(0.03);

    plutoOBJ.rotateY(0.005);
    pluto.rotateY(0.03);

    //spotLightHelper.update();
    renderer.render(scene, camera);
}

//renderer.render(scene, camera);
renderer.setAnimationLoop(animate);