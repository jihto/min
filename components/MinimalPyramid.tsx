'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface OctahedronCrystalProps {
    /** Kích thước tổng thể của viên tinh thể */
    size?: number;
    /** Màu sắc cơ bản */
    color?: string;
    /** Màu phát sáng (Emissive color) */
    emissiveColor?: string;
    /** Độ phát sáng (0.0 - 1.0) */
    emissiveIntensity?: number;
    /** Độ kéo dài theo trục Y (tỉ lệ > 1.0) */
    scaleY?: number; 
    /** Tốc độ quay quanh trục Y (radians/tick) */
    rotationSpeedY?: number;
}

const OctahedronCrystal: React.FC<OctahedronCrystalProps> = ({
    size = 9.0, 
    color = '#fff', // Màu cơ bản Cyan nhạt
    emissiveColor = '#fff', // Màu phát sáng rực rỡ (Cyan)
    emissiveIntensity = 0.5, // Độ phát sáng trung bình
    scaleY = 2.0, // Kéo dài gấp đôi theo trục Y
    rotationSpeedY = 0.005,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // --- SETUP SCENE ---
        const container = containerRef.current;
        const width = container.clientWidth;
        const heightPx = container.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / heightPx, 0.1, 100);
        // Điều chỉnh vị trí camera để vật thể kéo dài nằm gọn trong khung hình
        camera.position.set(size * 1.5, size / 10, size * 2.5);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        renderer.setSize(width, heightPx);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        
        // --- VẬT THỂ: Tinh Thể 8 Mặt Kéo Dài ---

        // 1. Tạo hình học Octahedron (8 mặt)
        const geometry = new THREE.OctahedronGeometry(size, 0); 
        
        // 2. Vật liệu mới: MeshStandardMaterial (phù hợp cho độ bóng và ánh sáng thực tế hơn)
        const material = new THREE.MeshStandardMaterial({
            color: new THREE.Color(color),
            // Sử dụng màu phát sáng (Emissive) - tạo hiệu ứng lân cận màu Cyan
            emissive: new THREE.Color(emissiveColor), 
            emissiveIntensity: emissiveIntensity,
            metalness: 0.1, // Độ kim loại thấp
            roughness: 0.2, // Độ nhám thấp (rất bóng)
            transparent: true,
            opacity: 0.9,
            flatShading: true // Các mặt phẳng sắc nét
        });

        const crystal = new THREE.Mesh(geometry, material);
        
        // *** ĐIỂM CẬP NHẬT QUAN TRỌNG: SCALING TRỤC Y ***
        crystal.scale.set(1, scaleY, 1);
        
        scene.add(crystal);
        
        // --- THÊM ÁNH SÁNG ---
        // Sử dụng ánh sáng phù hợp với MeshStandardMaterial
        
        // Ánh sáng định hướng chính (Phòng trường hợp ánh sáng chiếu vào phần phát sáng)
        const mainLight = new THREE.DirectionalLight(0xffffff, 2.5);
        mainLight.position.set(size * 2, size * 3, size * 1.5);
        scene.add(mainLight);
        
        // Ánh sáng môi trường
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        // --- RENDER LOOP ---
        let animationFrameId: number;

        const tick = () => {
            
            // Quay quanh trục Y
            crystal.rotation.y += rotationSpeedY; 
            
            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(tick);
        };

        tick();

        // --- RESPONSIVE HANDLER & CLEANUP ---
        const handleResize = () => {
            if (containerRef.current) {
                const newWidth = containerRef.current.clientWidth;
                const newHeight = containerRef.current.clientHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            // Giải phóng bộ nhớ
            geometry.dispose();
            material.dispose();
            mainLight.dispose();
            ambientLight.dispose();
            renderer.dispose();
        };
    }, [size, color, emissiveColor, emissiveIntensity, scaleY, rotationSpeedY]); 

    return (
        <div 
            ref={containerRef} 
            className="w-full h-full min-h-[400px] min-w-[400px]"
        >
            {/* Canvas sẽ được chèn vào đây */}
        </div>
    );
};

export default OctahedronCrystal;