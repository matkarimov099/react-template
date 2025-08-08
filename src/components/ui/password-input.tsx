import { Button } from '@/components/ui/button';
import { Input, type InputProps } from '@/components/ui/input';

import { cn } from '@/lib/utils.ts';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { forwardRef, useState } from 'react';

interface PasswordInputProps extends Omit<InputProps, 'size'> {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
	({ className, size = 'md', ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		const disabled =
			props.value === '' || props.value === undefined || props.disabled;
		
		// Icon size based on input size
		const getIconSize = () => {
			switch (size) {
				case 'xs':
					return 'h-3 w-3';
				case 'sm':
					return 'h-3.5 w-3.5';
				case 'md':
					return 'h-4 w-4';
				case 'lg':
					return 'h-5 w-5';
				case 'xl':
					return 'h-5 w-5';
				case '2xl':
					return 'h-6 w-6';
				default:
					return 'h-4 w-4';
			}
		};

		return (
			<div className="relative">
				<Input
					type={showPassword ? 'text' : 'password'}
					className={cn('hide-password-toggle pr-10', className)}
					inputSize={size}
					ref={ref}
					{...props}
				/>
				<Button
					type="button"
					variant="ghost"
					size={size === 'xs' || size === 'sm' ? 'sm' : 'md'}
					className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
					onClick={() => setShowPassword((prev) => !prev)}
					disabled={disabled}
				>
					{showPassword && !disabled ? (
						<EyeIcon
							className={cn(getIconSize(), "text-muted-foreground")}
							aria-hidden="true"
						/>
					) : (
						<EyeOffIcon
							className={cn(getIconSize(), "text-muted-foreground")}
							aria-hidden="true"
						/>
					)}
					<span className="sr-only">
						{showPassword ? 'Hide password' : 'Show password'}
					</span>
				</Button>

				{/* hides browser password toggles */}
				<style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
			</div>
		);
	},
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
