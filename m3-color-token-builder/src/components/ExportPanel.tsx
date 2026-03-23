import React from 'react';
import { useColorStore } from '../store/useColorStore';

interface ExportPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({ isOpen, onClose }) => {
    const { keyColors, palettes, roles } = useColorStore();

    if (!isOpen) return null;

    const generateJSON = () => {
        const keyMap: Record<string, string> = {};
        keyColors.forEach(c => { keyMap[c.name] = c.value; });

        const paletteMap: Record<string, Record<string, string>> = {};
        palettes.forEach(p => {
            paletteMap[p.keyColor] = {};
            p.tones.forEach(t => {
                paletteMap[p.keyColor][t.tone.toString()] = t.value;
            });
        });

        const roleLightMap: Record<string, string> = {};
        roles.light.forEach(r => { roleLightMap[r.name] = r.reference; });

        const roleDarkMap: Record<string, string> = {};
        roles.dark.forEach(r => { roleDarkMap[r.name] = r.reference; });

        const exportData = {
            color: {
                key: keyMap,
                palette: paletteMap,
                role: {
                    light: roleLightMap,
                    dark: roleDarkMap
                }
            }
        };

        return JSON.stringify(exportData, null, 2);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateJSON());
        alert("Copied to clipboard!");
    };

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
            <div className="card" style={{ width: '90%', maxWidth: '800px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ margin: 0 }}>Export Tokens</h2>
                    <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#6b7280' }}>&times;</button>
                </div>

                <p style={{ margin: 0, color: '#4b5563' }}>Copy this JSON token set to use in your design system or implementation.</p>

                <div style={{ flex: 1, overflowY: 'auto', background: '#1f2937', color: '#f9fafb', padding: '1.5rem', borderRadius: '8px', fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre-wrap' }}>
                    {generateJSON()}
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    <button onClick={onClose} style={{ padding: '0.75rem 1.5rem', border: '1px solid #d1d5db', background: '#fff', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Close</button>
                    <button onClick={handleCopy} style={{ padding: '0.75rem 1.5rem', border: 'none', background: '#3b82f6', color: '#fff', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>Copy to Clipboard</button>
                </div>
            </div>
        </div>
    );
};
