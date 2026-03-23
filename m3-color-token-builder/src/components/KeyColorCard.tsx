import React, { useState } from 'react';
import { useColorStore } from '../store/useColorStore';
import { PopoverColorPicker } from './PopoverColorPicker';
import { AddKeyColorModal } from './AddKeyColorModal';

export const KeyColorCard: React.FC = () => {
    const { keyColors, updateKeyColor, addOptionalColor, removeOptionalColor } = useColorStore();
    const requiredColors = ["primary", "secondary", "tertiary", "neutral", "neutralVariant"];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Key Colors</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '0.875rem' }}>
                    + Add Key Color
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                {keyColors.map((color) => {
                    const isRequired = requiredColors.includes(color.name);
                    return (
                        <div key={color.name} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <label style={{ fontWeight: 600, textTransform: 'capitalize', fontSize: '0.875rem' }}>{color.name}</label>
                                {!isRequired && (
                                    <button onClick={() => removeOptionalColor(color.name)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.75rem' }}>Remove</button>
                                )}
                            </div>

                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                <PopoverColorPicker
                                    color={color.value}
                                    onChange={(val) => updateKeyColor(color.name, val)}
                                    style={{ width: '40px', height: '40px', borderRadius: '4px', cursor: 'pointer' }}
                                />
                                <input
                                    type="text"
                                    value={color.value}
                                    onChange={(e) => updateKeyColor(color.name, e.target.value)}
                                    style={{ flex: 1, minWidth: 0, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontFamily: 'monospace' }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <AddKeyColorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={(name, value) => addOptionalColor(name, value)}
            />
        </div>
    );
};
