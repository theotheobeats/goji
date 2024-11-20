"use client";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { DottedSeparator } from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const SignUpCard = () => {
	const router = useRouter();

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof registerSchema>) => {
		const response = await authClient.signUp.email(
			{
				email: values.email,
				password: values.password,
				name: values.name,
			},
			{
				onRequest: () => {
					//show loading
					toast.loading("Processing..");
				},
				onSuccess: () => {
					//redirect to the dashboard
					toast.success("Account registered successfully!");
					router.refresh();
				},
				onError: () => {
					toast.error("Failed to register!");
				},
			}
		);
	};

	const googleSignUp = async () => {
		const data = await authClient.signIn.social({
			provider: "google",
		});
		console.log(data);
	};

	const githubSignUp = async () => {
		const data = await authClient.signIn.social({
			provider: "github",
		});
		console.log(data);
	};

	return (
		<Card className="w-full h-full md:w-[487px] border-none shadow-none">
			<CardHeader className="flex items-center justify-center text-center p-7">
				<CardTitle>Sign Up!</CardTitle>
				<CardDescription>
					By signin up, you are agree to our{" "}
					<Link href="/privacy">
						<span className="text-blue-700">Privacy Policy</span>
					</Link>
					and
					<Link href="/privacy">
						<span className="text-blue-700">Terms of Service</span>
					</Link>
				</CardDescription>
			</CardHeader>

			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7">
				<Form {...form}>
					<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							name="name"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input type="name" placeholder="Enter name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
							Sign Up
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
					disabled={false}
					onClick={() => googleSignUp()}>
					<FcGoogle className="mr-2 size-5" />
					Sign Up with Google
				</Button>
				<Button
					variant="secondary"
					size="lg"
					className="w-full"
					disabled={false}
					onClick={() => githubSignUp()}>
					<FaGithub className="mr-2 size-5" />
					Sign Up with Github
				</Button>
			</CardContent>
			<div className="px-7">
				<DottedSeparator />
			</div>
			<CardContent className="p-7 flex items-center justify-center">
				Already have an account?{" "}
				<Link href="/sign-in" className="text-blue-700">
					&nbsp;Sign Up
				</Link>
			</CardContent>
		</Card>
	);
};
