import { cva } from 'class-variance-authority';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
	{
		variants: {
			variant: {
				default:
					'bg-primary text-primary-foreground hover:bg-primary/90',
				destructive:
					'bg-destructive text-destructive-foreground hover:bg-destructive/90',
				outline:
					'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
				secondary:
					'bg-secondary text-secondary-foreground hover:bg-secondary/80',
				ghost: 
					'hover:bg-accent hover:text-accent-foreground',
				link: 
					'text-primary underline-offset-4 hover:underline',
			},
			size: {
				xs: 'h-6 px-2 text-xs [&_svg]:size-3 rounded-sm',
				sm: 'h-8 px-3 text-sm [&_svg]:size-4 rounded-md',
				md: 'h-10 px-4 text-sm [&_svg]:size-4 rounded-md',
				lg: 'h-12 px-6 text-base [&_svg]:size-5 rounded-lg',
				xl: 'h-14 px-8 text-lg [&_svg]:size-6 rounded-lg',
				'2xl': 'h-16 px-10 text-xl [&_svg]:size-7 rounded-xl',
				icon: 'w-10 h-10 [&_svg]:size-5 rounded-md',
				'icon-sm': 'w-8 h-8 [&_svg]:size-4 rounded-md',
				'icon-lg': 'w-12 h-12 [&_svg]:size-6 rounded-lg',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'md',
		},
	},
);

export { buttonVariants };
