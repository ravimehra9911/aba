import {
  FolderIcon,
  InboxIcon,
  LockClosedIcon,
  Squares2X2Icon,
  TrophyIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

const UserData = [
  {
    id: 1,
    name: 'Dashboard',
    link: '/dashboard/user',
    icon: <Squares2X2Icon className="h-6 w-6" />,
  },
  {
    id: 2,
    name: 'Orders',
    link: '/dashboard/orders',
    icon: <InboxIcon className="h-6 w-6" />,
  },
  {
    id: 3,
    name: 'Courses',
    link: '/dashboard/courses',
    icon: <FolderIcon className="h-6 w-6" />,
  },
  {
    id: 4,
    name: 'Profile',
    link: '/dashboard/profile',
    icon: <UserIcon className="h-6 w-6" />,
  },
  {
    id: 5,
    name: 'Certificates',
    link: '/dashboard/certificates',
    icon: <TrophyIcon className="h-6 w-6" />,
  },
  {
    id: 6,
    name: 'Logout',
    link: '/',
    icon: <LockClosedIcon className="h-6 w-6" />,
  },
];

export { UserData };
