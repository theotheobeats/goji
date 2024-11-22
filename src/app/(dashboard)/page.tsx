import { getWorkspaces } from "@/features/workspaces/actions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	// Redirect if no session
	if (!session) {
		redirect("/sign-in");
	}

	const workspaces = await getWorkspaces({ userId: session.user.id });

	if (workspaces.length === 0) {
		redirect("/workspace/create");
	} else {
		redirect(`/workspaces/${workspaces[0].id}`);
	}
}
