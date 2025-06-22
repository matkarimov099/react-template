import { type ReactNode, Suspense } from 'react';
import { Spinner } from '@/components/ui/spinner.tsx';

export const LazyComponent = ({ children }: { children: ReactNode }) => {
	return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};
