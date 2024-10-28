// app/dashboard/page.tsx
import { Dashboard } from "@/features/auth/components/Dashboard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	// Redirect if no session
	if (!session) {
		redirect("/sign-in");
	}

	return (
		<div className="container mx-auto">
			<Dashboard session={session} />
		</div>
	);
}
