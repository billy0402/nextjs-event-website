type Props = {
  children?: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ClientLayout;
