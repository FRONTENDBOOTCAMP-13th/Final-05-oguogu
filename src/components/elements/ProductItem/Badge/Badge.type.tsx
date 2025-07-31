export type BadgeTextProps = 'sold' | 'best' | 'inseason' | 'new' | 'lowstock' | 'express' | 'safe';

export default interface BadgeProps {
  type: 'inseason' | 'best' | 'lowstock' | 'sold' | 'new' | 'express' | 'safe';
  size?: number;
}
