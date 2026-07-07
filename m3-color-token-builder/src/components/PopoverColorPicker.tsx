import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HslStringColorPicker, HexColorInput } from 'react-colorful';
import { hslToHex, hexToHsl } from '../lib/colorUtils';
import './PopoverColorPicker.css';

interface PopoverColorPickerProps {
    color: string;
    onChange: (color: string) => void;
    style?: React.CSSProperties; // for sizing the swatch trigger
}

export const PopoverColorPicker: React.FC<PopoverColorPickerProps> = ({ color, onChange, style }) => {
    const popover = useRef<HTMLDivElement>(null);
    const toggleBtn = useRef<HTMLDivElement>(null);
    const [isOpen, toggle] = useState(false);
    const [bounds, setBounds] = useState({ top: 0, left: 0 });

    const handleToggle = () => {
        if (!isOpen && toggleBtn.current) {
            const rect = toggleBtn.current.getBoundingClientRect();
            let leftPos = rect.left + window.scrollX;
            if (leftPos + 250 > window.innerWidth) {
                leftPos = window.innerWidth - 260;
            }
            setBounds({
                top: rect.bottom + window.scrollY + 8,
                left: Math.max(10, leftPos),
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
            toggle(false);
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
        <div className="color-picker-wrap">
            {/* Swatch — backgroundColor must remain inline (dynamic runtime value) */}
            <div
                ref={toggleBtn}
                className="color-picker-swatch"
                style={{ backgroundColor: color, ...style }}
                title="Pick a color"
                onClick={handleToggle}
            />

            {isOpen && createPortal(
                <div
                    ref={popover}
                    className="color-picker-popover"
                    style={{ top: bounds.top, left: bounds.left }}
                >
                    <HslStringColorPicker
                        color={color}
                        onChange={onChange}
                        style={{ width: '100%', height: '160px' }}
                    />

                    <div className="color-picker-hsl-row">
                        {[
                            { label: 'H', value: h, onChange: (v: string) => updateHsl(v, s.toString(), l.toString()) },
                            { label: 'S', value: s, onChange: (v: string) => updateHsl(h.toString(), v, l.toString()) },
                            { label: 'L', value: l, onChange: (v: string) => updateHsl(h.toString(), s.toString(), v) },
                        ].map(({ label, value, onChange: onCh }) => (
                            <div key={label} className="color-picker-hsl-field">
                                <span className="color-picker-hsl-label">{label}</span>
                                <input
                                    type="text"
                                    className="color-picker-hsl-input"
                                    value={value}
                                    onChange={e => onCh(e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="color-picker-hex-row">
                        <span className="color-picker-hex-label">HEX</span>
                        <HexColorInput
                            color={hslToHex(color)}
                            onChange={(newHex) => onChange(hexToHsl(newHex))}
                            prefixed
                            className="color-picker-hex-input"
                        />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};
