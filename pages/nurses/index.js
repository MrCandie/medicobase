import React from "react";
import Nurses from "../../components/nurses/Nurses";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function NursesPortal() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  if (status === "authenticated") {
    return <Nurses />;
  }
}
