import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useColorStore } from '../store/useColorStore';

export const RoleMappingTable: React.FC = () => {
    const { roles, palettes, updateRoleReference } = useColorStore();
    const [activeTab, setActiveTab] = useState<'light' | 'dark'>('light');
    const [isExpanded, setIsExpanded] = useState(true);

    const currentRoles = roles[activeTab];

    // Flatten all available palette tones into a single array for the dropdown options
    const paletteOptions = palettes.flatMap(p =>
        p.tones.map(t => ({
            label: `{color.palette.${p.keyColor}.${t.tone}}`,
            value: `{color.palette.${p.keyColor}.${t.tone}}`,
            hexValue: t.value
        }))
    );

    return (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ cursor: 'pointer', flex: 1 }} onClick={() => setIsExpanded(!isExpanded)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Role Mapping</h2>
                        {isExpanded ? <ChevronUp size={24} color="#6b7280" /> : <ChevronDown size={24} color="#6b7280" />}
                    </div>
                    <p style={{ margin: '0.25rem 0 0', color: '#6b7280', fontSize: '0.875rem' }}>Assign palette tones to semantic roles.</p>
                </div>
                <div style={{ display: 'flex', background: '#f3f4f6', padding: '0.25rem', borderRadius: '8px' }}>
                    <button
                        onClick={() => setActiveTab('light')}
                        style={{ padding: '0.5rem 1rem', background: activeTab === 'light' ? '#fff' : 'transparent', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                        Light
                    </button>
                    <button
                        onClick={() => setActiveTab('dark')}
                        style={{ padding: '0.5rem 1rem', background: activeTab === 'dark' ? '#fff' : 'transparent', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                        Dark
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                                <th style={{ padding: '1rem', fontWeight: 600, color: '#4b5563' }}>Role Name</th>
                                <th style={{ padding: '1rem', fontWeight: 600, color: '#4b5563' }}>Swatch</th>
                                <th style={{ padding: '1rem', fontWeight: 600, color: '#4b5563' }}>Source Reference</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentRoles.map((role) => (
                                <tr key={role.name} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '1rem', fontWeight: 500, fontFamily: 'monospace' }}>{role.name}</td>
                                    <td style={{ padding: '1rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <div style={{ width: '24px', height: '24px', borderRadius: '4px', backgroundColor: role.resolvedValue, border: '1px solid #e5e7eb' }} />
                                            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{role.resolvedValue}</span>
                                        </div>
                                    </td>
                                    <td style={{ padding: '1rem' }}>
                                        {role.name === 'primary' ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <span style={{ padding: '0.5rem', background: '#fef3c7', color: '#92400e', borderRadius: '4px', fontSize: '0.875rem', fontFamily: 'monospace' }}>
                                                    {role.reference}
                                                </span>
                                                <span style={{ fontSize: '0.75rem', color: '#d97706' }} title="Custom override: primary role uses the exact seed color, not standard Material tone mapping.">⚠️ Override</span>
                                            </div>
                                        ) : (
                                            <select
                                                value={role.reference}
                                                onChange={(e) => updateRoleReference(activeTab, role.name, e.target.value)}
                                                style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', width: '100%', fontFamily: 'monospace', fontSize: '0.875rem' }}
                                            >
                                                {/* Include the current reference if it's somehow not in the options */}
                                                <option value={role.reference}>{role.reference}</option>
                                                <option disabled>──────────</option>
                                                {paletteOptions.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
