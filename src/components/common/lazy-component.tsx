import { Spinner } from '@/components/ui/spinner.tsx';
import { type ReactNode, Suspense } from 'react';

export const LazyComponent = ({ children }: { children: ReactNode }) => {
	return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};
