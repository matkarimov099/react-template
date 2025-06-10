import { PageTitle } from '@/components/common/page-title';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';

export default function AnalyticsPage() {
	// Sample data for the chart
	const data = [
		{ name: 'Jan', value: 400 },
		{ name: 'Feb', value: 300 },
		{ name: 'Mar', value: 600 },
		{ name: 'Apr', value: 800 },
		{ name: 'May', value: 500 },
		{ name: 'Jun', value: 900 },
		{ name: 'Jul', value: 700 },
	];

	return (
		<div className="container py-4">
			<PageTitle title="Analytics" />

			<div className="grid gap-6 mt-6">
				<div className="p-6 bg-card rounded-lg border shadow-sm">
					<h2 className="text-xl font-semibold mb-4">Performance Analytics</h2>
					<div className="h-[300px] w-full">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={data}>
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Bar
									dataKey="value"
									fill="hsl(var(--primary))"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div className="p-6 bg-card rounded-lg border shadow-sm">
						<h3 className="text-lg font-semibold mb-4">User Engagement</h3>
						<div className="space-y-4">
							{['Daily Active Users', 'Session Duration', 'Bounce Rate'].map(
								(metric, i) => (
									<div
										key={metric}
										className="flex justify-between items-center"
									>
										<span className="text-muted-foreground">{metric}</span>
										<span className="font-medium">
											{i === 0
												? `${Math.floor(Math.random() * 1000)}`
												: i === 1
													? `${Math.floor(Math.random() * 10)}m ${Math.floor(
															Math.random() * 60,
														)}s`
													: `${Math.floor(Math.random() * 100)}%`}
										</span>
									</div>
								),
							)}
						</div>
					</div>

					<div className="p-6 bg-card rounded-lg border shadow-sm">
						<h3 className="text-lg font-semibold mb-4">Traffic Sources</h3>
						<div className="space-y-4">
							{['Direct', 'Organic Search', 'Referral', 'Social'].map(
								(source) => (
									<div
										key={source}
										className="flex justify-between items-center"
									>
										<span className="text-muted-foreground">{source}</span>
										<span className="font-medium">
											{Math.floor(Math.random() * 100)}%
										</span>
									</div>
								),
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
