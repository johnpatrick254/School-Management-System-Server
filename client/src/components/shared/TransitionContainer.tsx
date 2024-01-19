"use client";
import { useRef } from "react";
import { useInView } from "framer-motion";
import React from "react"
type TransitionVariant = "LEFT" | "RIGHT" | "TOP"
const TransitionContainer: React.FC<{ children: React.ReactNode, variant: TransitionVariant, className?: string, id?: string, delay?: number }> = ({ children, variant, className, id, delay = 1000 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  let transformInViewClass = "";
  let transformClass = "";

  switch (variant) {
    case "TOP":
      transformClass = "translate-y-[150px]";
      transformInViewClass = "translate-y-[0]"
      break;
    case "LEFT":
      transformClass = "translate-x-[-200px]";
      transformInViewClass = "translate-x-[0px]"
      break;
    case "RIGHT":
      transformClass = "translate-x-[200px]";
      transformInViewClass = "translate-x-[0]"
      break;
    default:
      break;
  }

  const combinedClassName = `${className || ''} transition-all transform ${isInView ? transformInViewClass : transformClass}  transition duration-1000 ease-in-out delay-${delay}`;

  return (
    <div
      ref={ref}
      id={id}
      className={combinedClassName.trim()}
    >
      {children}
    </div>
  );
};

export default TransitionContainer;
