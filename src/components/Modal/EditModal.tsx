import React, { useState, useEffect } from 'react';
import styles from './EditModal.module.scss';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: Record<string, any>;
  onSave: (updatedData: Record<string, any>) => void;
}

const EditModal: React.FC<EditModalProps> = ({ isOpen, onClose, initialData, onSave }) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Edit Information</h2>
        <form onSubmit={handleSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div className={styles.formGroup} key={`field-${key}`}>
              <label>{key}</label>
              <input
                type="text"
                name={key}
                value={value as string}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>Cancel</button>
            <button type="submit" className={styles.save}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
