'use client'


// components/EvolvingNeuralNetworkBackground.tsx

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- Cấu hình Mạng Lưới ---
const NUM_NODES = 100;
const MAX_DISTANCE = 3; // Khoảng cách tối đa để hai điểm có thể nối với nhau
const NODE_AREA = 15;   // Phạm vi không gian của mạng lưới

const EvolvingNeuralNetworkBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SETUP THREE.JS ---
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.03); // Sương mù để tạo chiều sâu

        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 30);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- TẠO CÁC ĐIỂM (NODES) ---
        const nodePositions = new Float32Array(NUM_NODES * 3);
        const nodeVelocities = new Float32Array(NUM_NODES * 3);
        const colorRose = new THREE.Color(0xf43f5e);
        const colorBlue = new THREE.Color(0x38bdf8);
        const nodeColors = new Float32Array(NUM_NODES * 3);
        
        const nodes: { position: THREE.Vector3, velocity: THREE.Vector3, color: THREE.Color }[] = [];

        for (let i = 0; i < NUM_NODES; i++) {
            const x = (Math.random() - 0.5) * NODE_AREA * 2;
            const y = (Math.random() - 0.5) * NODE_AREA * 2;
            const z = (Math.random() - 0.5) * NODE_AREA * 2;

            nodePositions[i * 3 + 0] = x;
            nodePositions[i * 3 + 1] = y;
            nodePositions[i * 3 + 2] = z;

            nodeVelocities[i * 3 + 0] = (Math.random() - 0.5) * 0.01;
            nodeVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
            nodeVelocities[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
            
            // Xen kẽ màu hồng và xanh lam
            const color = i % 2 === 0 ? colorRose : colorBlue;
            nodeColors[i * 3 + 0] = color.r;
            nodeColors[i * 3 + 1] = color.g;
            nodeColors[i * 3 + 2] = color.b;
            
            nodes.push({
                position: new THREE.Vector3(x, y, z),
                velocity: new THREE.Vector3(nodeVelocities[i * 3 + 0], nodeVelocities[i * 3 + 1], nodeVelocities[i * 3 + 2]),
                color: color
            });
        }

        const nodesGeometry = new THREE.BufferGeometry();
        nodesGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
        nodesGeometry.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
        
        const nodesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            vertexColors: true,
            transparent: true,
            sizeAttenuation: true // Giúp các điểm xa trông nhỏ hơn
        });
        const points = new THREE.Points(nodesGeometry, nodesMaterial);
        scene.add(points);

        // --- TẠO CÁC ĐƯỜNG NỐI (LINES) ---
        // Chúng ta sẽ cập nhật các đường nối này liên tục
        const maxLines = NUM_NODES * (NUM_NODES - 1) / 2; // Số đường nối tối đa (quá nhiều, chỉ dùng cho kích thước buffer)
        const linePositions = new Float32Array(maxLines * 6);
        const lineColors = new Float32Array(maxLines * 6);

        const linesGeometry = new THREE.BufferGeometry();
        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
        linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

        const linesMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.5,
            depthWrite: false // Quan trọng để đường nối không bị cắt nhau
        });
        const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(lines);
        
        // --- SCROLL ANIMATION (GSAP) ---
        const cameraInitialZ = camera.position.z;
        const cameraInitialY = camera.position.y;
        
        gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
                onUpdate: (self) => {
                    // Zoom vào/lùi ra khi cuộn
                    camera.position.z = cameraInitialZ - self.progress * 15;
                    camera.rotation.y = self.progress * Math.PI * 0.5; // Xoay nhẹ nhàng
                }
            }
        });

        gsap.to("#interface-card", {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: "#simulation",
                start: "top 60%",
                end: "center center",
                toggleActions: "play reverse play reverse"
            }
        });


        // --- RENDER LOOP (Animation Logic) ---
        const clock = new THREE.Clock();
        let animationFrameId: number;

        function updateNeuralNetwork(time: number) {
            let lineIndex = 0;
            const linePositionAttribute = linesGeometry.attributes.position as THREE.BufferAttribute;
            const lineColorAttribute = linesGeometry.attributes.color as THREE.BufferAttribute;

            // 1. Cập nhật vị trí điểm (Nodes movement)
            for (let i = 0; i < NUM_NODES; i++) {
                const node = nodes[i];
                
                // Di chuyển theo vận tốc
                node.position.add(node.velocity);
                
                // Phản hồi khi chạm biên (tạo chuyển động "hữu cơ" trong box)
                if (Math.abs(node.position.x) > NODE_AREA) node.velocity.x *= -1;
                if (Math.abs(node.position.y) > NODE_AREA) node.velocity.y *= -1;
                if (Math.abs(node.position.z) > NODE_AREA) node.velocity.z *= -1;
                
                // Cập nhật vị trí trong buffer geometry của Points
                nodePositions[i * 3 + 0] = node.position.x;
                nodePositions[i * 3 + 1] = node.position.y;
                nodePositions[i * 3 + 2] = node.position.z;
            }
            nodesGeometry.attributes.position.needsUpdate = true;

            // 2. Tạo đường nối (Line Connections)
            for (let i = 0; i < NUM_NODES; i++) {
                for (let j = i + 1; j < NUM_NODES; j++) {
                    const dist = nodes[i].position.distanceTo(nodes[j].position);
                    
                    if (dist < MAX_DISTANCE) {
                        // Tính toán độ mờ (opacity) dựa trên khoảng cách (gần hơn thì nét hơn)
                        const alpha = 1.0 - (dist / MAX_DISTANCE);
                        
                        // Lấy màu gốc (giả sử đường nối lấy màu trung bình hoặc của Node 1)
                        const color = nodes[i].color;

                        // Điểm 1
                        linePositionAttribute.setXYZ(lineIndex * 2, nodes[i].position.x, nodes[i].position.y, nodes[i].position.z);
                        lineColorAttribute.setXYZ(lineIndex * 2, color.r * alpha, color.g * alpha, color.b * alpha);

                        // Điểm 2
                        linePositionAttribute.setXYZ(lineIndex * 2 + 1, nodes[j].position.x, nodes[j].position.y, nodes[j].position.z);
                        lineColorAttribute.setXYZ(lineIndex * 2 + 1, color.r * alpha, color.g * alpha, color.b * alpha);

                        lineIndex++;
                    }
                }
            }

            // Cập nhật buffer cho LineSegments
            linesGeometry.attributes.position.count = lineIndex * 2;
            linesGeometry.attributes.position.needsUpdate = true;
            linesGeometry.attributes.color.count = lineIndex * 2;
            linesGeometry.attributes.color.needsUpdate = true;
        }

        function tick() {
            const elapsedTime = clock.getElapsedTime();
            
            updateNeuralNetwork(elapsedTime); // Logic animation mạng lưới

            // Xoay mạng lưới tổng thể nhẹ nhàng (độc lập với scroll)
            points.rotation.y += 0.001;
            lines.rotation.y += 0.001;
            
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
            nodesGeometry.dispose();
            linesGeometry.dispose();
            nodesMaterial.dispose();
            linesMaterial.dispose();
        };
    }, []);

    return (
        <div id="canvas-container" ref={containerRef} className="fixed top-0 left-0 w-full h-screen z-0 outline-none pointer-events-none">
            {/* Three.js canvas will be injected here */}
        </div>
    );
};

export default EvolvingNeuralNetworkBackground;