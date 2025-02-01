import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  PuzzlePieceIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';
import { useAppSelector } from '@/store/hooks';

const teacherNavigation = [
  { name: 'My Courses', href: '/teacher/courses', icon: BookOpenIcon },
  { name: 'Students', href: '/teacher/students', icon: UserGroupIcon },
  { name: 'Analytics', href: '/teacher/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/teacher/settings', icon: Cog6ToothIcon },
];

const learnerNavigation = [
  { name: 'My Learning', href: '/learning', icon: AcademicCapIcon },
  { name: 'Games', href: '/games', icon: PuzzlePieceIcon },
  { name: 'Progress', href: '/progress', icon: ChartBarIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/admin', icon: ChartBarIcon },
  { name: 'Users', href: '/admin/users', icon: UserGroupIcon },
  { name: 'Courses', href: '/admin/courses', icon: BookOpenIcon },
  { name: 'Settings', href: '/admin/settings', icon: Cog6ToothIcon },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Sidebar() {
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);

  const navigation = user?.role === 'teacher'
    ? teacherNavigation
    : user?.role === 'admin'
    ? adminNavigation
    : learnerNavigation;

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
        <div className="flex flex-shrink-0 items-center px-4">
          <Image
            className="h-8 w-auto"
            src="/logo.svg"
            alt="LEPEVA"
            width={32}
            height={32}
            priority
          />
        </div>
        <div className="mt-5 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigation.map((item) => {
              const isActive = router.pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                    'group flex items-center rounded-md px-2 py-2 text-sm font-medium'
                  )}
                >
                  <item.icon
                    className={classNames(
                      isActive
                        ? 'text-gray-500'
                        : 'text-gray-400 group-hover:text-gray-500',
                      'mr-3 h-6 w-6 flex-shrink-0'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
          <div className="group block w-full flex-shrink-0">
            <div className="flex items-center">
              <div>
                <Image
                  className="inline-block h-9 w-9 rounded-full"
                  src={user?.profilePicture || 'https://via.placeholder.com/36'}
                  alt=""
                  width={36}
                  height={36}
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user?.firstName || ''} {user?.lastName || ''}
                </p>
                <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : ''}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 