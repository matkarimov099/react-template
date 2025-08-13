import { PageTitle } from '@/components/common/page-title';
import { useAuthContext } from '@/hooks/use-auth-context';

export default function DashboardPage() {
	const { currentUser } = useAuthContext();

	return (
		<div className="container py-4">
			<PageTitle title="Dashboard Overview" />

			<div className="mt-6 grid gap-6">
				{currentUser && (
					<div className="rounded-lg border bg-card p-6 shadow-sm">
						<h2 className="mb-4 font-semibold text-2xl">
							Welcome, {currentUser.firstname} {currentUser.lastname}!
						</h2>
						<p className="text-muted-foreground">
							Good to see you back. Here's your dashboard overview with the latest updates.
						</p>
					</div>
				)}

				<div className="rounded-lg border bg-card p-6 shadow-sm">
					<h2 className="mb-4 font-semibold text-xl">Dashboard Overview</h2>
					<p className="text-muted-foreground">
						This is the main dashboard overview page. It shows a summary of your most important
						data.
					</p>
					<div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
						{[1, 2, 3].map(i => (
							<div key={i} className="rounded-md border bg-card p-4">
								<h3 className="font-semibold">Metric {i}</h3>
								<div className="mt-2 font-bold text-2xl">{Math.floor(Math.random() * 1000)}</div>
								<p className="mt-1 text-muted-foreground text-xs">
									+{Math.floor(Math.random() * 10)}% from last period
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
