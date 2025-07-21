export interface Option {
  label: string;
  value: string;
}

export interface LoginInputProps {
  type: 'text' | 'number' | 'email' | 'password' | 'address' | 'phone' | 'birth';
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  options?: Option[]; //이메일 select용
  id?: string;
}
