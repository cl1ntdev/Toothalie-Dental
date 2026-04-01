import React from 'react';
import { motion } from 'framer-motion';

export default function TypingText({ 
  text, 
  className = '', 
  delay = 0 
}: { 
  text: string, 
  className?: string, 
  delay?: number 
}) {
  const words = text.split(' ');
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: 0.08,
          }
        }
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, filter: 'blur(4px)', y: 5 },
            visible: { opacity: 1, filter: 'blur(0px)', y: 0, transition: { duration: 0.4 } }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
