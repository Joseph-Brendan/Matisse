import { create } from 'zustand';
import type { KeyColor, TonalPalette, RoleToken, KeyColorName } from '../types';
import { DEFAULT_KEY_COLORS, DEFAULT_LIGHT_ROLES, DEFAULT_DARK_ROLES } from '../lib/defaults';
import { generateTones } from '../lib/material';
import { typography as initialTypography } from '../design-system/tokens/typography';
import { spacing as initialSpacing, borderRadius as initialBorderRadius } from '../design-system/tokens/spacing';
import { shadows as initialShadows, elevation as initialElevation } from '../design-system/tokens/shadows';

export interface ProjectSnapshot {
    id: string;
    name: string;
    timestamp: number;
}

interface ColorState {
    keyColors: KeyColor[];
    palettes: TonalPalette[];
    roles: { light: RoleToken[]; dark: RoleToken[] };
    theme: 'light' | 'dark';
    projectName: string;
    history: ProjectSnapshot[];
    checklist: { color: boolean; typography: boolean; spacing: boolean };

    // Typography
    typography: {
        fontFamily: Record<string, string>;
        fontSize: Record<string, string>;
        fontWeight: Record<string, number>;
        lineHeight: Record<string, number>;
        letterSpacing: Record<string, string>;
    };

    // Spacing
    spacing: Record<string, string>;
    borderRadius: Record<string, string>;

    // Shadows & Elevation
    shadows: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        inner: string;
        glow: Record<string, string>;
    };
    elevation: Record<string, string>;

    updateKeyColor: (name: KeyColorName, value: string) => void;
    addOptionalColor: (name: string, value: string) => void;
    removeOptionalColor: (name: string) => void;
    updateRoleReference: (theme: 'light' | 'dark', name: string, reference: string) => void;
    setTheme: (theme: 'light' | 'dark') => void;
    setProjectName: (name: string) => void;
    pushHistory: (snapshot: ProjectSnapshot) => void;
    deleteHistoryItem: (id: string) => void;
    clearHistory: () => void;
    toggleChecklist: (key: 'color' | 'typography' | 'spacing') => void;

    // Tone editing
    addTone: (keyColor: string, tone: number, value: string) => void;
    updateToneHex: (keyColor: string, tone: number, value: string) => void;
    deleteTone: (keyColor: string, tone: number) => void;

    // Design Token Actions
    updateTypographyFamily: (key: string, value: string) => void;
    updateTypographySize: (key: string, value: string) => void;
    updateTypographyWeight: (key: string, value: number) => void;
    updateTypographyLineHeight: (key: string, value: number) => void;
    updateTypographyLetterSpacing: (key: string, value: string) => void;
    updateSpacingValue: (key: string, value: string) => void;
    updateSpacingUnit: (baseUnitPx: number) => void;
    updateBorderRadiusValue: (key: string, value: string) => void;
    updateShadowValue: (key: string, value: string) => void;
    updateElevationValue: (key: string, value: string) => void;
    updateShadowGlow: (key: string, value: string) => void;
}

// Helpers
const resolveReference = (ref: string, keyColors: KeyColor[], palettes: TonalPalette[]): string => {
    if (ref.startsWith('{color.key.')) {
        const keyName = ref.split('.')[2].replace('}', '');
        return keyColors.find((c) => c.name === keyName)?.value || 'hsl(300, 100%, 50%)'; // Error magenta
    }
    if (ref.startsWith('{color.palette.')) {
        const parts = ref.split('.');
        const keyName = parts[2];
        const toneVal = parseInt(parts[3].replace('}', ''), 10);
        const palette = palettes.find((p) => p.keyColor === keyName);
        if (palette) {
            return palette.tones.find((t) => t.tone === toneVal)?.value || 'hsl(300, 100%, 50%)';
        }
    }
    return 'hsl(300, 100%, 50%)';
};

const buildRolesList = (mapping: Record<string, string>, theme: 'light' | 'dark', keyColors: KeyColor[], palettes: TonalPalette[]): RoleToken[] => {
    return Object.entries(mapping).map(([name, reference]) => ({
        name,
        reference,
        resolvedValue: resolveReference(reference, keyColors, palettes),
        theme,
        editable: true,
    }));
};

const resolveAllRoles = (roles: RoleToken[], keyColors: KeyColor[], palettes: TonalPalette[]) => {
    return roles.map(r => ({
        ...r,
        resolvedValue: resolveReference(r.reference, keyColors, palettes)
    }));
};

