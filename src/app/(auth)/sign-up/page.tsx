import { SignUpCard } from "@/features/auth/components/SignUpCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const SignUpPage = async () => {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	// Redirect if no session
	if (session) {
		redirect("/");
	}

	return (
		<div>
			<SignUpCard />
		</div>
	);
};

export default SignUpPage;
