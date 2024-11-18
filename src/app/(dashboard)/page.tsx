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
	return <div className="flex gap-4">This is a home page.</div>;
}
