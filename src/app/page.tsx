import ClientRedirect from '@/components/ClientRedirect';

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <ClientRedirect />
      <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
    </div>
  );
}
