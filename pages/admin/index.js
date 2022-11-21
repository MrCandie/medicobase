import Admin from "../../components/admin/Admins";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Admins() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  if (status === "authenticated") {
    return <Admin />;
  }
}
