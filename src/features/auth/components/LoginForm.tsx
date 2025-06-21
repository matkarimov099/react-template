import { Button } from "@/components/ui/button.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { PhoneInput } from "@/components/ui/phone-input.tsx";
import {
  type LoginSchema,
  loginSchema,
} from "@/features/auth/schema/auth.schema";
import { getUserFromToken } from "@/lib/auth";
import type { ServerError } from "@/types/common";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { ChevronRightIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { LocalizedNavLink } from "@/components/common/localized-nav-link";
import { toast } from "sonner";
import { useLogin } from "../hooks/use-auth";

export const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const navigate = useNavigate();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  function onFormSubmit(values: LoginSchema) {
    login(
      { ...values, phone: values.phone.replace(/([() -])/g, "") },
      {
        onSuccess: (data) => {
          localStorage.setItem("accessToken", data?.data.accessToken);
          localStorage.setItem("refreshToken", data?.data.refreshToken);
          const user = getUserFromToken() ?? null;
          if (user) {
            navigate("/");
          } else {
            navigate("/auth/login");
          }
        },
        onError: (error) => {
          if (isAxiosError<ServerError>(error)) {
            toast.error(error.response?.data?.message);
          } else {
            toast.error("Profilga kirishda xatolik yuz berdi!");
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
              <h1 className="text-xl font-bold text-blue-700 dark:text-white">
                Project name
              </h1>
              <p className="text-balance text-muted-foreground">
                project description
              </p>
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
                      <FormLabel className="text-neutral-400 dark:text-white">
                        Parol
                      </FormLabel>
                      <LocalizedNavLink
                        to="/forgot-password"
                        className="text-neutral-400 dark:text-white ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Parolingiz esdan chiqdimi?
                      </LocalizedNavLink>
                    </div>
                    <FormControl>
                      <PasswordInput
                        className="dark:border-neutral-600 text-neutral-400 dark:text-white"
                        inputSize="xl"
                        placeholder="Parolingizni kiriting"
                        {...field}
                        value={field.value ?? ""}
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
              className="cursor-pointer group/btn relative block px-6 py-2 bg-black text-white dark:hover:bg-black rounded-lg font-bold transform hover:-translate-y-0.5 transition duration-300"
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
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};
