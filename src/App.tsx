import React, { useState, useCallback } from 'react';
import './App.css';
import { Box, AppBar, Toolbar, Typography, Fab } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import TuneIcon from '@mui/icons-material/Tune';
import SimplerQuantumField from './components/SimplerQuantumField';
import ParameterPanel from './components/ParameterPanel';
import {
  QuantumParameters,
  BuddhistParameters,
  defaultQuantumParams,
  defaultBuddhistParams,
} from './types';

function App() {
  const [quantumParams, setQuantumParams] = useState<QuantumParameters>(defaultQuantumParams);
  const [buddhistParams, setBuddhistParams] = useState<BuddhistParameters>(defaultBuddhistParams);
  const [showParameters, setShowParameters] = useState(false);

  const handleQuantumChange = useCallback((params: Partial<QuantumParameters>) => {
    setQuantumParams(prev => ({ ...prev, ...params }));
  }, []);

  const handleBuddhistChange = useCallback((params: Partial<BuddhistParameters>) => {
    setBuddhistParams(prev => ({ ...prev, ...params }));
  }, []);

  return (
    <Box sx={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Заголовок */}
      <AppBar position="absolute" sx={{ background: 'rgba(26, 35, 126, 0.8)', zIndex: 1000 }}>
        <Toolbar>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Two Truths & Quantum Reality | འགྱུར་བ་དྲུག
            </Typography>
          </motion.div>
        </Toolbar>
      </AppBar>

      {/* Основная область с 3D визуализацией */}
      <Box sx={{ height: '100vh', pt: 8 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{ height: '100%' }}
        >
          <SimplerQuantumField quantum={quantumParams} buddhist={buddhistParams} />
        </motion.div>
      </Box>

      {/* Информационное окно */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            zIndex: 1000,
          }}
        >
          <Box
            sx={{
              background: 'rgba(40, 53, 147, 0.9)',
              backdropFilter: 'blur(10px)',
              p: 3,
              borderRadius: 3,
              maxWidth: 400,
              border: '1px solid rgba(79, 195, 247, 0.3)',
            }}
          >
            <Typography variant="h6" color="primary" gutterBottom>
              🌌 Исследование Единства
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Наблюдайте, как древняя мудрость буддизма и современная квантовая физика 
              раскрывают единую природу реальности.
            </Typography>
            <Typography variant="body2" color="secondary" sx={{ fontFamily: 'Noto Sans Devanagari' }}>
              गते गते पारगते पारसंगते बोधि स्वाहा
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Ушедший, ушедший, ушедший за пределы...
            </Typography>
          </Box>
        </motion.div>
      </AnimatePresence>

      {/* Кнопка параметров */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 200 }}
        style={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          zIndex: 1000,
        }}
      >
        <Fab
          color="primary"
          onClick={() => setShowParameters(true)}
          sx={{
            background: 'linear-gradient(45deg, #4fc3f7, #ba68c8)',
            '&:hover': {
              background: 'linear-gradient(45deg, #29b6f6, #ab47bc)',
            },
          }}
        >
          <TuneIcon />
        </Fab>
      </motion.div>

      {/* Панель параметров */}
      <ParameterPanel
        open={showParameters}
        onClose={() => setShowParameters(false)}
        quantum={quantumParams}
        buddhist={buddhistParams}
        onQuantumChange={handleQuantumChange}
        onBuddhistChange={handleBuddhistChange}
      />

      {/* Космический фон */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(186, 104, 200, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(79, 195, 247, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(255, 183, 77, 0.3) 0%, transparent 50%),
            linear-gradient(135deg, #1a237e 0%, #283593 100%)
          `,
          zIndex: -1,
        }}
      />
    </Box>
  );
}

export default App; 