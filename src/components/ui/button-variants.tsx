import { cva } from 'class-variance-authority';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 ios-font ios-transition-fast ios-backdrop-blur ios-active-press ios-interactive',
	{
		variants: {
			variant: {
				// iOS Primary (Blue)
				default:
					'ios-bg-blue ios-text-white ios-shadow-sm ios-border hover:ios-hover-lift focus-visible:ios-ring',
				primary:
					'ios-bg-blue ios-text-white ios-shadow-sm ios-border hover:ios-hover-lift focus-visible:ios-ring',

				// iOS Secondary (Green)
				secondary:
					'ios-bg-green ios-text-white ios-shadow-sm ios-border hover:ios-hover-lift focus-visible:ios-ring',
				success:
					'ios-bg-green ios-text-white ios-shadow-sm ios-border hover:ios-hover-lift focus-visible:ios-ring',

				// iOS Destructive (Red)
				destructive:
					'ios-bg-red ios-text-white ios-shadow-sm ios-border hover:ios-hover-lift focus-visible:ios-ring',

				// iOS Outline/Ghost
				outline:
					'ios-bg-card ios-text-primary ios-border hover:ios-bg-control-ghost hover:ios-shadow-sm hover:ios-hover-lift focus-visible:ios-ring',
				ghost: 'bg-transparent ios-text-primary hover:ios-bg-control-ghost focus-visible:ios-ring',

				// iOS Link
				link: 'ios-text-blue underline-offset-4 hover:underline focus-visible:ios-ring',
			},
			size: {
				xs: 'h-7 px-2 ios-text-xs ios-rounded-sm [&_svg]:size-3',
				sm: 'h-8 px-3 ios-text-sm ios-rounded-md [&_svg]:size-3.5',
				default: 'h-9 px-4 ios-text-sm ios-rounded-md [&_svg]:size-4',
				md: 'h-9 px-4 ios-text-sm ios-rounded-md [&_svg]:size-4',
				lg: 'h-11 px-6 ios-text-md ios-rounded-lg [&_svg]:size-5',
				xl: 'h-12 px-8 ios-text-lg ios-rounded-lg [&_svg]:size-6',
				icon: 'h-9 w-9 ios-rounded-md [&_svg]:size-4',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	}
);

export { buttonVariants };
