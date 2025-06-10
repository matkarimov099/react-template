import { useContext } from 'react';
import { PageTitleContext } from '@/context/page-title-context.ts';

export const usePageTitle = () => useContext(PageTitleContext);
