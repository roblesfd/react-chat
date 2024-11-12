import "@testing-library/jest-dom";
import FileUploader from "../../components/FileUploader";
import { render, screen } from "@testing-library/react";

describe("FileUploader", () => {
  it("renderiza el componente", () => {
    render(<FileUploader />);
    expect(screen.getByTestId("file-uploader")).toBeInTheDocument();
  });
});
