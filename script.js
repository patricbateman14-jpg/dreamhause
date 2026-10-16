import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const host = document.querySelector('#house-scene');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x050b18, 0.022);
const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
camera.position.set(9, 6.5, 11);
const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
host.appendChild(renderer.domElement);

scene.add(new THREE.AmbientLight(0x91baff, 1.5));
const keyLight = new THREE.DirectionalLight(0xc6e5ff, 3.2);
keyLight.position.set(5, 9, 7); keyLight.castShadow = true; scene.add(keyLight);
const blueLight = new THREE.PointLight(0x00bfff, 20, 18); blueLight.position.set(-3, 3, 3); scene.add(blueLight);
const cyanLight = new THREE.PointLight(0x1688ff, 15, 18); cyanLight.position.set(4, 4, -2); scene.add(cyanLight);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1.5, 0); controls.enableDamping = true; controls.dampingFactor = .06;
controls.minDistance = 7; controls.maxDistance = 18; controls.maxPolarAngle = Math.PI * .49;
controls.autoRotate = true; controls.autoRotateSpeed = .45;

const house = new THREE.Group(); scene.add(house);
const mat = (color, metalness=0, roughness=.4, transparent=false, opacity=1) => new THREE.MeshStandardMaterial({color,metalness,roughness,transparent,opacity});
const wall=mat(0x10223a,.3,.32), white=mat(0xd9edff,.25,.26), glass=mat(0x1688c4,.45,.12,true,.34), dark=mat(0x06101f,.5,.3), glow=mat(0x00c8ff,.25,.25), green=mat(0x25765c,0,.8);
function block(name,size,pos,material, parent=house){
 const mesh=new THREE.Mesh(new THREE.BoxGeometry(...size),material); mesh.name=name; mesh.position.set(...pos); mesh.castShadow=true; mesh.receiveShadow=true; parent.add(mesh); return mesh;
}
function strip(size,pos){return block('cyan light strip',size,pos,glow)}
// Floating landscaped platform
block('landscaping base',[10,.35,7],[0,-.15,0],dark);
block('garden surface',[9.8,.07,6.8],[0,.06,0],mat(0x102b3b,0,.85));
block('front path',[1.3,.06,2.1],[0,.13,2.25],mat(0x71869b,.1,.65));
strip([8.9,.035,.07],[0,.1,3.2]); strip([8.9,.035,.07],[0,.1,-3.2]);
// Glass ground floor
block('rear wall',[7.5,1.8,.16],[0,1.15,-2.35],wall);
block('left wall',[.16,1.8,4.6],[-3.7,1.15,-.1],wall);
block('right wall',[.16,1.8,4.6],[3.7,1.15,-.1],wall);
block('front panoramic glass',[7.25,1.45,.035],[0,1.18,2.1],glass);
for(const x of [-3.55,-1.8,0,1.8,3.55]) block('glass frame',[.055,1.65,.08],[x,1.15,2.12],white);
block('ground ceiling',[8.1,.22,5.25],[0,2.1,-.05],white);
strip([8.15,.045,.07],[0,2.0,2.12]); strip([8.15,.045,.07],[0,2.0,-2.55]);
// Cantilever upper floor
block('upper floor slab',[6.1,.22,3.8],[.7,3.18,-.65],white);
block('upper rear wall',[5.7,1.5,.15],[.7,3.95,-2.45],wall);
block('upper left wall',[.15,1.5,3.6],[-2.15,3.95,-.65],wall);
block('upper right wall',[.15,1.5,3.6],[3.55,3.95,-.65],wall);
block('upper panoramic glass',[5.45,1.35,.035],[.7,3.92,1.12],glass);
for(const x of [-1.95,-.2,1.5,3.35]) block('upper window frame',[.055,1.5,.08],[x,3.92,1.13],white);
block('roof',[6.5,.18,4.2],[.7,4.78,-.65],wall);
strip([6.55,.055,.08],[.7,4.67,1.48]);
strip([.08,.055,4.25],[-2.52,4.67,-.65]); strip([.08,.055,4.25],[3.92,4.67,-.65]);
// Furniture visible through the windows
block('sofa base',[1.6,.35,.55],[-1.25,.58,.75],wall);
block('sofa back',[1.6,.58,.18],[-1.25,.92,.48],white);
block('coffee table',[1.05,.12,.65],[.45,.52,.85],white);
block('kitchen island',[1.55,.65,.6],[2.2,.62,-1.15],wall);
block('kitchen island top',[1.65,.08,.7],[2.2,.99,-1.15],white);
block('tv screen',[.06,.75,1.2],[-2.3,1.3,-2.22],dark);
strip([.018,.48,.82],[-2.26,1.32,-2.19]);
block('bed',[1.5,.24,1.4],[.85,3.48,-.45],white);
block('headboard',[1.55,.65,.12],[.85,3.75,-1.12],wall);
block('desk',[1.3,.12,.55],[2.5,3.55,-1.9],white);
// Trees and shrubs
function tree(x,z,s=1){
 const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.07*s,.1*s,.65*s,7),mat(0x6c4d3b));trunk.position.set(x,.4+.32*s,z);house.add(trunk);
 const crown=new THREE.Mesh(new THREE.IcosahedronGeometry(.48*s,1),green);crown.position.set(x,.83+.62*s,z);crown.castShadow=true;house.add(crown);
 const crown2=new THREE.Mesh(new THREE.IcosahedronGeometry(.34*s,1),mat(0x347e60));crown2.position.set(x+.12*s,1.08+.75*s,z-.05*s);house.add(crown2);
}
tree(-4.45,-2.5,.85);tree(4.45,-2.3,.9);tree(-4.5,1.2,.65);tree(4.5,1.4,.7);
for(let i=0;i<12;i++){const shrub=new THREE.Mesh(new THREE.IcosahedronGeometry(.16,0),green);shrub.position.set(-4.4+(i%6)*1.75,.22,-2.8+Math.floor(i/6)*.75);shrub.scale.set(1,.65,1);house.add(shrub)}
const ground=new THREE.Mesh(new THREE.PlaneGeometry(200,200),mat(0x050b18,0,.92));ground.rotation.x=-Math.PI/2;ground.position.y=-.34;ground.receiveShadow=true;scene.add(ground);
const grid=new THREE.GridHelper(45,45,0x0b3c66,0x0a2340);grid.position.y=-.32;grid.material.transparent=true;grid.material.opacity=.22;scene.add(grid);
const count=220, positions=new Float32Array(count*3);
for(let i=0;i<count;i++){positions[i*3]=(Math.random()-.5)*27;positions[i*3+1]=Math.random()*10+1;positions[i*3+2]=(Math.random()-.5)*23-3}
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(positions,3));
const particles=new THREE.Points(pg,new THREE.PointsMaterial({color:0x6bcfff,size:.025,transparent:true,opacity:.7}));scene.add(particles);
function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}
new ResizeObserver(resize).observe(host);resize();
const clock=new THREE.Clock();
function animate(){requestAnimationFrame(animate);const t=clock.getElapsedTime();controls.update();blueLight.intensity=17+Math.sin(t*1.3)*2;cyanLight.intensity=11+Math.sin(t*.9+1)*1.5;particles.rotation.y=t*.006;renderer.render(scene,camera)}animate();

