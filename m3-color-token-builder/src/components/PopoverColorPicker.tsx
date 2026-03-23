import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HslStringColorPicker, HexColorInput } from 'react-colorful';
import { hslToHex, hexToHsl } from '../lib/colorUtils';

interface PopoverColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    style?: React.CSSProperties;
}

export const PopoverColorPicker: React.FC<PopoverColorPickerProps> = ({ color, onChange, style }) => {
    const popover = useRef<HTMLDivElement>(null);
    const toggleBtn = useRef<HTMLDivElement>(null);
    const [isOpen, toggle] = useState(false);
    const [bounds, setBounds] = useState({ top: 0, left: 0 });

    const handleToggle = () => {
        if (!isOpen && toggleBtn.current) {
            const rect = toggleBtn.current.getBoundingClientRect();

            // Adjust to prevent rightmost clipping
            let leftPos = rect.left + window.scrollX;
            if (leftPos + 250 > window.innerWidth) { // 240px is exact popover width, 10px buffer
                leftPos = window.innerWidth - 260; // 240px + 20px right margin
            }

            setBounds({
                top: rect.bottom + window.scrollY + 8,
                left: Math.max(10, leftPos)
            });
        }
        toggle(!isOpen);
    };

    const match = color.match(/hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/);
    const h = match ? parseInt(match[1], 10) : 0;
    const s = match ? parseInt(match[2], 10) : 0;
    const l = match ? parseInt(match[3], 10) : 0;

    const updateHsl = (newH: string, newS: string, newL: string) => {
        const parsedH = Math.max(0, Math.min(360, parseInt(newH) || 0));
        const parsedS = Math.max(0, Math.min(100, parseInt(newS) || 0));
        const parsedL = Math.max(0, Math.min(100, parseInt(newL) || 0));
        onChange(`hsl(${parsedH}, ${parsedS}%, ${parsedL}%)`);
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                popover.current && !popover.current.contains(e.target as Node) &&
                toggleBtn.current && !toggleBtn.current.contains(e.target as Node)
            ) {
                toggle(false);
            }
        };

        const handleScroll = (e: Event) => {
            if (popover.current && popover.current.contains(e.target as Node)) return;
            toggle(false); // Close safely on scroll to prevent floating disjoints
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [isOpen]);

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div
                ref={toggleBtn}
                style={{
                    backgroundColor: color,
                    border: '1px solid rgba(0,0,0,0.1)',
                    ...style
                }}
                title="Pick a color"
                onClick={handleToggle}
            />

            {isOpen && createPortal(
                <div
                    ref={popover}
                    style={{
                        position: 'absolute',
                        top: bounds.top,
                        left: bounds.left,
                        zIndex: 99999,
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                        padding: '12px',
                        width: '240px',
                        boxSizing: 'border-box'
                    }}
                >
                    <HslStringColorPicker color={color} onChange={onChange} style={{ width: '100%', height: '160px' }} />

                    <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '4px', padding: '4px', background: '#fff' }}>
                            <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, width: '12px' }}>H</span>
                            <input type="text" value={h} onChange={e => updateHsl(e.target.value, s.toString(), l.toString())} style={{ width: '100%', minWidth: 0, border: 'none', background: 'transparent', fontSize: '12px', outline: 'none', padding: 0 }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '4px', padding: '4px', background: '#fff' }}>
                            <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, width: '12px' }}>S</span>
                            <input type="text" value={s} onChange={e => updateHsl(h.toString(), e.target.value, l.toString())} style={{ width: '100%', minWidth: 0, border: 'none', background: 'transparent', fontSize: '12px', outline: 'none', padding: 0 }} />
                        </div>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '4px', padding: '4px', background: '#fff' }}>
                            <span style={{ fontSize: '10px', color: '#6b7280', fontWeight: 600, width: '12px' }}>L</span>
                            <input type="text" value={l} onChange={e => updateHsl(h.toString(), s.toString(), e.target.value)} style={{ width: '100%', minWidth: 0, border: 'none', background: 'transparent', fontSize: '12px', outline: 'none', padding: 0 }} />
                        </div>
                    </div>

                    <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563' }}>HEX</span>
                        <HexColorInput
                            color={hslToHex(color)}
                            onChange={(newHex) => onChange(hexToHsl(newHex))}
                            prefixed
                            style={{
                                width: '100%',
                                padding: '4px 8px',
                                border: '1px solid #d1d5db',
                                borderRadius: '4px',
                                fontSize: '12px',
                                fontFamily: 'monospace',
                                textTransform: 'uppercase',
                                outline: 'none'
                            }}
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
