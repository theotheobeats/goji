import { PrismaClient } from "@prisma/client";

interface getWorkspaceProps {
	userId: string;
}

export const getWorkspaces = async ({ userId }: getWorkspaceProps) => {
	const prisma = new PrismaClient();
	const members = await prisma.members.findMany({
		where: {
			userId,
		},
	});

	if (members.length === 0) {
		return [];
	}

	const workspaceIds = members.map((member) => member.workspaceId);

	const workspaces = await prisma.workspaces.findMany({
		where: {
			id: {
				in: workspaceIds,
			},
		},
	});

	return workspaces;
};
