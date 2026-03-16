import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { AuthProbe } from './AuthProbe';

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <AuthProbe />
    </main>
  );
}