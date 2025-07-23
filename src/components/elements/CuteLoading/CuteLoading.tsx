'use client';

import { useEffect, useState } from 'react';

const veggieIcons = ['🥕', '🍅', '🌽', '🥦', '🍆', '🍠'];

export default function CuteLoading() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % veggieIcons.length);
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-40 gap-2 text-center animate-fade-in">
      <div className="text-5xl transition-all duration-300">{veggieIcons[index]}</div>
      <p className="text-sm text-oguogu-gray animate-pulse">신선한 농산물을 준비 중이에요...</p>
    </div>
  );
}