export const useColorStore = create<ColorState>((set) => {
    const initPalettes = DEFAULT_KEY_COLORS.map(kc => ({
        keyColor: kc.name,
        tones: generateTones(kc.value)
    }));

    const initLightRoles = buildRolesList(DEFAULT_LIGHT_ROLES, 'light', DEFAULT_KEY_COLORS, initPalettes);
    const initDarkRoles = buildRolesList(DEFAULT_DARK_ROLES, 'dark', DEFAULT_KEY_COLORS, initPalettes);

    return {
        keyColors: DEFAULT_KEY_COLORS,
        palettes: initPalettes,
        roles: { light: initLightRoles, dark: initDarkRoles },
        theme: 'light',
        projectName: 'Untitled Project',
        history: JSON.parse(localStorage.getItem('matisse_history') || '[]'),
        checklist: { color: false, typography: false, spacing: false },

        setProjectName: (name) => set({ projectName: name }),

        pushHistory: (snapshot) => set((state) => {
            const updated = [snapshot, ...state.history].slice(0, 20);
            localStorage.setItem('matisse_history', JSON.stringify(updated));
            return { history: updated };
        }),

        deleteHistoryItem: (id) => set((state) => {
            const updated = state.history.filter((h) => h.id !== id);
            localStorage.setItem('matisse_history', JSON.stringify(updated));
            return { history: updated };
        }),

        clearHistory: () => {
            localStorage.removeItem('matisse_history');
            set({ history: [] });
        },

        toggleChecklist: (key) => set((state) => ({
            checklist: { ...state.checklist, [key]: !state.checklist[key] }
        })),

        updateKeyColor: (name, value) => {
            set((state) => {
                const newKeyColors = state.keyColors.map(c => c.name === name ? { ...c, value } : c);
                const newPalettes = state.palettes.map(p => p.keyColor === name ? { ...p, tones: generateTones(value) } : p);

                const newLightRoles = resolveAllRoles(state.roles.light, newKeyColors, newPalettes);
                const newDarkRoles = resolveAllRoles(state.roles.dark, newKeyColors, newPalettes);

                return {
                    keyColors: newKeyColors,
                    palettes: newPalettes,
                    roles: { light: newLightRoles, dark: newDarkRoles }
                };
            });
        },

        addOptionalColor: (name, value) => {
            set((state) => {
                if (state.keyColors.some(k => k.name === name)) return state;
                const newKeyColors = [...state.keyColors, { name, value }];
                const newPalettes = [...state.palettes, { keyColor: name, tones: generateTones(value) }];
                return { keyColors: newKeyColors, palettes: newPalettes };
            });
        },

        removeOptionalColor: (name) => {
            set((state) => {
                const required = ['primary', 'secondary', 'tertiary', 'neutral', 'neutralVariant'];
                if (required.includes(name)) return state;
                return {
                    keyColors: state.keyColors.filter(k => k.name !== name),
                    palettes: state.palettes.filter(p => p.keyColor !== name)
                };
            });
        },

        updateRoleReference: (theme, name, reference) => {
            set((state) => {
                const currentRoles = state.roles[theme];
                const updatedRoles = currentRoles.map(r => r.name === name ? { ...r, reference } : r);
                const resolvedUpdatedRoles = resolveAllRoles(updatedRoles, state.keyColors, state.palettes);
                return {
                    roles: {
                        ...state.roles,
                        [theme]: resolvedUpdatedRoles,
                    }
                };
            });
        },

        setTheme: (theme) => set({ theme }),

        addTone: (keyColor, tone, value) => {
            set((state) => {
                const newPalettes = state.palettes.map(p => {
                    if (p.keyColor !== keyColor) return p;
                    if (p.tones.find(t => t.tone === tone)) return p; // prevent duplicate
                    const newTones = [...p.tones, { tone, value }].sort((a, b) => a.tone - b.tone);
                    return { ...p, tones: newTones };
                });
                return {
                    palettes: newPalettes,
                    roles: {
                        light: resolveAllRoles(state.roles.light, state.keyColors, newPalettes),
                        dark: resolveAllRoles(state.roles.dark, state.keyColors, newPalettes)
                    }
                };
            });
        },

        updateToneHex: (keyColor, tone, value) => {
            set((state) => {
                const newPalettes = state.palettes.map(p => {
                    if (p.keyColor !== keyColor) return p;
                    const newTones = p.tones.map(t => t.tone === tone ? { ...t, value } : t);
                    return { ...p, tones: newTones };
                });
                return {
                    palettes: newPalettes,
                    roles: {
                        light: resolveAllRoles(state.roles.light, state.keyColors, newPalettes),
                        dark: resolveAllRoles(state.roles.dark, state.keyColors, newPalettes)
                    }
                };
            });
        },

        deleteTone: (keyColor, tone) => {
            set((state) => {
                const newPalettes = state.palettes.map(p => {
                    if (p.keyColor !== keyColor) return p;
                    return { ...p, tones: p.tones.filter(t => t.tone !== tone) };
                });
                return {
                    palettes: newPalettes,
                    roles: {
                        light: resolveAllRoles(state.roles.light, state.keyColors, newPalettes),
                        dark: resolveAllRoles(state.roles.dark, state.keyColors, newPalettes)
                    }
                };
            });
        },

        // Typography
        typography: {
            fontFamily: { ...initialTypography.fontFamily },
            fontSize: { ...initialTypography.fontSize },
            fontWeight: { ...initialTypography.fontWeight },
            lineHeight: { ...initialTypography.lineHeight },
            letterSpacing: { ...initialTypography.letterSpacing }
        },
        // Spacing
        spacing: { ...initialSpacing },
        borderRadius: { ...initialBorderRadius },
        // Shadows & Elevation
        shadows: {
            ...initialShadows,
            glow: { ...initialShadows.glow }
        },
        elevation: { ...initialElevation },

        // Design Token Actions
        updateTypographyFamily: (key, value) => set((state) => ({
            typography: {
                ...state.typography,
                fontFamily: { ...state.typography.fontFamily, [key]: value }
            }
        })),

        updateTypographySize: (key, value) => set((state) => ({
            typography: {
                ...state.typography,
                fontSize: { ...state.typography.fontSize, [key]: value }
            }
        })),

        updateTypographyWeight: (key, value) => set((state) => ({
            typography: {
                ...state.typography,
                fontWeight: { ...state.typography.fontWeight, [key]: value }
            }
        })),

        updateTypographyLineHeight: (key, value) => set((state) => ({
            typography: {
                ...state.typography,
                lineHeight: { ...state.typography.lineHeight, [key]: value }
            }
        })),

        updateTypographyLetterSpacing: (key, value) => set((state) => ({
            typography: {
                ...state.typography,
                letterSpacing: { ...state.typography.letterSpacing, [key]: value }
            }
        })),

        updateSpacingValue: (key, value) => set((state) => ({
            spacing: { ...state.spacing, [key]: value }
        })),

        updateSpacingUnit: (baseUnitPx) => set((state) => {
            const newSpacing = { ...state.spacing };
            const multipliers: Record<string, number> = {
                '0.5': 0.125,
                '1': 0.25,
                '1.5': 0.375,
                '2': 0.5,
                '2.5': 0.625,
                '3': 0.75,
                '3.5': 0.875,
                '4': 1,
                '5': 1.25,
                '6': 1.5,
                '7': 1.75,
                '8': 2,
                '9': 2.25,
                '10': 2.5,
                '11': 2.75,
                '12': 3,
                '14': 3.5,
                '16': 4,
                '20': 5,
                '24': 6,
                '28': 7,
                '32': 8,
                '36': 9,
                '40': 10,
                '44': 11,
                '48': 12,
                '52': 13,
                '56': 14,
                '60': 15,
                '64': 16,
                '72': 18,
                '80': 20,
                '96': 24,
            };
            for (const [key, mult] of Object.entries(multipliers)) {
                const valueInRem = (baseUnitPx * mult) / 16;
                newSpacing[key] = `${valueInRem}rem`;
            }
            return { spacing: newSpacing };
        }),

        updateBorderRadiusValue: (key, value) => set((state) => ({
            borderRadius: { ...state.borderRadius, [key]: value }
        })),

        updateShadowValue: (key, value) => set((state) => ({
            shadows: { ...state.shadows, [key]: value }
        })),

        updateElevationValue: (key, value) => set((state) => ({
            elevation: { ...state.elevation, [key]: value }
        })),

        updateShadowGlow: (key, value) => set((state) => ({
            shadows: {
                ...state.shadows,
                glow: { ...state.shadows.glow, [key]: value }
            }
        }))
    };
});
