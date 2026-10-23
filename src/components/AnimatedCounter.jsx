'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function AnimatedCounter({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    if (!isInView) return;

    // Check if value is numeric or has suffixes like '65+', '8.67', '100%', '38%'
    const match = value.match(/([\d.]+)(.*)/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const targetNum = parseFloat(match[1]);
    const suffix = match[2] || '';
    const isDecimal = match[1].includes('.');
    const decimalPlaces = isDecimal ? match[1].split('.')[1].length : 0;

    let start = 0;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);

      const currentNum = start + (targetNum - start) * ease;
      setDisplayValue(
        isDecimal
          ? currentNum.toFixed(decimalPlaces) + suffix
          : Math.floor(currentNum) + suffix
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{displayValue}</span>;
}
