import React from 'react';
import { motion } from 'framer-motion';
import { AIProcessingPipeline } from '../../features/ai/AIProcessingPipeline';

interface AIProcessingModalProps {
  isOpen: boolean;
  onComplete: () => void;
}

export const AIProcessingModal: React.FC<AIProcessingModalProps> = ({ isOpen, onComplete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-xl"
      >
        <AIProcessingPipeline onComplete={onComplete} />
      </motion.div>
    </div>
  );
};
