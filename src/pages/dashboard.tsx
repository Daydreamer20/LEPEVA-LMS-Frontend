import { useAppSelector } from '@/store/hooks';
import BaseLayout from '@/components/layout/BaseLayout';

export default function DashboardPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <BaseLayout>
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="py-4">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Welcome back, {user?.firstName}!
                </h3>
                <div className="mt-2 max-w-xl text-sm text-gray-500">
                  <p>
                    {user?.role === 'learner'
                      ? 'Continue your language learning journey'
                      : user?.role === 'teacher'
                      ? 'Manage your courses and students'
                      : 'Manage the learning platform'}
                  </p>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    {user?.role === 'learner'
                      ? 'Start Learning'
                      : user?.role === 'teacher'
                      ? 'View Courses'
                      : 'View Statistics'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
} 