const tourButton=document.querySelector('#tourButton'),toast=document.querySelector('#toast');let toastTimer;
function showToast(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
tourButton.addEventListener('click',()=>{controls.autoRotate=!controls.autoRotate;tourButton.innerHTML=controls.autoRotate?'<span class="play">▶</span> Explore 3D House':'<span class="play">Ⅱ</span> Pause 3D Tour';showToast(controls.autoRotate?'Auto tour started — drag to rotate the house.':'Tour paused — drag to explore the house.');if(!controls.autoRotate){camera.position.set(9,6.5,11);controls.target.set(0,1.5,0)}});
host.addEventListener('pointerdown',()=>showToast('Nice! Drag left or right to rotate the 3D house.'));
const featureInfo={
 smart:{number:'FEATURE 01 / INTELLIGENCE',title:'A home that listens.',text:'Control lights, temperature, music, and entertainment with your voice or phone. An AI assistant helps organize everyday routines.',tag:'VOICE CONTROL · AI ASSISTANT'},
 eco:{number:'FEATURE 02 / SUSTAINABILITY',title:'Live lighter on the planet.',text:'Solar panels can produce clean electricity. Smart systems help reduce wasted energy and water, while the garden brings nature closer to home.',tag:'SOLAR ENERGY · SMART SAVING'},
 security:{number:'FEATURE 03 / PROTECTION',title:'Peace of mind, day and night.',text:'Smart cameras, motion sensors, and connected locks help the family monitor the house and receive alerts when something needs attention.',tag:'CAMERAS · SENSORS · SMART LOCKS'},
 comfort:{number:'FEATURE 04 / WELLBEING',title:'Comfort made personal.',text:'Automatic curtains, adjustable lighting, clean-air systems, and smart temperature controls make each room feel welcoming at any time of day.',tag:'LIGHT · AIR · TEMPERATURE'}
};
const modal=document.querySelector('#featureModal');
document.querySelectorAll('[data-open]').forEach(btn=>btn.addEventListener('click',()=>{const info=featureInfo[btn.dataset.open];if(!info)return;document.querySelector('#modalEyebrow').textContent=info.number;document.querySelector('#modalTitle').textContent=info.title;document.querySelector('#modalText').textContent=info.text;document.querySelector('#modalTag').textContent=info.tag;modal.classList.add('open');modal.setAttribute('aria-hidden','false')}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
const menuToggle=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav');menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const revealTargets=document.querySelectorAll('.feature-card,.gallery-tile,.section-intro,.gallery-heading');revealTargets.forEach(el=>el.classList.add('reveal'));
if('IntersectionObserver'in window){const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');io.unobserve(entry.target)}}),{threshold:.12});revealTargets.forEach(el=>io.observe(el))}else revealTargets.forEach(el=>el.classList.add('visible'));
