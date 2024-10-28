"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Session } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

interface DashboardProps {
	session: Session | null;
}
export function Dashboard({ session }: DashboardProps) {
	const router = useRouter();

	const handleSignOut = useCallback(async () => {
		try {
			await authClient.signOut();
			console.log("You're signed out!");
			router.push("/sign-in");
		} catch (error) {
			console.error("Error signing out:", error);
		}
	}, [router]);

	if (!session || !session.user) {
		return null;
	}

	return (
		<div className="p-4">
			<div className="mb-4">Hi! {session.user.name}</div>
			<Button onClick={handleSignOut} variant="destructive">
				Logout
			</Button>
		</div>
	);
}
