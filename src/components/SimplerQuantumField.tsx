import React, { useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { QuantumParameters, BuddhistParameters } from '../types';

interface QuantumFieldProps {
  quantum: QuantumParameters;
  buddhist: BuddhistParameters;
}

export default function SimplerQuantumField({ quantum, buddhist }: QuantumFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = canvas.offsetHeight;

    let animationId: number;
    let time = 0;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    // Создаем частицы
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }

    function animate() {
      if (!ctx) return;
      
      time += 0.01;
      
      // Очищаем канвас
      ctx.fillStyle = `rgba(26, 35, 126, 0.1)`;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        // Квантовые эффекты
        const superpositionWave = Math.sin(time * quantum.superposition * 5 + index * 0.1) * 20;
        const uncertaintyFactor = quantum.uncertainty * 0.5;
        const entanglementPull = quantum.entanglement * 0.3;
        
                 // Буддийские эффекты
         const emptyness = buddhist.emptiness;
         const mindfulBreath = Math.sin(time * buddhist.mindfulness * 2) * 10;

        // Обновляем позицию
        particle.x += particle.vx + Math.sin(time + index) * uncertaintyFactor;
        particle.y += particle.vy + superpositionWave * 0.1 + mindfulBreath * 0.05;

        // Эффект наблюдателя
        particle.alpha = 0.2 + quantum.observerEffect * 0.6 + buddhist.mindfulness * 0.3;

        // Границы
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        // Запутанность между частицами
        if (index > 0 && quantum.entanglement > 0.5) {
          const prevParticle = particles[index - 1];
          particle.x += (prevParticle.x - particle.x) * entanglementPull * 0.01;
          particle.y += (prevParticle.y - particle.y) * entanglementPull * 0.01;
        }

        // Рисуем частицу
        ctx.save();
        ctx.globalAlpha = particle.alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        
        const size = particle.size * (1 + emptyness * 0.5);
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        ctx.fill();

        // Связи между частицами (взаимозависимость)
        if (buddhist.interdependence > 0.7 && index % 10 === 0) {
          const nextParticle = particles[(index + 1) % particles.length];
          ctx.strokeStyle = `rgba(255, 183, 77, ${buddhist.interdependence * 0.3})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(nextParticle.x, nextParticle.y);
          ctx.stroke();
        }

        ctx.restore();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [quantum, buddhist]);

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 50%, rgba(186, 104, 200, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(79, 195, 247, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 183, 77, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #1a237e 0%, #283593 100%)
          `,
        }}
      />
      
      {/* Дополнительные визуальные эффекты */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at ${50 + quantum.superposition * 30}% ${50 + buddhist.emptiness * 30}%, 
            rgba(79, 195, 247, ${quantum.superposition * 0.3}) 0%, transparent 60%),
            radial-gradient(circle at ${30 + buddhist.compassion * 40}% ${70 + quantum.entanglement * 20}%, 
            rgba(255, 183, 77, ${buddhist.compassion * 0.2}) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
} 