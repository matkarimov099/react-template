import {
	MobileNav,
	MobileNavHeader,
	MobileNavMenu,
	MobileNavToggle,
	NavBody,
	NavItems,
	Navbar,
	NavbarButton,
	NavbarLogo,
} from '@/components/custom/resizable-navbar';
import { useState } from 'react';

export function AuthNavbar() {
	const navItems = [
		{
			name: 'Features',
			link: '#features',
		},
		{
			name: 'Pricing',
			link: '#pricing',
		},
		{
			name: 'Contact',
			link: '#contact',
		},
	];

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	return (
		<Navbar>
			{/* Desktop Navigation */}
			<NavBody>
				<NavbarLogo>Logo</NavbarLogo>
				<NavItems items={navItems} />
				<div className="flex items-center gap-4">
					<NavbarButton variant="primary">Ro'yxatdan o'tish</NavbarButton>
					<NavbarButton variant="gradient">Bog'lanish</NavbarButton>
				</div>
			</NavBody>

			{/* Mobile Navigation */}
			<MobileNav>
				<MobileNavHeader>
					<NavbarLogo>Logo</NavbarLogo>
					<MobileNavToggle
						isOpen={isMobileMenuOpen}
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					/>
				</MobileNavHeader>

				<MobileNavMenu
					isOpen={isMobileMenuOpen}
					onClose={() => setIsMobileMenuOpen(false)}
				>
					{navItems.map((item, idx) => (
						<a
							key={`${item.name}-${idx}`}
							href={item.link}
							onClick={() => setIsMobileMenuOpen(false)}
							className="relative text-neutral-600 dark:text-neutral-300"
						>
							<span className="block">{item.name}</span>
						</a>
					))}
					<div className="flex w-full flex-col gap-4">
						<NavbarButton
							onClick={() => setIsMobileMenuOpen(false)}
							variant="primary"
							className="w-full"
						>
							Login
						</NavbarButton>
						<NavbarButton
							onClick={() => setIsMobileMenuOpen(false)}
							variant="primary"
							className="w-full"
						>
							Book a call
						</NavbarButton>
					</div>
				</MobileNavMenu>
			</MobileNav>
		</Navbar>
	);
}
