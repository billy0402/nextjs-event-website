import Header from './Header';

type Props = {
  children?: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicLayout;
