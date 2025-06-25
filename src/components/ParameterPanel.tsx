import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  Slider,
  IconButton,
  Paper,
  Grid,
} from '@mui/material';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import { QuantumParameters, BuddhistParameters } from '../types';
import CorrelationDisplay from './CorrelationDisplay';

interface ParameterPanelProps {
  open: boolean;
  onClose: () => void;
  quantum: QuantumParameters;
  buddhist: BuddhistParameters;
  onQuantumChange: (params: Partial<QuantumParameters>) => void;
  onBuddhistChange: (params: Partial<BuddhistParameters>) => void;
}

const quantumLabels = {
  superposition: 'Суперпозиция',
  entanglement: 'Запутанность',
  observerEffect: 'Эффект наблюдателя',
  uncertainty: 'Неопределенность',
};

const buddhistLabels = {
  emptiness: 'Пустота (शून्यता)',
  interdependence: 'Взаимозависимость (प्रतीत्यसमुत्पाद)',
  karma: 'Карма (कर्म)',
  compassion: 'Сострадание (करुणा)',
  mindfulness: 'Осознанность (स्मृति)',
};

export default function ParameterPanel({
  open,
  onClose,
  quantum,
  buddhist,
  onQuantumChange,
  onBuddhistChange,
}: ParameterPanelProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 400,
          background: 'rgba(40, 53, 147, 0.95)',
          backdropFilter: 'blur(10px)',
        },
      }}
    >
      <Box sx={{ p: 3, height: '100%', overflow: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h5" color="primary">
            Параметры
          </Typography>
          <IconButton onClick={onClose} color="primary">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Квантовые параметры */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Paper sx={{ p: 3, mb: 3, background: 'rgba(79, 195, 247, 0.1)' }}>
            <Typography variant="h6" color="primary" gutterBottom>
              ⚛️ Квантовые Параметры
            </Typography>
            
            <Grid container spacing={3}>
              {Object.entries(quantum).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  <Typography gutterBottom>
                    {quantumLabels[key as keyof QuantumParameters]}
                  </Typography>
                  <Slider
                    value={value}
                    onChange={(_, newValue) =>
                      onQuantumChange({ [key]: newValue as number })
                    }
                    min={0}
                    max={1}
                    step={0.01}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                    sx={{
                      color: '#4fc3f7',
                      '& .MuiSlider-thumb': {
                        background: 'linear-gradient(45deg, #4fc3f7, #ba68c8)',
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Буддийские параметры */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Paper sx={{ p: 3, background: 'rgba(255, 183, 77, 0.1)' }}>
            <Typography variant="h6" color="secondary" gutterBottom>
              🪷 Буддийские Параметры
            </Typography>
            
            <Grid container spacing={3}>
              {Object.entries(buddhist).map(([key, value]) => (
                <Grid item xs={12} key={key}>
                  <Typography gutterBottom sx={{ fontFamily: 'Noto Sans Devanagari' }}>
                    {buddhistLabels[key as keyof BuddhistParameters]}
                  </Typography>
                  <Slider
                    value={value}
                    onChange={(_, newValue) =>
                      onBuddhistChange({ [key]: newValue as number })
                    }
                    min={0}
                    max={1}
                    step={0.01}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
                    sx={{
                      color: '#ffb74d',
                      '& .MuiSlider-thumb': {
                        background: 'linear-gradient(45deg, #ffb74d, #ba68c8)',
                      },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* Корреляции */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CorrelationDisplay quantum={quantum} buddhist={buddhist} />
        </motion.div>
      </Box>
    </Drawer>
  );
} 