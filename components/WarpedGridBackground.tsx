'use client'

'use client'

// components/WarpedGridBackground.tsx

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 🌟 SHADER CHO HIỆU ỨNG ĐIỂM SÁNG TRẮNG 🌟

const vertexShader = `
    uniform float time;
    uniform float scrollProgress;
    varying vec2 vUv;
    varying float vZ;

    // Simple noise function (for demonstration)
    float noise(vec2 co) {
        return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
        vUv = uv;
        vec3 pos = position;

        // Base noise to create waves (influenced by time and position)
        float displacement = sin(pos.x * 0.5 + time * 0.5) * cos(pos.y * 0.5 + time * 0.3) * 0.5;
        
        // Add subtle rotation/swirl based on distance from center
        float dist = length(pos.xy);
        float swirl = sin(dist * 0.5 + time * 0.8) * 0.2;

        // Apply displacement to Z axis (height)
        pos.z += displacement + swirl;

        // Dynamic Z offset based on scroll to create a sense of depth change
        pos.z += scrollProgress * 3.0;
        
        vZ = pos.z;

        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

        // *** ĐIỀU CHỈNH CHO HIỂN THỊ ĐIỂM ***
        gl_PointSize = 1.5; // Đặt kích thước cơ bản của điểm (có thể tăng/giảm)
        
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const fragmentShader = `
    uniform float time;
    varying vec2 vUv;
    varying float vZ;

    void main() {
        // *** ĐIỀU CHỈNH CHO ĐIỂM SÁNG TRẮNG ***
        vec3 color = vec3(0.5, 0.9, 1.0); // Màu xanh nhạt
        float alpha = 1.0;

        // Tùy chọn: Giảm alpha (làm mờ) khi điểm quá gần hoặc quá xa (dựa trên vZ)
        alpha = 1.0 - smoothstep(5.0, 15.0, abs(vZ)); 
        
        gl_FragColor = vec4(color, alpha);
    }
`;


const WarpedGridBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SETUP ---
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.015); // Fog vẫn hoạt động tốt với điểm
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 5, 20); // Looking down slightly

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- POINTS OBJECT ---
        // Sử dụng PlaneGeometry với nhiều segment để tạo ra nhiều điểm
        const geometry = new THREE.PlaneGeometry(100, 100, 150, 150); // 150x150 = 22,500 điểm
        
        const uniforms = {
            time: { value: 0.0 },
            scrollProgress: { value: 0.0 }
        };

        // CODE ĐÃ FIX LỖI:
        const material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader, 
            transparent: true,
            blending: THREE.AdditiveBlending, 
            depthWrite: false, 
        }); 
        (material as any).isPoints = true;

        // *** THAY THẾ: Dùng THREE.Points thay vì THREE.Mesh ***
        const grid = new THREE.Points(geometry, material);
        grid.rotation.x = -Math.PI / 2; // Lay flat on the X-Z plane
        scene.add(grid);

        // --- SCROLL ANIMATION (GSAP) ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
                onUpdate: (self) => {
                    uniforms.scrollProgress.value = self.progress * 2.0; 
                    
                    // Thêm thay đổi vị trí camera khi cuộn
                    camera.position.y = 5 - self.progress * 5; 
                    camera.position.z = 20 - self.progress * 15; 
                }
            }
        });

        // Interface Card Animation (giữ lại logic từ component cũ)
        gsap.to("#interface-card", {
            opacity: 1,
            y: 0,  
            // scrollTrigger: {
            //     trigger: "#simulation",
            //     start: "top 60%",
            //     end: "center center",
            //     toggleActions: "play reverse play reverse"
            // }
        });


        // --- RENDER LOOP ---
        const clock = new THREE.Clock();
        let animationFrameId: number;

        function tick() {
            const elapsedTime = clock.getElapsedTime();
            uniforms.time.value = elapsedTime; 
            
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(tick);
        }

        tick();

        // --- RESPONSIVE HANDLER ---
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };

        window.addEventListener('resize', handleResize);

        // --- CLEANUP ---
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div id="canvas-container" ref={containerRef} className="fixed top-0 left-0 w-full h-screen z-0 outline-none pointer-events-none">
            {/* Three.js canvas will be injected here */}
        </div>
    );
};

export default WarpedGridBackground;