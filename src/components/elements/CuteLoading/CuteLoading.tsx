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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="text-6xl animate-fade-in">{veggieIcons[index]}</div>
      <p className="mt-4 text-sm text-oguogu-gray animate-pulse">신선한 농산물을 준비 중이에요...</p>
    </div>
  );
}
