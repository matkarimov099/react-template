import { z } from 'zod';

// Schema for login
//write regex for phone number validation for Uzbekistan without operator code only length
// Phone number should be in the format: +998 (XX) XXX-XX-XX or 998 (XX) XXX-XX-XX or 8 (XX) XXX-XX-XX
const phoneRegex = /^(?:\+998|998|8)\s?\(?\d{2}\)?\s?\d{3}-?\d{2}-?\d{2}$/;

export const loginSchema = z.object({
	phone: z
		.string()
	.regex(phoneRegex, {
		message: 'Telefon raqamingizni to\'g\'ri kiriting! (+998 XX XXX-XX-XX)',
	})
	.min(1, 'Telefon raqamingizni kiriting')
	.max(20, 'Telefon raqamingizni to\'g\'ri kiriting! (+998 XX XXX-XX-XX)'),	
	password: z
		.string({ message: 'Parolni kiriting!' })
		.min(8, "Kamida 8 belgidan iborat bo'lishi kiriting"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
