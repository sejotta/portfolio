/* =========================================================
   CHISPA — naranjita cuadrada con pantalla y ojos pixelados.
   Personaje procedural Three.js. Si existe
   ./assets/models/mascot.glb, se carga y sustituye a este.
   ========================================================= */

import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const MODEL = {
  path: './assets/models/mascot.glb',
  height: 3.9,
  floor: -1.25,
  // Si tu export mira hacia -Z en vez de +Z, pon Math.PI.
  yRotation: 0,
};

const PALETTE = {
  orange: 0xF27A24,
  orangeDark: 0xD96212,
  leaf: 0x34A853,
  leafDark: 0x2B7A3F,
  screen: '#FFFDF7',
  screenEdge: '#E9D8C3',
  ink: '#17130E',
};

const CHAR_SCALE = .75;

const STAGE = {
  containerX: 1.7,
  containerTop: -1.25 + 1.35,
  containerWidth: 3,
  containerHeight: 1.35,
  containerDepth: 1.8,
  containerRootY: -1.25 + 1.35 + .925 * CHAR_SCALE,
  floorRootY: -1.25 + .925 * CHAR_SCALE,
  hop: .62,
  cycle: 12,
};

class Spring {
  constructor(value = 0, stiffness = 70, damping = 12) {
    this.value = value;
    this.velocity = 0;
    this.stiffness = stiffness;
    this.damping = damping;
  }
  update(target, dt) {
    const force = (target - this.value) * this.stiffness;
    const damp = this.velocity * this.damping;
    this.velocity += (force - damp) * dt;
    this.value += this.velocity * dt;
    return this.value;
  }
  reset(value) {
    this.value = value;
    this.velocity = 0;
  }
}

const damp = (current, target, lambda, dt) => THREE.MathUtils.damp(current, target, lambda, dt);
const clamp = THREE.MathUtils.clamp;

/* ---------------------------------------------------------
   Rostro pixelado (canvas textura)
   --------------------------------------------------------- */
const FACE_W = 512;
const FACE_H = 320;
const U = 14;

