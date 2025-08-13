import { LocalizedNavLink } from '@/components/common/localized-nav-link';
import { Button } from '@/components/ui/button.tsx';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { PasswordInput } from '@/components/ui/password-input';
import { PhoneInput } from '@/components/ui/phone-input.tsx';
import { type LoginSchema, createLoginSchema } from '@/features/auth/schema/auth.schema';
import { useI18n } from '@/hooks/use-i18n';
import { getUserFromToken } from '@/lib/auth';
import type { ServerError } from '@/types/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError } from 'axios';
import { ChevronRightIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useLogin } from '../hooks/use-auth';

export const LoginForm = () => {
	const { mutate: login, isPending } = useLogin();
	const navigate = useNavigate();
	const location = useLocation();
	const { t, locale } = useI18n('auth');

	const form = useForm<LoginSchema>({
		resolver: zodResolver(createLoginSchema(t)),
	});

	function onFormSubmit(values: LoginSchema) {
		login(
			{ ...values, phone: values.phone.replace(/([() -])/g, '') },
			{
				onSuccess: data => {
					localStorage.setItem('accessToken', data?.data.accessToken);
					localStorage.setItem('refreshToken', data?.data.refreshToken);
					const user = getUserFromToken() ?? null;
					if (user) {
						// location.state?.from sahifasiga qaytish yoki default dashboard ga yo'naltirish
						const from = location.state?.from?.pathname || `/${locale}/dashboard`;
						navigate(from, { replace: true });
					} else {
						navigate(`/${locale}/auth/login`);
					}
				},
				onError: error => {
					if (isAxiosError<ServerError>(error)) {
						toast.error(error.response?.data?.message);
					} else {
						toast.error('Profilga kirishda xatolik yuz berdi!');
					}
				},
			}
		);
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onFormSubmit)} className="px-2 py-6">
					<div className="grid gap-6">
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-foreground/70 dark:text-foreground/80">
										Telefon raqam
									</FormLabel>
									<FormControl>
										<PhoneInput
											inputClassName="border-border bg-background text-foreground dark:border-border dark:bg-background dark:text-foreground"
											inputSize="xl"
											defaultCountry="UZ"
											placeholder="90 123 45 67"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<div className="flex items-center">
										<FormLabel className="text-foreground/70 dark:text-foreground/80">
											Parol
										</FormLabel>
										<LocalizedNavLink
											to="/forgot-password"
											className="ml-auto text-muted-foreground text-sm underline-offset-2 hover:underline hover:text-foreground"
										>
											Parolingiz esdan chiqdimi?
										</LocalizedNavLink>
									</div>
									<FormControl>
										<PasswordInput
											className="border-border bg-background text-foreground dark:border-border dark:bg-background dark:text-foreground"
											inputSize="xl"
											placeholder="Parolingizni kiriting"
											{...field}
											value={field.value ?? ''}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							rightIcon={<ChevronRightIcon />}
							loading={isPending}
							type="submit"
							size="xl"
							className="w-full bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90"
						>
							Kirish
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};
