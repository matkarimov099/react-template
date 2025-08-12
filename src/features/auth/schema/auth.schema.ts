import { z } from 'zod';

// Phone number regex for Uzbekistan
const phoneRegex = /^(?:\+998|998|8)\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

export const createLoginSchema = (t: (key: string) => string) => {
	return z.object({
		phone: z
			.string()
			.regex(phoneRegex, t('validations.phoneInvalid'))
			.min(1, t('validations.phoneRequired'))
			.max(20, t('validations.phoneInvalid')),
		password: z
			.string({ message: t('validations.passwordRequired') })
			.min(8, t('validations.passwordMin')),
	});
};

export type LoginSchema = z.infer<ReturnType<typeof createLoginSchema>>;
