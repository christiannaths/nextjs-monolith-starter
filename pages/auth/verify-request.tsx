import Link from 'next/link';
import { useSession } from 'next-auth/react';
import useCurrentUser from 'hooks/useCurrentUser';

interface Props {
  devmailHost?: string;
}

export default function VerifyRequestPage({ devmailHost }: Props) {
  const currentUser = useCurrentUser();

  return (
    <div className="grid min-h-full items-center">
      <div className="container max-w-lg mx-auto grid gap-4">
        {currentUser ? (
          <>
            <h1 className="text-xl font-bold">Success! ✅</h1>
            <p>
              You&apos;re signed in as <span>{currentUser.email}</span>
            </p>
            <p>
              <Link className="underline" href="/">
                <a className="underline">Home</a>
              </Link>
            </p>
            <p>
              <Link href="/api/auth/signout">
                <a className="underline">Sign out</a>
              </Link>
            </p>
          </>
        ) : (
          <>
            <h1 className="text-xl font-bold">Check Your Email</h1>
            <p>A sign in link has been sent to your email address.</p>
            {devmailHost && (
              <p>
                <a
                  href={devmailHost}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Open Devmail
                </a>{' '}
                to view the email.
              </p>
            )}{' '}
          </>
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const devmailHost =
    process.env.NODE_ENV === 'development' && process.env.NEXT_APP_DEVMAIL_HOST;
  return {
    props: { devmailHost },
  };
}
