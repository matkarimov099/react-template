import { z } from 'zod';

export const userCreateSchema = (t: (key: string) => string) => {
	return z.object({
		name: z.string().min(2, t('validations.enterName')),
		email: z.string().email(t('validations.emailInvalid')),
		phone: z.string().min(10, t('validations.phoneMin')),
		age: z.coerce.number().min(16, t('validations.ageMin')).max(120, t('validations.ageMax')),
	});
};

export type UserCreateSchema = z.infer<ReturnType<typeof userCreateSchema>>;
