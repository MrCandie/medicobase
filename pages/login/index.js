import Logins from "../../components/homepage/get started/login";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/admin");
    }
  }, [status]);
  if (status === "unauthenticated") {
    return <Logins />;
  }
}
