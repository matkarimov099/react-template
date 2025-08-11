import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { AlertTriangleIcon, CheckIcon, InfoIcon, XIcon } from 'lucide-react';

export function ThemeShowcase() {
	return (
		<div className="space-y-8 bg-ios-background p-6 text-ios-label">
			<div className="space-y-2 text-center">
				<h1 className="font-[var(--font-sans)] font-bold text-3xl text-ios-label">
					iOS Design System Showcase
				</h1>
				<p className="text-ios-muted">
					Apple Human Interface Guidelines asosidagi professional tema
				</p>
			</div>

			{/* iOS Color Palette */}
			<Card className="hover-lift border-ios bg-ios-card shadow-ios-md">
				<CardHeader>
					<CardTitle className="text-ios-label">iOS System Colors</CardTitle>
					<CardDescription className="text-ios-muted">
						Apple HIG asosidagi system ranglar
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
						<div className="space-y-2">
							<div className="h-16 rounded-ios-md bg-[var(--system-blue)] shadow-ios-sm" />
							<p className="font-medium text-ios-label text-sm">System Blue</p>
						</div>
						<div className="space-y-2">
							<div className="h-16 rounded-ios-md bg-[var(--system-green)] shadow-ios-sm" />
							<p className="font-medium text-ios-label text-sm">System Green</p>
						</div>
						<div className="space-y-2">
							<div className="h-16 rounded-ios-md bg-[var(--system-red)] shadow-ios-sm" />
							<p className="font-medium text-ios-label text-sm">System Red</p>
						</div>
						<div className="space-y-2">
							<div className="h-16 rounded-ios-md bg-[var(--system-yellow)] shadow-ios-sm" />
							<p className="font-medium text-ios-label text-sm">System Yellow</p>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Status Colors */}
			<Card className="hover-lift border-ios bg-ios-card shadow-ios-md">
				<CardHeader>
					<CardTitle className="text-ios-label">Status Indicators</CardTitle>
					<CardDescription className="text-ios-muted">
						iOS-style status va feedback ranglari
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-4">
						<div className="flex items-center space-x-2 rounded-ios-md bg-[color-mix(in_srgb,var(--system-green)_14%,var(--secondaryBackground)_86%)] p-3">
							<CheckIcon className="h-5 w-5 text-[var(--system-green)]" />
							<span className="font-medium text-[var(--system-green)]">Success</span>
						</div>
						<div className="flex items-center space-x-2 rounded-ios-md bg-[color-mix(in_srgb,var(--system-yellow)_14%,var(--secondaryBackground)_86%)] p-3">
							<AlertTriangleIcon className="h-5 w-5 text-[var(--system-yellow)]" />
							<span className="font-medium text-[var(--system-yellow)]">Warning</span>
						</div>
						<div className="flex items-center space-x-2 rounded-ios-md bg-[color-mix(in_srgb,var(--system-red)_14%,var(--secondaryBackground)_86%)] p-3">
							<XIcon className="h-5 w-5 text-[var(--system-red)]" />
							<span className="font-medium text-[var(--system-red)]">Error</span>
						</div>
						<div className="flex items-center space-x-2 rounded-ios-md bg-[color-mix(in_srgb,var(--system-cyan)_14%,var(--secondaryBackground)_86%)] p-3">
							<InfoIcon className="h-5 w-5 text-[var(--system-cyan)]" />
							<span className="font-medium text-[var(--system-cyan)]">Info</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* iOS Buttons */}
			<Card className="hover-lift border-ios bg-ios-card shadow-ios-md">
				<CardHeader>
					<CardTitle className="text-ios-label">iOS Button Styles</CardTitle>
					<CardDescription className="text-ios-muted">
						iOS HIG-compliant button variants
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex flex-wrap gap-3">
						<Button className="hover-lift">Primary Button</Button>
						<Button variant="secondary" className="hover-lift">
							Secondary
						</Button>
						<Button variant="outline" className="hover-lift">
							Outline
						</Button>
						<Button variant="ghost" className="hover-lift">
							Ghost
						</Button>
						<Button variant="destructive" className="hover-lift">
							Destructive
						</Button>
					</div>
					<Separator className="border-ios bg-ios" />
					<div className="flex flex-wrap gap-3">
						<Button size="xs" className="hover-lift">
							Extra Small
						</Button>
						<Button size="sm" className="hover-lift">
							Small
						</Button>
						<Button size="md" className="hover-lift">
							Medium
						</Button>
						<Button size="lg" className="hover-lift">
							Large
						</Button>
						<Button size="xl" className="hover-lift">
							Extra Large
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* iOS Vibrancy Effects */}
			<Card className="hover-lift border-ios bg-ios-card shadow-ios-md">
				<CardHeader>
					<CardTitle className="text-ios-label">iOS Vibrancy Effects</CardTitle>
					<CardDescription className="text-ios-muted">
						Backdrop blur va vibrancy effects
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div className="flex h-24 items-center justify-center rounded-ios-lg border-ios bg-ios-card saturate-[150%] backdrop-blur-[10px]">
							<span className="font-medium text-ios-label">Card Vibrancy</span>
						</div>
						<div className="flex h-24 items-center justify-center rounded-ios-lg border-ios bg-ios-popover saturate-[150%] backdrop-blur-[10px]">
							<span className="font-medium text-ios-label">Popover Vibrancy</span>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* iOS Glass Effect */}
			<Card className="hover-lift border-ios bg-ios-popover shadow-ios-lg saturate-[150%] backdrop-blur-[10px]">
				<CardHeader>
					<CardTitle className="text-ios-label">iOS Glass Effect</CardTitle>
					<CardDescription className="text-ios-muted">
						Authentic iOS vibrancy and transparency
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						<Badge
							variant="secondary"
							className="border-ios bg-[var(--secondaryBackground)] text-ios-label"
						>
							iOS Glass
						</Badge>
						<p className="text-ios-muted text-sm leading-[1.35]">
							This card demonstrates iOS-style vibrancy with backdrop blur and subtle transparency
							effects, following Apple's Human Interface Guidelines.
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
