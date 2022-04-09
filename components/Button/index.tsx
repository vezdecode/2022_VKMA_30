import Props from './Button.props';

const Button = ({ children, className = '', ...props }: Props): JSX.Element => {
	return (
		<button
			className={'rounded-2xl font-bold py-3 bg-staticPrimary text-white ' + className}
			{...props}
		>
			{children}
		</button>
	);
};

export default Button;

