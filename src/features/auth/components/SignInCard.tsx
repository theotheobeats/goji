"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { loginSchema } from "../schemas";
import { useLogin } from "@/features/auth/api/use-login";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const SignInCard = () => {
	const { mutate } = useLogin();
	const router = useRouter();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof loginSchema>) => {
		mutate({ json: values });
		const { error } = await authClient.signIn.email(
			{
				email: values.email,
				password: values.password,
			},
			{
				onRequest: () => {},
				onSuccess: () => {
					//redirect to the dashboard
					router.push("/");
				},
				onError: () => {
					console.log(error);
				},
			}
		);
	};

	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle>Welcome back!</CardTitle>
			</CardHeader>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							name="email"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="email" placeholder="Enter email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input
											type="password"
											placeholder="Enter password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button disabled={false} size="lg" className="w-full">
							Sign In
						</Button>
					</form>
				</Form>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex flex-col gap-y-4">
				<Button
					variant="secondary"
					size="lg"
					className="w-full"
					disabled={false}>
					<FcGoogle className="mr-2 size-5" />
					Login with Google
				</Button>
				<Button
					variant="secondary"
					size="lg"
					className="w-full"
					disabled={false}>
					<FaGithub className="mr-2 size-5" />
					Login with Github
				</Button>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex items-center justify-center">
				Don&apos;t have an account?{" "}
				<Link href="/sign-up" className="text-blue-700">
					&nbsp;Sign Up
				</Link>
			</CardContent>
		</Card>
	);
};
