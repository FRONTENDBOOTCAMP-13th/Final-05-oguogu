import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    rules: {
      'prefer-const': 'warn', // 변수가 재할당 되지 않는다면 let 대신 const 사용하도록 경고
      'no-redeclare': 1, // 변수 중복 선언시 경고
      // 기타 룰 추가
    },
  },
];

export default eslintConfig;
