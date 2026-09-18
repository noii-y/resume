/**
 * 3D 背景场景 - Three.js
 * 包含粒子系统、浮动几何体、鼠标交互
 */

class ThreeScene {
    constructor() {
        this.canvas = document.getElementById('bg-canvas');
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.particles = null;
        this.floatingShapes = [];
        this.mouse = { x: 0, y: 0 };
        this.targetMouse = { x: 0, y: 0 };
        this.clock = new THREE.Clock();
        this.isInitialized = false;
        
        this.init();
    }

    init() {
        // 场景
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.FogExp2(0x0a0a1a, 0.0008);

        // 相机
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            2000
        );
        this.camera.position.z = 500;

        // 渲染器
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x0a0a1a, 1);

        // 创建粒子系统
        this.createParticles();
        
        // 创建浮动几何体
        this.createFloatingShapes();
        
        // 创建连接线
        this.createConnections();

        // 事件监听
        window.addEventListener('resize', () => this.onResize());
        window.addEventListener('mousemove', (e) => this.onMouseMove(e));
        window.addEventListener('scroll', () => this.onScroll());

        this.isInitialized = true;
        this.animate();
    }

    createParticles() {
        const particleCount = 3000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const color1 = new THREE.Color(0x6366f1); // 靛蓝
        const color2 = new THREE.Color(0x8b5cf6); // 紫色
        const color3 = new THREE.Color(0x06b6d4); // 青色

        for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            
            // 随机位置 - 球形分布
            const radius = Math.random() * 800;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            
            positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i3 + 2] = radius * Math.cos(phi);

            // 随机颜色
            const colorChoice = Math.random();
            let color;
            if (colorChoice < 0.4) color = color1;
            else if (colorChoice < 0.7) color = color2;
            else color = color3;

            colors[i3] = color.r;
            colors[i3 + 1] = color.g;
            colors[i3 + 2] = color.b;

            sizes[i] = Math.random() * 3 + 1;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // 自定义着色器材质
        const material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                pixelRatio: { value: this.renderer.getPixelRatio() }
            },
            vertexShader: `
                attribute float size;
                attribute vec3 color;
                varying vec3 vColor;
                uniform float time;
                uniform float pixelRatio;
                
                void main() {
                    vColor = color;
                    vec3 pos = position;
                    
                    // 波动效果
                    pos.x += sin(time * 0.5 + position.y * 0.01) * 10.0;
                    pos.y += cos(time * 0.3 + position.x * 0.01) * 10.0;
                    
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = size * pixelRatio * (300.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                
                void main() {
                    // 圆形粒子
                    float dist = length(gl_PointCoord - vec2(0.5));
                    if (dist > 0.5) discard;
                    
                    // 光晕效果
                    float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                    alpha = pow(alpha, 1.5);
                    
                    gl_FragColor = vec4(vColor, alpha * 0.8);
                }
            `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.particles = new THREE.Points(geometry, material);
        this.scene.add(this.particles);
    }

    createFloatingShapes() {
        const shapes = [
            { type: 'icosahedron', color: 0x6366f1, size: 25, pos: [-200, 100, -100] },
            { type: 'torus', color: 0x8b5cf6, size: 30, pos: [250, -50, -150] },
            { type: 'octahedron', color: 0x06b6d4, size: 20, pos: [-150, -150, 50] },
            { type: 'tetrahedron', color: 0xec4899, size: 22, pos: [180, 150, -80] },
            { type: 'dodecahedron', color: 0x10b981, size: 18, pos: [0, 200, -200] },
            { type: 'torusKnot', color: 0xf59e0b, size: 15, pos: [-250, 50, 100] }
        ];

        shapes.forEach((shape, index) => {
            let geometry;
            switch (shape.type) {
                case 'icosahedron':
                    geometry = new THREE.IcosahedronGeometry(shape.size, 0);
                    break;
                case 'torus':
                    geometry = new THREE.TorusGeometry(shape.size, shape.size * 0.3, 16, 100);
                    break;
                case 'octahedron':
                    geometry = new THREE.OctahedronGeometry(shape.size, 0);
                    break;
                case 'tetrahedron':
                    geometry = new THREE.TetrahedronGeometry(shape.size, 0);
                    break;
                case 'dodecahedron':
                    geometry = new THREE.DodecahedronGeometry(shape.size, 0);
                    break;
                case 'torusKnot':
                    geometry = new THREE.TorusKnotGeometry(shape.size * 0.6, shape.size * 0.2, 100, 16);
                    break;
            }

            const material = new THREE.MeshBasicMaterial({
                color: shape.color,
                wireframe: true,
                transparent: true,
                opacity: 0.4
            });

            const mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(...shape.pos);
            mesh.userData = {
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.01,
                    y: (Math.random() - 0.5) * 0.01,
                    z: (Math.random() - 0.5) * 0.01
                },
                floatSpeed: Math.random() * 0.5 + 0.5,
                floatOffset: Math.random() * Math.PI * 2,
                baseY: shape.pos[1]
            };

            this.floatingShapes.push(mesh);
            this.scene.add(mesh);
        });
    }

    createConnections() {
        // 创建中心几何体
        const centralGeometry = new THREE.IcosahedronGeometry(60, 1);
        const centralMaterial = new THREE.MeshBasicMaterial({
            color: 0x6366f1,
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        this.centralShape = new THREE.Mesh(centralGeometry, centralMaterial);
        this.centralShape.position.set(0, 0, -200);
        this.scene.add(this.centralShape);

        // 围绕中心的小点
        const orbitPoints = [];
        const orbitCount = 20;
        for (let i = 0; i < orbitCount; i++) {
            const angle = (i / orbitCount) * Math.PI * 2;
            const radius = 120;
            orbitPoints.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius * 0.5,
                z: -200 + Math.sin(angle * 2) * 30,
                speed: 0.005 + Math.random() * 0.01
            });
        }

        this.orbitPoints = orbitPoints;
    }

    onMouseMove(event) {
        this.targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    onScroll() {
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollY / maxScroll;
        
        // 根据滚动调整相机
        this.camera.position.z = 500 + scrollProgress * 300;
        this.camera.position.y = -scrollProgress * 100;
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        const elapsedTime = this.clock.getElapsedTime();

        // 平滑鼠标跟随
        this.mouse.x += (this.targetMouse.x - this.mouse.x) * 0.05;
        this.mouse.y += (this.targetMouse.y - this.mouse.y) * 0.05;

        // 更新粒子
        if (this.particles) {
            this.particles.rotation.y = elapsedTime * 0.02;
            this.particles.rotation.x = this.mouse.y * 0.1;
            this.particles.material.uniforms.time.value = elapsedTime;
        }

        // 更新浮动几何体
        this.floatingShapes.forEach((shape, index) => {
            shape.rotation.x += shape.userData.rotationSpeed.x;
            shape.rotation.y += shape.userData.rotationSpeed.y;
            shape.rotation.z += shape.userData.rotationSpeed.z;
            
            // 浮动效果
            shape.position.y = shape.userData.baseY + 
                Math.sin(elapsedTime * shape.userData.floatSpeed + shape.userData.floatOffset) * 20;
            
            // 鼠标影响
            shape.position.x += this.mouse.x * 5;
        });

        // 更新中心几何体
        if (this.centralShape) {
            this.centralShape.rotation.x = elapsedTime * 0.1;
            this.centralShape.rotation.y = elapsedTime * 0.15;
            this.centralShape.scale.setScalar(1 + Math.sin(elapsedTime * 0.5) * 0.1);
        }

        // 相机轻微跟随鼠标
        this.camera.position.x += (this.mouse.x * 50 - this.camera.position.x) * 0.02;
        this.camera.position.y += (this.mouse.y * 30 - this.camera.position.y) * 0.02;
        this.camera.lookAt(this.scene.position);

        this.renderer.render(this.scene, this.camera);
    }
}

// 初始化场景
window.addEventListener('DOMContentLoaded', () => {
    if (typeof THREE !== 'undefined') {
        new ThreeScene();
    } else {
        console.error('Three.js not loaded');
    }
});
