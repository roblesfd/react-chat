import { ReactNode } from "react";

export interface FormFooterProps {
  children: ReactNode;
}

const FormFooter: React.FC<FormFooterProps> = ({ children }) => {
  return (
    <div data-testid="form-footer">
      <div className="flex items-center justify-between mt-8 gap-6">
        {children}
      </div>
    </div>
  );
};

export default FormFooter;
