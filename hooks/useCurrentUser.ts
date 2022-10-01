import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

interface Options {
  redirect?: string;
}

function useCurrentUser(options: Options = {}) {
  const { data: currentUser, status } = useSession();

  useEffect(() => {
    if (!options.redirect) return;
    if (status === "loading") return;
  }, [options.redirect, status]);

  return currentUser;
}

export default useCurrentUser;
