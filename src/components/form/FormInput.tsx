import { useField } from "formik";

export interface FormInputProps {
  inputType: "text" | "email" | "password";
  labelText: string;
  inputName: string;
}

const FormInput: React.FC<FormInputProps> = ({
  inputType,
  labelText,
  inputName,
}) => {
  const [field, meta] = useField(inputName);

  return (
    <div data-testid="form-input" className="mb-4">
      <label className="block text-sm font-bold mb-2" htmlFor={inputName}>
        {labelText}
      </label>
      <input
        id={inputName}
        {...field}
        type={inputType}
        className={`shadow border rounded-md w-full py-2 px-3 text-gray-700 leading-tight
          ${meta.touched && meta.error ? "outline outline-red-400" : ""}
          ${meta.touched && !meta.error ? "outline outline-green-300" : ""}`}
      />
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-2">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormInput;
