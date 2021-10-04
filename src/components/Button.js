import './Button.css'
const Button = ({ onPress, text, className }) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a className={className} onClick={onPress}>
        {text}
    </a>
);

export default Button;