import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useColorStore } from '../store/useColorStore';
import { PopoverColorPicker } from './PopoverColorPicker';

export const TonalPaletteEditor: React.FC = () => {
    const { palettes, updateToneHex } = useColorStore();
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
            <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div>
                    <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Tonal Palettes</h2>
                    <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>Automatically generated using HCT color science. Tone 0 is black, 100 is white.</p>
                </div>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    {isExpanded ? <ChevronUp size={24} color="#6b7280" /> : <ChevronDown size={24} color="#6b7280" />}
                </button>
            </div>

            {isExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {palettes.map((palette) => (
                        <div key={palette.keyColor} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <h3 style={{ margin: 0, fontSize: '1rem', textTransform: 'capitalize', fontWeight: 600 }}>{palette.keyColor}</h3>
                            </div>
                            <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb', width: '100%' }}>
                                <div style={{ display: 'flex', minWidth: '800px' }}>
                                    {palette.tones.map((toneObj, index) => {
                                        // Determine text color for contrast based on tone roughly:
                                        // Tones > 50 are usually light enough for dark text. 
                                        const isLight = toneObj.tone > 50;
                                        const isFirst = index === 0;
                                        const isLast = index === palette.tones.length - 1;

                                        return (
                                            <div
                                                key={toneObj.tone}
                                                style={{
                                                    flex: 1,
                                                    backgroundColor: toneObj.value,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '1rem 0', // Reduced horizontal padding to fit text
                                                    color: isLight ? '#000000' : '#ffffff',
                                                    borderTopLeftRadius: isFirst ? '7px' : 0,
                                                    borderBottomLeftRadius: isFirst ? '7px' : 0,
                                                    borderTopRightRadius: isLast ? '7px' : 0,
                                                    borderBottomRightRadius: isLast ? '7px' : 0,
                                                    position: 'relative',
                                                }}
                                                title={`Tone ${toneObj.tone}`}
                                            >
                                                <PopoverColorPicker
                                                    color={toneObj.value}
                                                    onChange={(val) => updateToneHex(palette.keyColor, toneObj.tone, val)}
                                                    style={{ width: '20px', height: '20px', borderRadius: '4px', cursor: 'pointer', marginBottom: '0.25rem' }}
                                                />
                                                <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{toneObj.tone}</span>
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
