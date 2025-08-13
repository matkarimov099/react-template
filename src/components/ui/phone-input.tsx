import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';

import { Input, type InputProps } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type PhoneInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> &
	Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
		onChange?: (value: RPNInput.Value) => void;
		inputSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | string;
		inputClassName?: string;
	};

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
	React.ElementRef<typeof RPNInput.default>,
	PhoneInputProps
>(({ className, inputClassName, onChange, ...props }, ref) => {
	return (
		<RPNInput.default
			ref={ref}
			className={cn('w-full', className)}
			countrySelectComponent={() => null}
			flagComponent={() => null}
			inputComponent={InputComponent}
			smartCaret={false}
			onChange={value => {
				if (value) onChange?.(value);
			}}
			inputClassName={inputClassName}
			{...props}
		/>
	);
});
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, InputProps & { inputClassName?: string }>(
	({ className, inputClassName, ...props }, ref) => (
		<Input className={cn('w-full', inputClassName, className)} {...props} ref={ref} />
	)
);
InputComponent.displayName = 'InputComponent';

export { PhoneInput };