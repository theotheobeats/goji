import { SignInCard } from "@/features/auth/components/SignInCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
	const session = await auth.api.getSession({
		headers: headers(),
	});

	// Redirect if no session
	if (session) {
		redirect("/");
	}

	return (
		<div>
			<SignInCard />
		</div>
	);
};

export default SignInPage;
