import { Hono } from "hono";
import { createWorkspaceSchema } from "../schemas";
import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const prisma = new PrismaClient();
const app = new Hono()
	.get("/", async (c) => {
		const session = await auth.api.getSession({
			headers: headers(),
		});

		if (!session) {
			return c.json({ error: "No user sessions found." }, 401);
		}

		const userId = session.user.id;

		const workspaces = await prisma.workspaces.findMany({
			where: {
				userId,
			},
		});

		return c.json({ data: workspaces });
	})

	.post("/", zValidator("json", createWorkspaceSchema), async (c) => {
		const { name } = c.req.valid("json");

		// get user session
		const session = await auth.api.getSession({
			headers: headers(),
		});

		if (!session) {
			return c.json({ error: "No user sessions found." }, 401);
		}

		const userId = session.user.id;

		// store the database to workspaces table
		const workspace = await prisma.workspaces.create({
			data: { name, userId },
		});

		return c.json(workspace);
	});

export default app;
