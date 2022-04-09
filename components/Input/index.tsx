import { useState } from 'react';
import { Props } from './Input.props';
import { getAdditionalStyles } from './Input.styles';

const Input = ({ 
	isDanger, 
	name, 
	value, 
	className='', 
	placeholder, 
	...props 
}: Props): JSX.Element => {
	const [isFocus, setIsFocus] = useState<boolean>(false);

	const onFocusOnBlur: any = {
		onFocus: () => setIsFocus(true),
		onBlur: () => setIsFocus(false),
	};
	
	return (
		<div className={className + ' relative h-[4.25rem]'}>
			<label 
				htmlFor={name} 
				className={'absolute z-10 text-darkGray left-5 duration-200' + ((isFocus || value) ? ' mt-3 text-xs':' mt-5')} 
			>
				{placeholder}
			</label>
			<input
				{...onFocusOnBlur}
				className={'bg-lightGray p-5 pt-6 outline-none absolute w-full' 
					+ ' rounded-2xl ' + getAdditionalStyles(isDanger, isFocus)} 
				id={name}
				name={name}
				value={value}
				{...props} />
		</div>
	);
};
	
export default Input;
