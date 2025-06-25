import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { QuantumParameters, BuddhistParameters } from '../types';

interface QuantumFieldProps {
  quantum: QuantumParameters;
  buddhist: BuddhistParameters;
}

function QuantumParticles({ quantum, buddhist }: QuantumFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 5000;

  // Создаем позиции частиц с учетом буддийских принципов
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      // Основа на пустоте (शून्यता) - частицы появляются из ничего
      const emptyness = buddhist.emptiness;
      const radius = 10 + emptyness * 5;
      
      // Взаимозависимость (प्रतीत्यसमुत्पाद) влияет на связанность
      const interdep = buddhist.interdependence;
      
      // Случайные позиции с влиянием параметров
      positions[i * 3] = (Math.random() - 0.5) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * radius;
      positions[i * 3 + 2] = (Math.random() - 0.5) * radius;
    }
    
    return positions;
  }, [buddhist.emptiness, buddhist.interdependence]);

  // Анимация частиц
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const points = pointsRef.current;
    
    // Суперпозиция создает волновое движение
    const superpositionWave = Math.sin(time * quantum.superposition * 2) * 0.5;
    
    // Запутанность создает корреляции между частицами
    const entanglementFactor = quantum.entanglement;
    
    // Эффект наблюдателя влияет на определенность позиций
    const observerEffect = quantum.observerEffect;
    
    // Неопределенность создает случайные флуктуации
    const uncertainty = quantum.uncertainty;
    
    // Буддийское дыхание - пульсация основанная на осознанности
    const mindfulBreath = Math.sin(time * buddhist.mindfulness * 0.5) * 0.3 + 1;
    
    // Обновляем позиции частиц
    const positions = points.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Квантовые флуктуации
      positions[i3] += (Math.random() - 0.5) * uncertainty * 0.01;
      positions[i3 + 1] += (Math.random() - 0.5) * uncertainty * 0.01;
      positions[i3 + 2] += (Math.random() - 0.5) * uncertainty * 0.01;
      
      // Волновое движение суперпозиции
      positions[i3 + 1] += superpositionWave * 0.1;
      
      // Запутанность - частицы влияют друг на друга
      if (i > 0 && entanglementFactor > 0.5) {
        const prevI3 = (i - 1) * 3;
        positions[i3] += (positions[prevI3] - positions[i3]) * entanglementFactor * 0.001;
      }
      
      // Буддийское дыхание
      const scale = mindfulBreath;
      positions[i3] *= scale;
      positions[i3 + 1] *= scale;
      positions[i3 + 2] *= scale;
    }
    
    points.geometry.attributes.position.needsUpdate = true;
    
    // Вращение всего поля основанное на сострадании
    points.rotation.y += buddhist.compassion * 0.001;
    points.rotation.x += buddhist.karma * 0.0005;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={`hsl(${200 + quantum.superposition * 60}, 70%, ${50 + buddhist.emptiness * 30}%)`}
        size={0.02 + quantum.observerEffect * 0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6 + buddhist.mindfulness * 0.3}
      />
    </Points>
  );
}

export default function QuantumField({ quantum, buddhist }: QuantumFieldProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 60 }}
      style={{ 
        background: `linear-gradient(135deg, 
          rgba(26, 35, 126, 0.9) 0%, 
          rgba(40, 53, 147, 0.8) 50%, 
          rgba(186, 104, 200, 0.7) 100%)`
      }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <QuantumParticles quantum={quantum} buddhist={buddhist} />
    </Canvas>
  );
} 