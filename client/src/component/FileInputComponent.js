import { useRef } from "react";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";

export default function FileInputComponent({ setState }) {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContents = e.target.result;
      setState(fileContents);
    };
    reader.readAsText(event.target.files[0]);
  };

  return (
    <>
      <Button onClick={handleButtonClick} className="mx-2" variant="success">
        File
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
}
