interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
}

export const Button = ({ variant = 'primary', children, ...props }: Props) => {
  const className = `btn btn-${variant} ${props.className || ''}`;
  return <button {...props} className={className}>{children}</button>;
};