import { useSession, signIn, signOut } from "next-auth/react";
import Button from "ui/Button";

function Session() {
  const { data: currentUser, status } = useSession();

  if (status === "loading") {
    return (
      <>
        Not signed in <br />
        <Button name="sign-in" disabled>
          Sign in
        </Button>
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        Not signed in <br />
        <Button name="sign-in" onClick={() => signIn()}>
          Sign in
        </Button>
      </>
    );
  }

  return (
    <>
      Signed in as {currentUser.email} <br />
      <Button name="sign-out" onClick={() => signOut()}>
        Sign out
      </Button>
    </>
  );
}

export default Session;
