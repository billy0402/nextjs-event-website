import { useRouter } from 'next/router';

import AdminLayout from './AdminLayout';
import AuthLayout from './AuthLayout';
import PublicLayout from './PublicLayout';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  const { pathname } = router;

  return pathname.includes('auth') ? (
    <AuthLayout>{children}</AuthLayout>
  ) : pathname.startsWith('/admin') ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
};

export default Layout;