function roundRectPath(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function px(ctx, x, y, w, h) {
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function drawEye(ctx, cx, cy) {
  const rows = [2, 4, 5, 5, 5, 5, 5, 4, 2];
  ctx.fillStyle = PALETTE.ink;
  rows.forEach((width, i) => {
    px(ctx, cx - (width * U) / 2, cy - 4.5 * U + i * U, width * U, U);
  });
  ctx.fillStyle = PALETTE.screen;
  px(ctx, cx - 1.5 * U, cy - 3 * U, U, 2 * U);
  px(ctx, cx - 0.5 * U, cy - 2.4 * U, U * .7, U * .7);
}

function drawHappyEye(ctx, cx, cy) {
  ctx.fillStyle = PALETTE.ink;
  for (let i = 0; i < 7; i++) {
    const y = cy - (3 - Math.abs(i - 3)) * U;
    px(ctx, cx + (i - 3) * U, y, U, U * 1.15);
  }
}

function drawMouth(ctx, cx, cy, mood) {
  ctx.fillStyle = PALETTE.ink;
  if (mood === 'happy') {
    px(ctx, cx - 2.5 * U, cy - U, U, U * 1.5);
    px(ctx, cx + 1.5 * U, cy - U, U, U * 1.5);
    px(ctx, cx - 1.5 * U, cy + .5 * U, 3 * U, U);
  } else if (mood === 'sleepy') {
    px(ctx, cx - 1.2 * U, cy, 2.4 * U, U);
  } else {
    px(ctx, cx - 2 * U, cy - U, U, U * 1.6);
    px(ctx, cx + U, cy - U, U, U * 1.6);
    px(ctx, cx - U, cy + .6 * U, 2 * U, U);
  }
}

function drawFace(ctx, { gazeX = 0, gazeY = 0, blink = 0, mood = 'idle', sleepy = false }) {
  ctx.clearRect(0, 0, FACE_W, FACE_H);

  roundRectPath(ctx, 10, 10, FACE_W - 20, FACE_H - 20, 34);
  ctx.fillStyle = PALETTE.screen;
  ctx.fill();
  ctx.strokeStyle = PALETTE.screenEdge;
  ctx.lineWidth = 3;
  ctx.stroke();

  const gx = Math.round(clamp(gazeX, -1, 1) * 2) * U;
  const gy = Math.round(clamp(gazeY, -1, 1) * 1.4) * U;
  const eyeY = 142;
  const closed = blink > .45;

  for (const cx of [176, 336]) {
    if (mood === 'happy') {
      drawHappyEye(ctx, cx + gx, eyeY + gy);
    } else if (closed) {
      ctx.fillStyle = PALETTE.ink;
      px(ctx, cx - 2.5 * U + gx, eyeY - .5 * U + gy, 5 * U, U);
    } else {
      drawEye(ctx, cx + gx, eyeY + gy);
      if (sleepy) {
        ctx.fillStyle = PALETTE.screen;
        px(ctx, cx - 3.2 * U + gx, eyeY - 5 * U + gy, 6.4 * U, 5 * U);
        ctx.fillStyle = PALETTE.ink;
        px(ctx, cx - 2.5 * U + gx, eyeY + gy, 5 * U, U);
      }
    }
  }

  const my = 238 + Math.round(gy * .3);
  if (sleepy) drawMouth(ctx, 256, my, 'sleepy');
  else if (mood === 'happy') drawMouth(ctx, 256, my, 'happy');
  else drawMouth(ctx, 256, my, 'idle');
}

/* ---------------------------------------------------------
   Materiales
   --------------------------------------------------------- */
function makeMaterials() {
  return {
    orange: new THREE.MeshPhysicalMaterial({
      color: PALETTE.orange,
      roughness: .52,
      metalness: .02,
      clearcoat: .28,
      clearcoatRoughness: .65,
    }),
    leaf: new THREE.MeshStandardMaterial({
      color: PALETTE.leaf,
      roughness: .58,
      metalness: 0,
      side: THREE.DoubleSide,
    }),
    stem: new THREE.MeshStandardMaterial({
      color: PALETTE.leafDark,
      roughness: .7,
    }),
    white: new THREE.MeshBasicMaterial({
      color: 0xFFF8EC,
      toneMapped: false,
      transparent: true,
      opacity: .9,
    }),
  };
}

function makeShadowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 124);
  g.addColorStop(0, 'rgba(0,0,0,.52)');
  g.addColorStop(.55, 'rgba(0,0,0,.18)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 4, 128, 128, 126);
  g.addColorStop(0, 'rgba(255, 164, 92,.55)');
  g.addColorStop(.42, 'rgba(255, 164, 92,.20)');
  g.addColorStop(1, 'rgba(255, 164, 92,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeContainerTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#B83B2B';
  ctx.fillRect(0, 0, 1024, 512);

  const shade = ctx.createLinearGradient(0, 0, 0, 512);
  shade.addColorStop(0, 'rgba(255,184,150,.22)');
  shade.addColorStop(.55, 'rgba(255,255,255,0)');
  shade.addColorStop(1, 'rgba(48,10,6,.32)');
  ctx.fillStyle = shade;
  ctx.fillRect(0, 0, 1024, 512);

  for (let x = 12; x < 1024; x += 28) {
    ctx.fillStyle = 'rgba(70,15,10,.32)';
    ctx.fillRect(x, 18, 3, 476);
    ctx.fillStyle = 'rgba(255,165,135,.22)';
    ctx.fillRect(x + 4, 18, 2, 476);
  }

  ctx.fillStyle = '#8E2A1F';
  ctx.fillRect(0, 0, 1024, 24);
  ctx.fillRect(0, 488, 1024, 24);
  ctx.fillStyle = 'rgba(43,8,5,.4)';
  ctx.fillRect(0, 22, 1024, 3);
  ctx.fillRect(0, 487, 1024, 3);

  ctx.strokeStyle = 'rgba(58,10,7,.62)';
  ctx.lineWidth = 7;
  ctx.strokeRect(766, 64, 210, 384);
  ctx.strokeStyle = 'rgba(255,190,160,.28)';
  ctx.lineWidth = 3;
  ctx.strokeRect(770, 68, 202, 376);
  ctx.fillStyle = 'rgba(58,10,7,.55)';
  ctx.fillRect(800, 210, 10, 70);
  ctx.fillRect(932, 210, 10, 70);

  ctx.fillStyle = '#F2E6DA';
  ctx.fillRect(806, 116, 132, 64);
  ctx.strokeStyle = 'rgba(58,10,7,.4)';
  ctx.lineWidth = 3;
  ctx.strokeRect(806, 116, 132, 64);
  ctx.fillStyle = 'rgba(58,10,7,.24)';
  ctx.fillRect(824, 138, 96, 6);
  ctx.fillRect(824, 154, 62, 6);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function buildContainers() {
  const group = new THREE.Group();
  const texture = makeContainerTexture();
  const face = new THREE.MeshStandardMaterial({
    map: texture,
    roughness: .72,
    metalness: .05,
  });
  const side = new THREE.MeshStandardMaterial({
    color: 0xA83325,
    roughness: .78,
    metalness: .04,
  });
  const top = new THREE.MeshStandardMaterial({
    color: 0x8E2A1F,
    roughness: .82,
  });
  const bottom = new THREE.MeshStandardMaterial({
    color: 0x5C1E17,
    roughness: .9,
  });
  const geometry = new THREE.BoxGeometry(
    STAGE.containerWidth,
    STAGE.containerHeight,
    STAGE.containerDepth
  );
  const materials = [face, face, top, bottom, face, face];

  [-STAGE.containerX, STAGE.containerX].forEach((x, index) => {
    const mesh = new THREE.Mesh(geometry, materials);
    mesh.position.set(x, -1.25 + STAGE.containerHeight / 2, -.15);
    mesh.rotation.y = index === 0 ? .08 : -.08;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  });

  // A thin dark lip makes the top edge readable when Chispa stands on it.
  const lipMaterial = new THREE.MeshStandardMaterial({ color: 0x6E2118, roughness: .8 });
  const lipGeometry = new THREE.BoxGeometry(
    STAGE.containerWidth + .04,
    .03,
    STAGE.containerDepth + .04
  );
  [-STAGE.containerX, STAGE.containerX].forEach((x, index) => {
    const lip = new THREE.Mesh(lipGeometry, lipMaterial);
    lip.position.set(x, STAGE.containerTop, -.15);
    lip.rotation.y = index === 0 ? .08 : -.08;
    lip.castShadow = true;
    group.add(lip);
  });

  return group;
}

/* ---------------------------------------------------------
   Personaje
   --------------------------------------------------------- */
function buildCharacter(mats) {
  const root = new THREE.Group();
  const bodyGroup = new THREE.Group();
  bodyGroup.position.y = .15;
  root.add(bodyGroup);

  const body = new THREE.Mesh(new RoundedBoxGeometry(2.9, 2.15, .9, 6, .24), mats.orange);
  bodyGroup.add(body);

  const canvas = document.createElement('canvas');
  canvas.width = FACE_W;
  canvas.height = FACE_H;
  const ctx = canvas.getContext('2d');
  drawFace(ctx, {});

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 1.45),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      alphaTest: .01,
      toneMapped: false,
    })
  );
  screen.position.set(0, .02, .46);
  bodyGroup.add(screen);

  const highlight = new THREE.Mesh(new THREE.CircleGeometry(.13, 24), mats.white);
  highlight.position.set(-1.23, .73, .462);
  highlight.scale.set(.9, .62, 1);
  bodyGroup.add(highlight);

  const armGeo = new THREE.TorusGeometry(.23, .072, 10, 26, Math.PI);
  const armR = new THREE.Group();
  armR.position.set(1.41, -.08, .08);
  const torusR = new THREE.Mesh(armGeo, mats.orange);
  torusR.rotation.z = -Math.PI / 2;
  armR.add(torusR);
  bodyGroup.add(armR);

  const armL = new THREE.Group();
  armL.position.set(-1.41, -.08, .08);
  const torusL = new THREE.Mesh(armGeo, mats.orange);
  torusL.rotation.z = Math.PI / 2;
  armL.add(torusL);
  bodyGroup.add(armL);

  const leafPivot = new THREE.Group();
  leafPivot.position.set(.38, 1.07, .06);
  bodyGroup.add(leafPivot);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(.035, .05, .22, 10), mats.stem);
  stem.position.y = .08;
  leafPivot.add(stem);

  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(.14, .22, .22, .58, .06, .92);
  leafShape.bezierCurveTo(-.16, .68, -.2, .3, 0, 0);
  const leafMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(leafShape, { depth: .035, bevelEnabled: false, curveSegments: 12 }),
    mats.leaf
  );
  leafMesh.position.set(0, .12, -.017);
  leafMesh.rotation.z = -.55;
  leafPivot.add(leafMesh);

  root.traverse((o) => {
    if (o.isMesh) {
      o.castShadow = true;
      o.receiveShadow = true;
    }
  });
  screen.castShadow = false;
  screen.receiveShadow = false;
  highlight.castShadow = false;

  return {
    root,
    body: bodyGroup,
    bodyMesh: body,
    screen,
    screenCtx: ctx,
    screenTexture: texture,
    highlight,
    leafPivot,
    leafMesh,
    armL,
    armR,
  };
}

