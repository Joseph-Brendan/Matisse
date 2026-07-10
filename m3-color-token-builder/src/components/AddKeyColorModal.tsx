import React, { useState } from 'react';
import { PopoverColorPicker } from './PopoverColorPicker';
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import { showAlert } from '../store/useConfirmStore';
import './AddKeyColorModal.css';

interface AddKeyColorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string, value: string) => void;
}

export const AddKeyColorModal: React.FC<AddKeyColorModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<string>('hsl(200, 50%, 50%)');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) {
            showAlert('Invalid Name', 'Please enter a valid color role name.');
            return;
        }
        onAdd(trimmed, value);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-glass-card">
                {/* Header */}
                <div className="modal-header">
                    <h2 className="modal-title">Add Key Color</h2>
                    <button className="modal-close-btn" onClick={onClose} aria-label="Close">×</button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="modal-form">
                    {/* Color Role Name */}
                    <div className="modal-field">
                        <label className="modal-label">Color Role Name</label>
                        <input
                            className="modal-input"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="e.g. success, info, warning"
                        />
                    </div>

                    {/* Seed Color */}
                    <div className="modal-field">
                        <label className="modal-label">Seed Color</label>
                        <div className="modal-color-row">
                            <PopoverColorPicker
                                color={value}
                                onChange={setValue}
                                style={{ width: '48px', height: '48px', borderRadius: '10px', cursor: 'pointer', flexShrink: 0 }}
                            />
                            <input
                                className="modal-input modal-input--mono"
                                type="text"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="modal-actions">
                        <GlossyButton
                            type="button"
                            variant="ghost"
                            size="md"
                            onClick={onClose}
                        >
                            Cancel
                        </GlossyButton>
                        <GlossyButton
                            type="submit"
                            variant="primary"
                            size="md"
                        >
                            Add Key Color
                        </GlossyButton>
                    </div>
                </form>
            </div>
        </div>
    );
};
