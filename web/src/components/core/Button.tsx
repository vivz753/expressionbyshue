interface ButtonProps {
  disabled?: boolean;
  onClick?: any; // function
  children?: any; // React children type? 
}
const Button: React.FC = (props: ButtonProps) => {
return (
  <button
    disabled={props.disabled}
    onClick={props.onClick}
  >
    {props.children}
  </button>
)
}

export default Button;
