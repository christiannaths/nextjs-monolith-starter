import { useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface Options {
  redirect?: string;
}

type User = {
  id: string;
  email: string;
};

function useCurrentUser(options: Options = {}): User | null | undefined {
  const { data: currentUser, status } = useSession();

  useEffect(() => {
    if (!options.redirect) return;
    if (status === 'loading') return;
  }, [options.redirect, status]);

  return currentUser as User | null | undefined;
}

export default useCurrentUser;
