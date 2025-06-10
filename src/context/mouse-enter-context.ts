import { type Dispatch, type SetStateAction, createContext } from 'react';

export const MouseEnterContext = createContext<
	[boolean, Dispatch<SetStateAction<boolean>>] | undefined
>(undefined);
