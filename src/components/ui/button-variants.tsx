import { cva } from 'class-variance-authority';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 backdrop-filter backdrop-blur-[10px] backdrop-saturate-150 -webkit-tap-highlight-color-transparent',
	{
		variants: {
			variant: {
				default:
					'bg-[var(--system-blue)] text-white shadow-[var(--shadow-sm)] border border-black/[0.03] hover:bg-[var(--system-blue-500)] focus-visible:ring-2 focus-visible:ring-[var(--system-blue)] focus-visible:ring-offset-2',
				destructive:
					'bg-[var(--system-red)] text-white border border-black/[0.02] hover:bg-[color-mix(in_srgb,var(--system-red)_90%,white)] focus-visible:ring-2 focus-visible:ring-[var(--system-red)] focus-visible:ring-offset-2',
				outline:
					'bg-[var(--card-bg)] text-[var(--label)] border border-[var(--border)] hover:bg-[var(--control-ghost-bg)] hover:shadow-[var(--shadow-sm)] hover:-translate-y-[1px] transition-all duration-[var(--motion-short)] ease-[var(--motion-ease)] focus-visible:ring-2 focus-visible:ring-[var(--system-blue)] focus-visible:ring-offset-2',
				secondary:
					'bg-[var(--system-green)] text-white border border-black/[0.03] hover:bg-[color-mix(in_srgb,var(--system-green)_90%,white)] focus-visible:ring-2 focus-visible:ring-[var(--system-green)] focus-visible:ring-offset-2',
				ghost:
					'bg-transparent text-[var(--label)] hover:bg-[var(--control-ghost-bg)] focus-visible:ring-2 focus-visible:ring-[var(--system-blue)] focus-visible:ring-offset-2',
				link: 'text-[var(--system-blue)] underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:ring-[var(--system-blue)] focus-visible:ring-offset-2',
				success:
					'bg-[var(--system-green)] text-white border border-black/[0.03] hover:bg-[color-mix(in_srgb,var(--system-green)_90%,white)] focus-visible:ring-2 focus-visible:ring-[var(--system-green)] focus-visible:ring-offset-2',
				primary:
					'bg-[var(--system-blue)] text-white shadow-[var(--shadow-sm)] border border-black/[0.03] hover:bg-[var(--system-blue-500)] focus-visible:ring-2 focus-visible:ring-[var(--system-blue)] focus-visible:ring-offset-2',
			},
			size: {
				xs: 'h-7 px-2 text-xs rounded-[var(--radius-sm)] [&_svg]:size-3',
				sm: 'h-8 px-3 text-sm rounded-[var(--radius-md)] [&_svg]:size-3.5',
				default: 'h-9 px-4 text-sm rounded-[var(--radius-md)] [&_svg]:size-4',
				md: 'h-9 px-4 text-sm rounded-[var(--radius-md)] [&_svg]:size-4',
				lg: 'h-11 px-6 text-base rounded-[var(--radius-lg)] [&_svg]:size-5',
				xl: 'h-12 px-8 text-lg rounded-[var(--radius-lg)] [&_svg]:size-6',
				icon: 'h-9 w-9 rounded-[var(--radius-md)] [&_svg]:size-4',
			},
		},
		defaultVariants: {
			variant: 'default',
			size: 'default',
		},
	},
);

export { buttonVariants };
