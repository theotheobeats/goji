import { Hono } from "hono";
import { createWorkspaceSchema } from "../schemas";
import { zValidator } from "@hono/zod-validator";
import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { MemberRole } from "@/features/members/types";
import { generateInviteCode } from "@/lib/utils";

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

		const members = await prisma.members.findMany({
			where: {
				userId,
			},
		});

		if (members.length === 0) {
			return c.json({ data: [] });
		}

		const workspaceIds = members.map((member) => member.workspaceId);

		const workspaces = await prisma.workspaces.findMany({
			where: {
				id: {
					in: workspaceIds,
				},
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
			data: { name, inviteCode: generateInviteCode(10) },
		});

		// create new member
		await prisma.members.create({
			data: { userId, workspaceId: workspace.id, role: MemberRole.ADMIN },
		});

		return c.json({ data: workspace });
	});

export default app;
