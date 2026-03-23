import type { KeyColor } from "../types";

export const DEFAULT_KEY_COLORS: KeyColor[] = [
    { name: "primary", value: "hsl(256, 34%, 48%)" },
    { name: "secondary", value: "hsl(259, 11%, 40%)" },
    { name: "tertiary", value: "hsl(340, 21%, 41%)" },
    { name: "neutral", value: "hsl(276, 3%, 37%)" },
    { name: "neutralVariant", value: "hsl(260, 4%, 38%)" },
];

export const DEFAULT_LIGHT_ROLES: Record<string, string> = {
    primary: "{color.key.primary}",
    onPrimary: "{color.palette.primary.100}",
    primaryContainer: "{color.palette.primary.80}",
    onPrimaryContainer: "{color.palette.primary.30}",

    secondary: "{color.palette.secondary.40}",
    onSecondary: "{color.palette.secondary.100}",
    secondaryContainer: "{color.palette.secondary.80}",
    onSecondaryContainer: "{color.palette.secondary.30}",

    tertiary: "{color.palette.tertiary.40}",
    onTertiary: "{color.palette.tertiary.100}",
    tertiaryContainer: "{color.palette.tertiary.80}",
    onTertiaryContainer: "{color.palette.tertiary.30}",

    error: "{color.palette.error.40}",
    onError: "{color.palette.error.100}",
    errorContainer: "{color.palette.error.80}",
    onErrorContainer: "{color.palette.error.30}",

    background: "{color.palette.neutral.98}",
    onBackground: "{color.palette.neutral.10}",

    surface: "{color.palette.neutral.98}",
    onSurface: "{color.palette.neutral.10}",
    surfaceVariant: "{color.palette.neutralVariant.90}",
    onSurfaceVariant: "{color.palette.neutralVariant.30}",

    outline: "{color.palette.neutralVariant.50}",
    outlineVariant: "{color.palette.neutralVariant.80}",

    inverseSurface: "{color.palette.neutral.20}",
    inverseOnSurface: "{color.palette.neutral.95}",
    inversePrimary: "{color.palette.primary.80}",

    surfaceDim: "{color.palette.neutral.87}",
    surfaceBright: "{color.palette.neutral.98}",
    surfaceContainerLowest: "{color.palette.neutral.100}",
    surfaceContainerLow: "{color.palette.neutral.96}",
    surfaceContainer: "{color.palette.neutral.94}",
    surfaceContainerHigh: "{color.palette.neutral.92}",
    surfaceContainerHighest: "{color.palette.neutral.90}",
};

export const DEFAULT_DARK_ROLES: Record<string, string> = {
    primary: "{color.key.primary}",
    onPrimary: "{color.palette.primary.20}",
    primaryContainer: "{color.palette.primary.30}",
    onPrimaryContainer: "{color.palette.primary.90}",

    secondary: "{color.palette.secondary.80}",
    onSecondary: "{color.palette.secondary.20}",
    secondaryContainer: "{color.palette.secondary.30}",
    onSecondaryContainer: "{color.palette.secondary.90}",

    tertiary: "{color.palette.tertiary.80}",
    onTertiary: "{color.palette.tertiary.20}",
    tertiaryContainer: "{color.palette.tertiary.30}",
    onTertiaryContainer: "{color.palette.tertiary.90}",

    error: "{color.palette.error.80}",
    onError: "{color.palette.error.20}",
    errorContainer: "{color.palette.error.30}",
    onErrorContainer: "{color.palette.error.90}",

    background: "{color.palette.neutral.6}",
    onBackground: "{color.palette.neutral.90}",

    surface: "{color.palette.neutral.6}",
    onSurface: "{color.palette.neutral.90}",
    surfaceVariant: "{color.palette.neutralVariant.30}",
    onSurfaceVariant: "{color.palette.neutralVariant.80}",

    outline: "{color.palette.neutralVariant.60}",
    outlineVariant: "{color.palette.neutralVariant.30}",

    inverseSurface: "{color.palette.neutral.90}",
    inverseOnSurface: "{color.palette.neutral.20}",
    inversePrimary: "{color.palette.primary.40}",

    surfaceDim: "{color.palette.neutral.6}",
    surfaceBright: "{color.palette.neutral.24}",
    surfaceContainerLowest: "{color.palette.neutral.4}",
    surfaceContainerLow: "{color.palette.neutral.10}",
    surfaceContainer: "{color.palette.neutral.12}",
    surfaceContainerHigh: "{color.palette.neutral.17}",
    surfaceContainerHighest: "{color.palette.neutral.22}",
};
