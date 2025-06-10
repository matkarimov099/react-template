import { PageTitle } from '@/components/common/page-title';
import { Button } from '@/components/ui/button';
import { FileTextIcon, DownloadIcon, PrinterIcon } from 'lucide-react';

export default function ReportsPage() {
	// Sample reports data
	const reports = [
		{
			id: 1,
			name: 'Monthly Sales Report',
			date: 'June 1, 2025',
			type: 'Financial',
			status: 'Ready',
		},
		{
			id: 2,
			name: 'User Engagement Summary',
			date: 'May 15, 2025',
			type: 'Analytics',
			status: 'Ready',
		},
		{
			id: 3,
			name: 'Inventory Stock Levels',
			date: 'May 30, 2025',
			type: 'Operations',
			status: 'Processing',
		},
		{
			id: 4,
			name: 'Marketing Campaign ROI',
			date: 'June 5, 2025',
			type: 'Marketing',
			status: 'Ready',
		},
	];

	return (
		<div className="container py-4">
			<PageTitle title="Reports" />

			<div className="flex justify-between items-center mt-6">
				<div className="flex gap-2">
					<Button variant="outline" size="sm">
						All Reports
					</Button>
					<Button variant="outline" size="sm">
						Financial
					</Button>
					<Button variant="outline" size="sm">
						Analytics
					</Button>
				</div>
				<Button>
					<FileTextIcon className="mr-2 h-4 w-4" />
					New Report
				</Button>
			</div>

			<div className="mt-6">
				<div className="rounded-md border">
					<table className="w-full caption-bottom text-sm">
						<thead>
							<tr className="border-b bg-muted/50 transition-colors">
								<th className="h-12 px-4 text-left align-middle font-medium">
									Name
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium">
									Date
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium">
									Type
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium">
									Status
								</th>
								<th className="h-12 px-4 text-left align-middle font-medium">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{reports.map((report) => (
								<tr
									key={report.id}
									className="border-b transition-colors hover:bg-muted/50"
								>
									<td className="p-4 align-middle font-medium">
										<div className="flex items-center gap-2">
											<FileTextIcon className="h-4 w-4 text-muted-foreground" />
											{report.name}
										</div>
									</td>
									<td className="p-4 align-middle">{report.date}</td>
									<td className="p-4 align-middle">{report.type}</td>
									<td className="p-4 align-middle">
										<div
											className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
												report.status === 'Ready'
													? 'bg-green-100 text-green-800'
													: 'bg-yellow-100 text-yellow-800'
											}`}
										>
											{report.status}
										</div>
									</td>
									<td className="p-4 align-middle">
										<div className="flex items-center gap-2">
											<Button size="icon" variant="ghost" className="h-8 w-8">
												<DownloadIcon className="h-4 w-4" />
												<span className="sr-only">Download</span>
											</Button>
											<Button size="icon" variant="ghost" className="h-8 w-8">
												<PrinterIcon className="h-4 w-4" />
												<span className="sr-only">Print</span>
											</Button>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
