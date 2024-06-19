import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AuthGuard() {
  const pathname = usePathname();

  return (
    <div>
      <pre>You are trying to access: {pathname}</pre>
      You have found a secret place! Please <Link href={`/`}>Log In</Link> to continue.
    </div>
  );
}