import { ReactNode } from 'react';
import Link from 'next/link';
import { useUser } from '@/providers/UserProvider';

const Fallback = <Link href="/enter">You must be signed in</Link>;

type AuthCheckProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

// Component's children only shown to logged-in users
export default function AuthCheck({
  children,
  fallback = Fallback,
}: AuthCheckProps) {
  const { username } = useUser();

  return <>{username ? children : fallback}</>;
}
