import { getCsrfToken } from 'next-auth/react';

interface Props {
  csrfToken: string;
}

export default function SignIn({ csrfToken }: Props) {
  return (
    <div className="grid min-h-full items-center">
      <form
        className="container max-w-lg mx-auto grid gap-4"
        method="post"
        action="/api/auth/signin/email"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <label>Email address</label>
        <input className="border-2 border-black" type="email" id="email" name="email" />
        <button className="border-2 border-black" type="submit">
          Sign in with Email
        </button>
      </form>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: { csrfToken },
  };
}
