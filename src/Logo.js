import React from 'react';
import { motion } from 'framer-motion';

const spin = {
  rotate: 360,
};

export const Logo = ({ src, style, ...props }) => {
  return (
    <motion.img
      initial={false}
      animate={spin}
      transition={{ duration: 20 }}
      src={src}
      style={style}
      {...props}
    />
  );
};

