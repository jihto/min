

'use client'


// components/VortexSimulation.tsx

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VortexSimulation: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const atomGroupRef = useRef<THREE.Group | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SETUP ---
        const container = containerRef.current;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.035);
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 9);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // --- ATOMIC MODEL (Chỉ giữ lại Hạt nhân) ---
        const atomGroup = new THREE.Group();
        atomGroupRef.current = atomGroup;
        scene.add(atomGroup);

        // 1. The Nucleus (Red Wireframe)
        const nucleusGeo = new THREE.IcosahedronGeometry(1.2, 2);
        const nucleusMat = new THREE.MeshBasicMaterial({
            color: 0xf43f5e, // Màu đỏ hồng
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
        atomGroup.add(nucleus); // Quả cầu màu đỏ

        // Initial setup for responsiveness
        const setInitialScale = () => {
             const scale = window.innerWidth < 768 ? 0.6 : 1;
             atomGroup.scale.set(scale, scale, scale);
        }
        setInitialScale();

        // --- SCROLL ANIMATION (GSAP) ---
        // Giữ lại animation tổng thể theo scroll
        atomGroup.rotation.z = 0.2;
        atomGroup.rotation.x = 0.2;

        const masterTl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        });

        masterTl.to(atomGroup.position, { x: -3.5, z: -2, duration: 2, ease: "power1.inOut" }, 0)
                .to(atomGroup.rotation, { x: 1, y: 1, duration: 2, ease: "power1.inOut" }, 0);

        masterTl.to({}, { duration: 1.5 });

        masterTl.to(atomGroup.position, { x: 0, y: 0, z: 1, duration: 2, ease: "power1.inOut" })
                .to(atomGroup.rotation, { x: 0, y: 0, z: Math.PI / 2, duration: 2, ease: "power1.inOut" })
                .to(atomGroup.scale, { x: 1.3, y: 1.3, z: 1.3, duration: 2 });

        masterTl.to({}, { duration: 1 });

        masterTl.to(atomGroup.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 2, ease: "power2.in" })
                .to(atomGroup.position, { y: 2, duration: 2 }, "<");

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

        // --- RENDER LOOP ---
        let animationFrameId: number;

        function tick() {
            // Continuous gentle rotation (giữ lại logic này)
            // Quả cầu màu đỏ (nucleus) là một phần của atomGroup, nên xoay atomGroup là đủ.
            atomGroup.rotation.y += 0.002;
            
            // ĐÃ LOẠI BỎ: Nucleus pulse: 
            // const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
            // nucleus.scale.set(scale, scale, scale);

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
            
            setInitialScale();
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
        };
    }, []);

    return (
        <div id="canvas-container" ref={containerRef} className="fixed top-0 left-0 w-full h-screen z-0 outline-none pointer-events-none">
            {/* Three.js canvas will be injected here */}
        </div>
    );
};

export default VortexSimulation;