/* ---------------------------------------------------------
   Escena
   --------------------------------------------------------- */
export function createMascot({ canvas, stage, reducedMotion = false }) {
  if (!canvas || !stage) return null;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
  } catch (error) {
    stage.classList.add('is-fallback');
    return null;
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, .1, 100);
  camera.position.set(0, .55, 16.5);
  camera.lookAt(0, .25, 0);

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.04;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const envRT = pmrem.fromScene(new RoomEnvironment(), .04);
  scene.environment = envRT.texture;
  scene.environmentIntensity = .5;

  const hemi = new THREE.HemisphereLight(0xFFF3DF, 0x14130F, .7);
  scene.add(hemi);

  const key = new THREE.DirectionalLight(0xFFF0D8, 2.5);
  key.position.set(4.5, 6.5, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -4.5;
  key.shadow.camera.right = 4.5;
  key.shadow.camera.top = 5.5;
  key.shadow.camera.bottom = -3.5;
  key.shadow.camera.near = .5;
  key.shadow.camera.far = 20;
  key.shadow.camera.updateProjectionMatrix();
  key.shadow.bias = -0.0015;
  key.shadow.normalBias = .02;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0xFFA45C, .85);
  rim.position.set(-4.5, 2.5, -4);
  scene.add(rim);

  const fill = new THREE.DirectionalLight(0xBFD4FF, .4);
  fill.position.set(-2.5, .5, 5);
  scene.add(fill);

  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(30, 30),
    new THREE.ShadowMaterial({ color: 0x000000, opacity: .3 })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = MODEL.floor - .01;
  shadowPlane.receiveShadow = true;
  scene.add(shadowPlane);

  const contact = new THREE.Mesh(
    new THREE.PlaneGeometry(4.4, 2.6),
    new THREE.MeshBasicMaterial({
      map: makeShadowTexture(),
      transparent: true,
      depthWrite: false,
      opacity: .55,
    })
  );
  contact.rotation.x = -Math.PI / 2;
  contact.position.y = MODEL.floor;
  scene.add(contact);

  const floorGlow = new THREE.Mesh(
    new THREE.PlaneGeometry(4.8, 3.1),
    new THREE.MeshBasicMaterial({
      map: makeGlowTexture(),
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      opacity: .5,
    })
  );
  floorGlow.rotation.x = -Math.PI / 2;
  floorGlow.position.y = MODEL.floor + .006;
  scene.add(floorGlow);

  const fitGroup = new THREE.Group();
  scene.add(fitGroup);

  const mats = makeMaterials();
  const parts = buildCharacter(mats);
  const bot = parts.root;
  bot.scale.setScalar(CHAR_SCALE);
  fitGroup.add(bot);
  fitGroup.add(buildContainers());

  const PARTICLE_COUNT = 44;
  const particlePos = new Float32Array(PARTICLE_COUNT * 3);
  const particleVel = new Float32Array(PARTICLE_COUNT * 3);
  const particleLife = new Float32Array(PARTICLE_COUNT);
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xFFA45C,
    size: .07,
    transparent: true,
    opacity: 0,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  particles.frustumCulled = false;
  bot.add(particles);

  const state = {
    reduced: reducedMotion,
    mood: 'idle',
    moodUntil: 0,
    hopStart: -1,
    waveStart: -1,
    blinkAt: 0,
    blinkStart: -1,
    sleepy: false,
    lastPointer: performance.now(),
    targetX: 0,
    targetY: 0,
    paused: false,
    visible: true,
    custom: null,
    mixer: null,
    customHead: null,
    customEyes: null,
    customIdle: null,
    customWave: null,
  };

  const bodyYaw = new Spring(0, 60, 12);
  const bodyPitch = new Spring(0, 60, 12);
  const leafZ = new Spring(0, 38, 7);
  const leafX = new Spring(0, 38, 7);
  const eyeX = new Spring(0, 90, 14);
  const eyeY = new Spring(0, 90, 14);

  let prevYaw = 0;
  let prevPitch = 0;
  let lastFaceDraw = 0;

  function setPointer(x, y) {
    state.targetX = clamp(x, -1, 1);
    state.targetY = clamp(y, -1, 1);
    state.lastPointer = performance.now();
    state.sleepy = false;
  }

  const onPointerMove = (event) => {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -((event.clientY / window.innerHeight) * 2 - 1);
    setPointer(x, y);
  };
  const onPointerLeave = () => setPointer(0, 0);
  window.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('pointerleave', onPointerLeave, { passive: true });

  function burst() {
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * .6 + .1;
      particlePos[i * 3] = Math.cos(a) * r;
      particlePos[i * 3 + 1] = .35 + Math.random() * .8;
      particlePos[i * 3 + 2] = .45 + Math.random() * .3;
      const speed = .7 + Math.random() * 1.1;
      particleVel[i * 3] = Math.cos(a) * speed * .7;
      particleVel[i * 3 + 1] = Math.random() * 1.2 + .5;
      particleVel[i * 3 + 2] = Math.sin(a) * speed * .5;
      particleLife[i] = 1;
    }
    particleMat.opacity = 1;
    particleGeo.attributes.position.needsUpdate = true;
  }

  function react(kind = 'wave') {
    if (state.reduced) return;
    state.mood = 'happy';
    state.moodUntil = performance.now() + 1500;
    state.hopStart = performance.now();
    if (kind === 'wave') state.waveStart = performance.now();
    burst();
    if (state.customWave) state.customWave.reset().play();
  }

  const onCanvasClick = () => react('wave');
  canvas.addEventListener('click', onCanvasClick);

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    const visibleH = 2 * camera.position.z * Math.tan((camera.fov * Math.PI) / 360);
    const visibleW = visibleH * camera.aspect;
    const fit = Math.min(1, visibleW / 7, visibleH / 5.2);
    fitGroup.scale.setScalar(fit);
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  async function tryCustomModel() {
    try {
      const res = await fetch(MODEL.path, { method: 'HEAD', cache: 'no-store' });
      if (!res.ok) return;
    } catch {
      return;
    }
    const loader = new GLTFLoader();
    loader.load(MODEL.path, (gltf) => {
      const model = gltf.scene;
      model.rotation.y = MODEL.yRotation;
      model.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          if (o.material && 'envMapIntensity' in o.material) o.material.envMapIntensity = .9;
        }
      });

      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      if (!size.y) return;
      const scale = Math.min(MODEL.height / size.y, 4 / Math.max(size.x, size.z, .001));
      model.scale.setScalar(scale);
      box.setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.x -= center.x;
      model.position.z -= center.z;
      model.position.y += MODEL.floor - box.min.y;

      bot.visible = false;
      fitGroup.add(model);
      state.custom = model;
      state.customHead = model.getObjectByName('Head') || model.getObjectByName('head');
      state.customEyes = [
        model.getObjectByName('Eye_L'), model.getObjectByName('Eye_R'),
      ].filter(Boolean);

      if (gltf.animations && gltf.animations.length) {
        state.mixer = new THREE.AnimationMixer(model);
        const idle = gltf.animations.find((c) => /idle/i.test(c.name)) || gltf.animations[0];
        const wave = gltf.animations.find((c) => /wave|hello|hola/i.test(c.name));
        if (idle) {
          state.customIdle = state.mixer.clipAction(idle);
          state.customIdle.play();
        }
        if (wave) {
          state.customWave = state.mixer.clipAction(wave);
          state.customWave.setLoop(THREE.LoopOnce, 1);
          state.customWave.clampWhenFinished = true;
        }
      }
      stage.dataset.customModel = 'true';
    }, undefined, () => {});
  }
  tryCustomModel();

  let prevTime = performance.now();
  let raf = 0;

  function update(dt, now, t) {
    if (state.mixer) state.mixer.update(dt);

    const idle = now - state.lastPointer > 3500;
    const sleepy = now - state.lastPointer > 40000;

    const targetX = state.reduced ? 0 : (idle ? Math.sin(t * .23) * .5 : state.targetX);
    const targetY = state.reduced ? 0 : (idle ? Math.sin(t * .19 + 1.2) * .3 : state.targetY);

    bodyYaw.update(targetX * .24, dt);
    bodyPitch.update(-targetY * .16, dt);

    const yawVel = (bodyYaw.value - prevYaw) / Math.max(dt, .001);
    const pitchVel = (bodyPitch.value - prevPitch) / Math.max(dt, .001);
    prevYaw = bodyYaw.value;
    prevPitch = bodyPitch.value;

    if (!state.custom) {
      parts.body.rotation.y = bodyYaw.value;
      parts.body.rotation.x = bodyPitch.value;
      parts.body.rotation.z = -targetX * .035;
      parts.body.position.y = .15 + Math.sin(t * 1.15) * .02;

      eyeX.update(clamp(targetX * 1.15, -1.2, 1.2), dt);
      eyeY.update(clamp(targetY * 1.15, -1.2, 1.2), dt);

      let blinkAmount = 0;
      if (!state.reduced) {
        if (state.blinkStart < 0 && now > state.blinkAt) {
          state.blinkStart = now;
          state.blinkAt = now + 2400 + Math.random() * 3600;
        }
        if (state.blinkStart > 0) {
          const p = (now - state.blinkStart) / 190;
          if (p >= 1) state.blinkStart = -1;
          else blinkAmount = Math.pow(Math.sin(Math.PI * clamp(p, 0, 1)), .65);
        }
      }

      const happy = state.mood === 'happy';
      if (now - lastFaceDraw > 33) {
        drawFace(parts.screenCtx, {
          gazeX: eyeX.value,
          gazeY: eyeY.value,
          blink: blinkAmount,
          mood: happy ? 'happy' : 'idle',
          sleepy,
        });
        parts.screenTexture.needsUpdate = true;
        lastFaceDraw = now;
      }

      leafZ.update(clamp(-yawVel * .045, -.4, .4), dt);
      leafX.update(clamp(pitchVel * .035, -.35, .35), dt);
      parts.leafPivot.rotation.z = -.05 + leafZ.value + Math.sin(t * 1.55) * .035;
      parts.leafPivot.rotation.x = leafX.value + Math.cos(t * 1.2) * .025;

      if (state.waveStart > 0) {
        const p = (now - state.waveStart) / 1500;
        if (p >= 1) {
          state.waveStart = -1;
          parts.armR.rotation.z = damp(parts.armR.rotation.z, 0, 8, dt);
          parts.armR.rotation.x = damp(parts.armR.rotation.x, 0, 8, dt);
        } else {
          const raise = Math.sin(Math.min(1, p * 2.4) * Math.PI / 2) * .65;
          const wave = Math.sin(p * Math.PI * 7) * .22 * Math.min(1, p * 3);
          parts.armR.rotation.z = raise + wave;
          parts.armR.rotation.x = Math.sin(p * Math.PI * 7) * .18;
        }
      } else {
        parts.armR.rotation.z = damp(parts.armR.rotation.z, Math.sin(t * 1.3) * .045, 6, dt);
        parts.armR.rotation.x = damp(parts.armR.rotation.x, 0, 6, dt);
      }
      parts.armL.rotation.z = Math.sin(t * 1.25 + 1) * .05;
      parts.armL.rotation.x = Math.cos(t * 1.1) * .03;

      parts.highlight.material.opacity = .8 + Math.sin(t * 2) * .06;
    } else {
      if (state.customHead) {
        state.customHead.rotation.y = bodyYaw.value;
        state.customHead.rotation.x = bodyPitch.value;
      } else {
        state.custom.rotation.y = MODEL.yRotation + bodyYaw.value * .32;
        state.custom.rotation.x = bodyPitch.value * .25;
      }
      if (state.customEyes.length) {
        for (const eye of state.customEyes) {
          eye.rotation.y = damp(eye.rotation.y, clamp(targetX * .32, -.4, .4), 9, dt);
          eye.rotation.x = damp(eye.rotation.x, clamp(-targetY * .24, -.3, .3), 9, dt);
        }
      }
    }

    let hopY = 0;
    let squash = 0;
    if (state.hopStart > 0) {
      const p = (now - state.hopStart) / 620;
      if (p >= 1) state.hopStart = -1;
      else {
        hopY = Math.sin(Math.PI * p) * .34;
        squash = Math.sin(Math.PI * p) * .05;
      }
    }

    let tourX = 0;
    let tourY = 0;
    let tourSquash = 0;
    if (!state.reduced) {
      const c = t % STAGE.cycle;
      const hopTo = (fromX, fromY, toX, toY, p) => {
        tourX = THREE.MathUtils.lerp(fromX, toX, p);
        tourY = THREE.MathUtils.lerp(fromY, toY, p) + Math.sin(Math.PI * p) * STAGE.hop;
        tourSquash = Math.sin(Math.PI * p) * .055;
      };
      if (c < 1.6) {
        tourX = -STAGE.containerX;
        tourY = STAGE.containerRootY;
      } else if (c < 2.6) {
        hopTo(-STAGE.containerX, STAGE.containerRootY, 0, STAGE.floorRootY, c - 1.6);
      } else if (c < 4.2) {
        tourX = 0;
        tourY = STAGE.floorRootY;
      } else if (c < 5.2) {
        hopTo(0, STAGE.floorRootY, STAGE.containerX, STAGE.containerRootY, c - 4.2);
      } else if (c < 6.8) {
        tourX = STAGE.containerX;
        tourY = STAGE.containerRootY;
      } else if (c < 7.8) {
        hopTo(STAGE.containerX, STAGE.containerRootY, 0, STAGE.floorRootY, c - 6.8);
      } else if (c < 9.4) {
        tourX = 0;
        tourY = STAGE.floorRootY;
      } else if (c < 10.4) {
        hopTo(0, STAGE.floorRootY, -STAGE.containerX, STAGE.containerRootY, c - 9.4);
      } else {
        tourX = -STAGE.containerX;
        tourY = STAGE.containerRootY;
      }
      squash = Math.max(squash, tourSquash);
    }

    bot.position.x = state.reduced ? 0 : tourX;
    bot.position.y = hopY + (state.reduced ? STAGE.floorRootY : tourY + Math.sin(t * 1.2) * .015);
    const targetScale = 1 + squash;
    bot.scale.x = damp(bot.scale.x, CHAR_SCALE * targetScale, 14, dt);
    bot.scale.z = damp(bot.scale.z, CHAR_SCALE * targetScale, 14, dt);
    bot.scale.y = damp(bot.scale.y, CHAR_SCALE * (1 - squash), 14, dt);

    if (state.mood === 'happy' && now > state.moodUntil) state.mood = 'idle';

    let alive = false;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      if (particleLife[i] <= 0) continue;
      alive = true;
      particleLife[i] -= dt * .85;
      particlePos[i * 3] += particleVel[i * 3] * dt;
      particlePos[i * 3 + 1] += particleVel[i * 3 + 1] * dt;
      particlePos[i * 3 + 2] += particleVel[i * 3 + 2] * dt;
      particleVel[i * 3 + 1] -= 1.6 * dt;
    }
    if (alive) {
      particleGeo.attributes.position.needsUpdate = true;
      particleMat.opacity = Math.max(0, particleMat.opacity - dt * .9);
    } else {
      particleMat.opacity = 0;
    }
  }

  function frame(now) {
    if (state.paused || !state.visible) return;
    const dt = Math.min((now - prevTime) / 1000, .05);
    prevTime = now;
    update(dt, now, now / 1000);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (raf) return;
    prevTime = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    cancelAnimationFrame(raf);
    raf = 0;
  }

  update(.016, performance.now(), 0);
  renderer.render(scene, camera);
  stage.classList.add('is-ready');

  if (reducedMotion) state.reduced = true;
  else start();

  const io = new IntersectionObserver(([entry]) => {
    state.visible = entry.isIntersecting;
    if (state.visible && !state.paused && !state.reduced) start();
    else stop();
  }, { threshold: 0 });
  io.observe(stage);

  const onVisibility = () => {
    state.paused = document.hidden;
    if (state.paused) stop();
    else if (state.visible && !state.reduced) start();
  };
  document.addEventListener('visibilitychange', onVisibility);

  const onContextLost = (e) => {
    e.preventDefault();
    stop();
    stage.classList.remove('is-ready');
    stage.classList.add('is-fallback');
  };
  canvas.addEventListener('webglcontextlost', onContextLost, false);

  function setReduced(reduced) {
    state.reduced = reduced;
    particles.visible = !reduced;
    if (reduced) {
      stop();
      particleMat.opacity = 0;
      bodyYaw.reset(0);
      bodyPitch.reset(0);
      leafZ.reset(0);
      leafX.reset(0);
      eyeX.reset(0);
      eyeY.reset(0);
      state.mood = 'idle';
      state.hopStart = -1;
      state.waveStart = -1;
      if (!state.custom) {
        parts.body.rotation.set(0, 0, 0);
        parts.body.position.y = .15;
        parts.leafPivot.rotation.set(0, 0, 0);
        parts.armR.rotation.set(0, 0, 0);
        parts.armL.rotation.set(0, 0, 0);
        bot.position.x = 0;
        bot.position.y = STAGE.floorRootY;
        bot.scale.set(CHAR_SCALE, CHAR_SCALE, CHAR_SCALE);
        drawFace(parts.screenCtx, {});
        parts.screenTexture.needsUpdate = true;
      } else {
        state.custom.rotation.set(0, MODEL.yRotation, 0);
        if (state.customHead) state.customHead.rotation.set(0, 0, 0);
        if (state.customEyes.length) state.customEyes.forEach((eye) => eye.rotation.set(0, 0, 0));
      }
      update(.016, performance.now(), 0);
      renderer.render(scene, camera);
    } else if (state.visible && !state.paused) {
      start();
    }
  }

  function destroy() {
    stop();
    io.disconnect();
    resizeObserver.disconnect();
    window.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerleave', onPointerLeave);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('click', onCanvasClick);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    renderer.dispose();
    pmrem.dispose();
    envRT.dispose();
    scene.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) {
        const m = o.material;
        if (Array.isArray(m)) m.forEach((x) => x.dispose());
        else m.dispose();
      }
    });
  }

  return { react, setReduced, destroy };
}
