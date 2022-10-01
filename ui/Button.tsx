export interface Props {
  className?: string;
  onClick(): void;
  children: any;
  disabled?: boolean;
  name: string;
}

function Button({ className, name, ...props }: Props) {
  return (
    <button
      className={`${name} px-4 py-2 border-2 border-transparent ${className}`}
      {...props}
    />
  );
}

Button.defaultProps = {
  onClick: () => {},
  disabled: false,
  children: "Click me",
};

export default Button;
