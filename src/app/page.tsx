import ClientRedirect from '@/components/ClientRedirect';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-base-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary">LEPEVA LMS</h1>
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
        </div>
        <div className="flex justify-center">
          <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      </div>
      <ClientRedirect />
    </div>
  );
}
