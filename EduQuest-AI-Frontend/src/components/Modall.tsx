import { Modal } from "react-bootstrap";
import TemplateDemo from "./FileDrop";
import { Button } from "primereact/button";
import { useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onCloseModal: () => void;
}

function Modall({ isOpen, onCloseModal }: ModalProps) {
  return (
    <Modal show={isOpen} onHide={onCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Create your Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TemplateDemo />
      </Modal.Body>
      <Modal.Footer>
        <Button label="Close" severity="secondary" onClick={onCloseModal} />
        <Button label="Upload PDF" severity="help" onClick={onCloseModal} />
      </Modal.Footer>
    </Modal>
  );
}

export default Modall;
