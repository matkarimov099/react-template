import { Input, type InputProps } from '@/components/ui/input';

import { cn } from '@/lib/utils.ts';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);
	const disabled = props.value === '' || props.value === undefined || props.disabled;

	return (
		<div className="relative">
			<Input
				type={showPassword ? 'text' : 'password'}
				className={cn('hide-password-toggle pr-10', className)}
				ref={ref}
				{...props}
			/>
			<button
				type="button"
				className="absolute top-0 right-0 h-full px-3 py-2 flex items-center justify-center cursor-pointer"
				onClick={() => setShowPassword(prev => !prev)}
				disabled={disabled}
			>
				{showPassword && !disabled ? (
					<EyeIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
				) : (
					<EyeOffIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
				)}
				<span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
			</button>
		</div>
	);
});
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
