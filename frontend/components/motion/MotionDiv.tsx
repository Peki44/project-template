"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface MotionDivProps extends HTMLMotionProps<"div"> {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof motion;
}

export function MotionDiv({
  children,
  delay = 0,
  className = "",
  as,
  ...rest
}: MotionDivProps) {
  const Component = as ? (motion as any)[as] : motion.div;

  return (
    <Component
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default MotionDiv;
