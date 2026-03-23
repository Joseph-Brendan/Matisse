import React, { useState, useEffect } from 'react';
import { PopoverColorPicker } from './PopoverColorPicker';

interface AddKeyColorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (name: string, value: string) => void;
}

export const AddKeyColorModal: React.FC<AddKeyColorModalProps> = ({ isOpen, onClose, onAdd }) => {
    const [name, setName] = useState<string>('');
    const [value, setValue] = useState<string>('hsl(200, 50%, 50%)');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setValue('hsl(200, 50%, 50%)');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) {
            alert("Please enter a valid name.");
            return;
        }
        onAdd(trimmed, value);
        onClose();
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div className="card" style={{ width: '90%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Add Key Color</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' }}>&times;</button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Color Role Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            required
                            style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '1rem' }}
                            placeholder="e.g. success, info, warning"
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>Seed Color</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <PopoverColorPicker
                                color={value}
                                onChange={setValue}
                                style={{ width: '48px', height: '48px', borderRadius: '6px', cursor: 'pointer' }}
                            />
                            <input
                                type="text"
                                value={value}
                                onChange={e => setValue(e.target.value)}
                                required
                                style={{ flex: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontFamily: 'monospace', fontSize: '1rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button type="button" onClick={onClose} style={{ padding: '0.75rem 1.5rem', border: '1px solid #d1d5db', background: '#fff', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                        <button type="submit" style={{ padding: '0.75rem 1.5rem', border: 'none', background: '#3b82f6', color: '#fff', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Add Key Color</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
