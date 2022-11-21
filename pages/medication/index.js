import Medication from "../../components/medications/medication";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Medications() {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status]);

  if (status === "authenticated") {
    return <Medication />;
  }
}
