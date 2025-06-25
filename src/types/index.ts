export interface QuantumParameters {
  superposition: number; // Уровень суперпозиции (0-1)
  entanglement: number; // Сила запутанности (0-1)
  observerEffect: number; // Эффект наблюдателя (0-1)
  uncertainty: number; // Принцип неопределенности (0-1)
}

export interface BuddhistParameters {
  emptiness: number; // Реализация пустоты - शून्यता (Śūnyatā) (0-1)
  interdependence: number; // Взаимозависимость - प्रतीत्यसमुत्पाद (Pratītyasamutpāda) (0-1)
  karma: number; // Ясность кармы - कर्म (Karma) (0-1)
  compassion: number; // Уровень сострадания - करुणा (Karuṇā) (0-1)
  mindfulness: number; // Глубина осознанности - स्मृति (Smṛti) (0-1)
}

export interface Correlation {
  buddhistParam: keyof BuddhistParameters;
  quantumParam: keyof QuantumParameters;
  strength: number; // Корреляция (0-1)
}

export interface AppState {
  quantum: QuantumParameters;
  buddhist: BuddhistParameters;
  showParameters: boolean;
  animationSpeed: number;
}

export const defaultQuantumParams: QuantumParameters = {
  superposition: 0.5,
  entanglement: 0.5,
  observerEffect: 0.5,
  uncertainty: 0.5,
};

export const defaultBuddhistParams: BuddhistParameters = {
  emptiness: 0.5,
  interdependence: 0.5,
  karma: 0.5,
  compassion: 0.5,
  mindfulness: 0.5,
};

export const correlations: Correlation[] = [
  { buddhistParam: 'emptiness', quantumParam: 'superposition', strength: 0.95 },
  { buddhistParam: 'interdependence', quantumParam: 'entanglement', strength: 0.92 },
  { buddhistParam: 'mindfulness', quantumParam: 'observerEffect', strength: 0.88 },
  { buddhistParam: 'karma', quantumParam: 'uncertainty', strength: 0.85 },
]; 