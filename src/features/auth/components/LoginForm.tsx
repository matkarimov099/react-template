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
						// location.state?.from sahifasiga qaytish yoki default "/reports" ga yo'naltirish
						const from = location.state?.from?.pathname || `/${locale}/reports`;
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
				<form onSubmit={form.handleSubmit(onFormSubmit)} className="px-4 py-6">
					<div className="flex flex-col gap-6">
						<div className="flex flex-col items-center text-center">
							<h1 className="font-bold text-blue-700 text-xl dark:text-white">Project name</h1>
							<p className="text-balance text-muted-foreground">project description</p>
						</div>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="text-neutral-400 dark:text-white">
											Telefon raqam
										</FormLabel>
										<FormControl>
											<PhoneInput
												inputClassName="dark:border-neutral-600 text-neutral-400 dark:text-white"
												className="text-neutral-400 dark:text-white"
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
						</div>
						<div className="grid gap-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center">
											<FormLabel className="text-neutral-400 dark:text-white">Parol</FormLabel>
											<LocalizedNavLink
												to="/forgot-password"
												className="ml-auto text-neutral-400 text-sm underline-offset-2 hover:underline dark:text-white"
											>
												Parolingiz esdan chiqdimi?
											</LocalizedNavLink>
										</div>
										<FormControl>
											<PasswordInput
												className="text-neutral-400 dark:border-neutral-600 dark:text-white"
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
						</div>
						<Button
							rightIcon={<ChevronRightIcon />}
							loading={isPending}
							type="submit"
							size="xl"
							className="group/btn hover:-translate-y-0.5 relative block transform cursor-pointer rounded-lg bg-black px-6 py-2 font-bold text-white transition duration-300 dark:hover:bg-black"
						>
							Kirish
							<BottomGradient />
						</Button>
					</div>
				</form>
			</Form>
		</>
	);
};

const BottomGradient = () => {
	return (
		<>
			<span className="-bottom-px absolute inset-x-0 block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
			<span className="-bottom-px absolute inset-x-10 mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
		</>
	);
};
