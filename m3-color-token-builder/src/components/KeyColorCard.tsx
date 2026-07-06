import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useColorStore } from '../store/useColorStore';
import { PopoverColorPicker } from './PopoverColorPicker';
import { AddKeyColorModal } from './AddKeyColorModal';
import { GlossyButton } from '../design-system/components/Button/GlossyButton';
import './KeyColorCard.css';

export const KeyColorCard: React.FC = () => {
    const { keyColors, updateKeyColor, addOptionalColor, removeOptionalColor } = useColorStore();
    const requiredColors = ['primary', 'secondary', 'tertiary', 'neutral', 'neutralVariant'];
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="key-color-section">
            {/* Header */}
            <div className="key-color-header">
                <h2 className="key-color-title">Key Colors</h2>
                <GlossyButton
                    variant="outline"
                    size="sm"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus size={15} />
                    Add Key Color
                </GlossyButton>
            </div>

            {/* Grid of color cards */}
            <div className="key-color-grid">
                {keyColors.map((color) => {
                    const isRequired = requiredColors.includes(color.name);
                    return (
                        <div key={color.name} className="key-color-card">
                            <div className="key-color-card-header">
                                <label className="key-color-card-label">{color.name}</label>
                                {!isRequired && (
                                    <button
                                        className="key-color-remove-btn"
                                        onClick={() => removeOptionalColor(color.name)}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>

                            <div className="key-color-input-row">
                                <PopoverColorPicker
                                    color={color.value}
                                    onChange={(val) => updateKeyColor(color.name, val)}
                                    style={{ width: '40px', height: '40px', borderRadius: '10px', cursor: 'pointer', flexShrink: 0 }}
                                />
                                <input
                                    className="key-color-text-input"
                                    type="text"
                                    value={color.value}
                                    onChange={(e) => updateKeyColor(color.name, e.target.value)}
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
