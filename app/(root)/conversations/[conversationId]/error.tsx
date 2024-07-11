"use client"
import ConversationFallBack from "@/components/shared/conversations/ConversationFallBack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ErrorProps = {
    error: Error;
}

export default function Error({ error }: ErrorProps) {
    const router = useRouter();

    useEffect(() => {
        router.push("/conversations");
    }, [error, router]);

    return <ConversationFallBack />;
}
