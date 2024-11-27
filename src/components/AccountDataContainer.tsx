import { ReactNode } from "react";

type AccountDataContainerProps = {
  title: string;
  children: ReactNode[];
};

const AccountDataContainer: React.FC<AccountDataContainerProps> = ({
  title,
  children,
}) => (
  <div className="grid grid-cols-8 gap-x-4 gap-y-3">
    <div className="col-span-8 mb-2">
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    {children}
  </div>
);

export default AccountDataContainer;
