'use client';

import React, { useState } from 'react';

interface AnimatedStarfieldProps {
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
    variant?: 'light' | 'dark';
}

export default function AnimatedStarfield({ 
    className = '', 
    intensity = 'medium',
    variant = 'dark' 
}: AnimatedStarfieldProps) {
    const opacityMap = {
        low: { layer1: 0.3, layer2: 0.2, layer3: 0.15 },
        medium: { layer1: 0.5, layer2: 0.35, layer3: 0.25 },
        high: { layer1: 0.7, layer2: 0.5, layer3: 0.35 }
    };

    const opacities = opacityMap[intensity];
    const starColor = variant === 'dark' ? '255,255,255' : '0,0,0';
    const gridColor = variant === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)';
    const glowColor = variant === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';
    const glowColor2 = variant === 'dark' ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)';

    // Generate star positions with brighter stars - using lazy initializer to avoid calling Math.random during render
    const generateStars = (count: number, size: string) => {
        const stars = [];
        for (let i = 0; i < count; i++) {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            // Brighter stars: increased base opacity from 0.5-1.0 to 0.7-1.0
            const opacity = (0.7 + Math.random() * 0.3).toFixed(2);
            stars.push(`radial-gradient(${size} at ${x}% ${y}%, rgba(${starColor},${opacity}), transparent)`);
        }
        return stars.join(', ');
    };

    const [starLayers] = useState<{layer1: string; layer2: string; layer3: string}>(() => ({
        layer1: generateStars(30, '2px 2px'),
        layer2: generateStars(20, '3px 3px'),
        layer3: generateStars(12, '4px 4px')
    }));

    return (
        <>
            <div className={`absolute inset-0 ${className}`}>
                {/* Animated stars layer 1 - small stars */}
                {starLayers.layer1 && (
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: starLayers.layer1,
                            backgroundSize: '200% 200%',
                            animation: 'starMove1 120s linear infinite, starTwinkle 4s ease-in-out infinite',
                            opacity: opacities.layer1
                        }}
                    />
                )}
                
                {/* Animated stars layer 2 - medium stars */}
                {starLayers.layer2 && (
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: starLayers.layer2,
                            backgroundSize: '150% 150%',
                            animation: 'starMove2 100s linear infinite reverse, starTwinkle 5s ease-in-out infinite',
                            opacity: opacities.layer2,
                            animationDelay: '0.5s'
                        }}
                    />
                )}
                
                {/* Animated stars layer 3 - large stars */}
                {starLayers.layer3 && (
                    <div 
                        className="absolute inset-0"
                        style={{
                            backgroundImage: starLayers.layer3,
                            backgroundSize: '120% 120%',
                            animation: 'starMove3 80s linear infinite, starTwinkle 6s ease-in-out infinite',
                            opacity: opacities.layer3,
                            animationDelay: '1s'
                        }}
                    />
                )}
                
                {/* Subtle grid pattern */}
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(${gridColor} 1px, transparent 1px),
                            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px',
                        opacity: 0.3
                    }}
                />
                
                {/* Radial glow effects */}
                <div 
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse"
                    style={{
                        backgroundColor: glowColor
                    }}
                />
                <div 
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl animate-pulse"
                    style={{
                        backgroundColor: glowColor2,
                        animationDelay: '1.5s',
                        animationDuration: '4s'
                    }}
                />
            </div>

            <style jsx>{`
                @keyframes starMove1 {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(100px, 100px);
                    }
                }
                @keyframes starMove2 {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(-80px, -80px);
                    }
                }
                @keyframes starMove3 {
                    0% {
                        transform: translate(0, 0);
                    }
                    100% {
                        transform: translate(60px, 60px);
                    }
                }
                @keyframes starTwinkle {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.3;
                    }
                }
            `}</style>
        </>
    );
}
