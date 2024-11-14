import { ReactNode } from "react";

export interface FormHeaderProps {
  children: ReactNode;
}

const FormHeader: React.FC<FormHeaderProps> = ({ children }) => {
  return <div data-testid="form-header">{children}</div>;
};

export default FormHeader;
