import React from 'react';
import { Box, Typography, LinearProgress, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import { QuantumParameters, BuddhistParameters, correlations } from '../types';

interface CorrelationDisplayProps {
  quantum: QuantumParameters;
  buddhist: BuddhistParameters;
}

export default function CorrelationDisplay({ quantum, buddhist }: CorrelationDisplayProps) {

  const getParameterLabels = () => ({
    // Буддийские
    emptiness: 'शून्यता (Пустота)',
    interdependence: 'प्रतीत्यसमुत्पाद (Взаимозависимость)',
    karma: 'कर्म (Карма)',
    compassion: 'करुणा (Сострадание)',
    mindfulness: 'स्मृति (Осознанность)',
    // Квантовые
    superposition: 'Суперпозиция',
    entanglement: 'Запутанность',
    observerEffect: 'Эффект наблюдателя',
    uncertainty: 'Неопределенность',
  });

  const labels = getParameterLabels();

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" color="info.main" gutterBottom>
        🌌 Активные Корреляции
      </Typography>
      
      {correlations.map((correlation, index) => {
        const buddhistValue = buddhist[correlation.buddhistParam];
        const quantumValue = quantum[correlation.quantumParam];
        const currentCorrelation = Math.abs(buddhistValue - quantumValue);
        const correlationStrength = correlation.strength * (1 - currentCorrelation);
        
        return (
          <motion.div
            key={`${correlation.buddhistParam}-${correlation.quantumParam}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              sx={{ 
                mb: 2, 
                background: 'rgba(40, 53, 147, 0.6)',
                border: `1px solid rgba(79, 195, 247, ${correlationStrength})`,
                boxShadow: `0 0 ${correlationStrength * 20}px rgba(79, 195, 247, 0.3)`,
              }}
            >
              <CardContent sx={{ py: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2" color="secondary" sx={{ fontFamily: 'Noto Sans Devanagari' }}>
                    {labels[correlation.buddhistParam as keyof typeof labels]}
                  </Typography>
                  <Typography variant="body2" color="primary">
                    {labels[correlation.quantumParam as keyof typeof labels]}
                  </Typography>
                </Box>
                
                <LinearProgress
                  variant="determinate"
                  value={correlationStrength * 100}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    background: 'rgba(255, 255, 255, 0.1)',
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, 
                        rgba(255, 183, 77, ${buddhistValue}) 0%, 
                        rgba(186, 104, 200, 0.8) 50%, 
                        rgba(79, 195, 247, ${quantumValue}) 100%)`,
                      borderRadius: 4,
                    },
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Базовая: {Math.round(correlation.strength * 100)}%
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Текущая: {Math.round(correlationStrength * 100)}%
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
      
      {/* Общая гармония */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card sx={{ 
          background: 'linear-gradient(45deg, rgba(79, 195, 247, 0.2), rgba(255, 183, 77, 0.2))',
          border: '1px solid rgba(186, 104, 200, 0.5)',
        }}>
          <CardContent>
            <Typography variant="h6" color="info.main" align="center" gutterBottom>
              ☯️ Гармония Реальностей
            </Typography>
            
            {(() => {
              const totalHarmony = correlations.reduce((sum, correlation) => {
                const buddhistValue = buddhist[correlation.buddhistParam];
                const quantumValue = quantum[correlation.quantumParam];
                const sync = 1 - Math.abs(buddhistValue - quantumValue);
                return sum + (sync * correlation.strength);
              }, 0) / correlations.length;
              
              return (
                <>
                  <LinearProgress
                    variant="determinate"
                    value={totalHarmony * 100}
                    sx={{
                      height: 12,
                      borderRadius: 6,
                      background: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, 
                          #ffb74d 0%, 
                          #ba68c8 50%, 
                          #4fc3f7 100%)`,
                        borderRadius: 6,
                      },
                    }}
                  />
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
                    {Math.round(totalHarmony * 100)}% синхронизация
                  </Typography>
                </>
              );
            })()}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
} 