import * as variants from './variants';

type Variants = keyof typeof variants;

interface ITypographyProps {
  children: React.ReactNode;
  variant: Variants;
}

export function Typography({ variant, children, ...props }: ITypographyProps) {
  const Component = variants[variant] || 'p';
  return <Component {...props}>{children}</Component>;
}
