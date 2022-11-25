import Register from "../../components/homepage/get started/register";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Signup() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [status]);
  if (status === "unauthenticated") {
    return <Register />;
  }
}
