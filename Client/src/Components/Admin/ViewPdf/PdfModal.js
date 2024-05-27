import React, { useState } from "react";
import Modal from "./Modal"; // Adjusted import path to navigate up one directory level
import { Document, Page } from "pdfjs-dist";

const PdfModal = ({ pdfUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <button onClick={openModal}>View CV</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <div style={{ width: "80%", height: "80%" }}>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default PdfModal;
