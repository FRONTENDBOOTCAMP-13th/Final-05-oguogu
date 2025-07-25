'use client';
import { Toaster } from 'react-hot-toast';

export default function ToasterWrapper() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          borderRadius: '12px',
          background: '#FFF9F3',
          color: '#333',
          fontSize: '14px',
          padding: '12px 16px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        },
        success: {
          icon: '🌱',
          style: {
            background: '#E3FBE6',
            color: '#185C1E',
          },
        },
        error: {
          icon: '🥕',
          style: {
            background: '#FFE4E4',
            color: '#9B1C1C',
          },
        },
        loading: {
          icon: '⏳',
          style: {
            background: '#FFF7E1',
            color: '#665200',
          },
        },
      }}
    />
  );
}
