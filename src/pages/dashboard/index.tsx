import { PageTitle } from '@/components/common/page-title';

export default function DashboardPage() {
	return (
		<div className="container py-4">
			<PageTitle title="Dashboard Overview" />

			<div className="grid gap-6 mt-6">
				<div className="p-6 bg-card rounded-lg border shadow-sm">
					<h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
					<p className="text-muted-foreground">
						This is the main dashboard overview page. It shows a summary of your
						most important data.
					</p>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
						{[1, 2, 3].map((i) => (
							<div key={i} className="p-4 bg-card border rounded-md">
								<h3 className="font-semibold">Metric {i}</h3>
								<div className="text-2xl font-bold mt-2">
									{Math.floor(Math.random() * 1000)}
								</div>
								<p className="text-xs text-muted-foreground mt-1">
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
