import { PageTitleContext } from '@/context/page-title-context.ts';
import { useContext } from 'react';

export const usePageTitle = () => useContext(PageTitleContext);
