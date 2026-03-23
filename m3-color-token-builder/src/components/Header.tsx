import React from 'react';
import { Download } from 'lucide-react';

export const Header: React.FC<{ onExport: () => void }> = ({ onExport }) => {
    return (
        <header className="header" style={{ borderBottom: '1px solid #e5e7eb', background: 'var(--header-bg, #fff)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 600, fontFamily: '"Playfair Display", serif', fontStyle: 'italic', letterSpacing: '-0.02em', color: '#111827' }}>Matisse</h1>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={onExport}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 500, cursor: 'pointer' }}>
                        <Download size={18} />
                        Export JSON
                    </button>
                </div>
            </div>
        </header>
    );
};
