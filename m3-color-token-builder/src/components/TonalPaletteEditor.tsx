import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useColorStore } from '../store/useColorStore';
import { PopoverColorPicker } from './PopoverColorPicker';
import './TonalPaletteEditor.css';

export const TonalPaletteEditor: React.FC = () => {
    const { palettes, updateToneHex } = useColorStore();
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="tonal-editor">
            {/* Collapsible header */}
            <div className="tonal-editor-header" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="tonal-editor-header-text">
                    <h2 className="tonal-editor-title">Tonal Palettes</h2>
                    <p className="tonal-editor-subtitle">
                        Automatically generated using HCT color science. Tone 0 is black, 100 is white.
                    </p>
                </div>
                <button className="tonal-editor-toggle" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
            </div>

            {/* Palette list */}
            {isExpanded && (
                <div className="tonal-editor-list">
                    {palettes.map((palette) => (
                        <div key={palette.keyColor} className="tonal-palette-row">
                            <h3 className="tonal-palette-name">{palette.keyColor}</h3>

                            <div className="tonal-palette-scroll">
                                <div className="tonal-strip">
                                    {palette.tones.map((toneObj, index) => {
                                        const isLight = toneObj.tone > 50;
                                        const isFirst = index === 0;
                                        const isLast = index === palette.tones.length - 1;

                                        return (
                                            <div
                                                key={toneObj.tone}
                                                className={[
                                                    'tonal-cell',
                                                    isFirst ? 'tonal-cell--first' : '',
                                                    isLast  ? 'tonal-cell--last'  : '',
                                                ].join(' ')}
                                                style={{ backgroundColor: toneObj.value }}
                                                title={`Tone ${toneObj.tone}: ${toneObj.value}`}
                                            >
                                                <PopoverColorPicker
                                                    color={toneObj.value}
                                                    onChange={(val) => updateToneHex(palette.keyColor, toneObj.tone, val)}
                                                    style={{ width: '20px', height: '20px', borderRadius: '4px', cursor: 'pointer', marginBottom: '0.25rem' }}
                                                />
                                                <span className={`tonal-cell-label tonal-cell-label--${isLight ? 'dark' : 'light'}`}>
                                                    {toneObj.tone}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
