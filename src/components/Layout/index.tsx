import { useRouter } from 'next/router';

import AdminLayout from './AdminLayout';
import ClientLayout from './ClientLayout';

type Props = {
  children?: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const router = useRouter();

  const { pathname } = router;

  return pathname.startsWith('/admin') && !pathname.includes('auth') ? (
    <AdminLayout>{children}</AdminLayout>
  ) : (
    <ClientLayout>{children}</ClientLayout>
  );
};

export default Layout;
