import Register from "../../components/get started/register";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Signup() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push(1);
      return;
    }
  }, [status]);

  if (status === "unauthenticated") {
    return <Register />;
  }
}
