"use client"

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { loginSchema, registerSchema } from "../schemas";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const app = new Hono()
	.post("/login", zValidator("json", loginSchema), async (c) => {
		const { email, password } = c.req.valid("json");
		const router = useRouter();
		console.log({ email, password });

		const { error } = await authClient.signIn.email(
			{
				email,
				password,
			},
			{
				onSuccess: () => {
					router.push("/");
				},
				onError: () => {
					console.log(error);
				},
			}
		);

		return c.json({ email, password });
	})
	.post("/register", zValidator("json", registerSchema), async (c) => {
		const { name, email, password } = c.req.valid("json");
		const router = useRouter();
		console.log({ name, email, password });

		const { error } = await authClient.signUp.email(
			{
				name,
				email,
				password,
			},
			{
				onSuccess: () => {
					//redirect to the dashboard
					router.push("/");
				},
				onError: () => {
					console.log(error);
				},
			}
		);

		return c.json({ name, email, password });
	});

export default app;
