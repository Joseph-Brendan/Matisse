export type KeyColorName =
  | "primary"
  | "secondary"
  | "tertiary"
  | "neutral"
  | "neutralVariant"
  | "error"
  | "success"
  | "warning"
  | "info"
  | string;

export type KeyColor = {
  name: KeyColorName;
  value: string;
};

export type ToneValue = 0 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 95 | 98 | 99 | 100 | number;

export type PaletteTone = {
  tone: number;
  value: string;
};

export type TonalPalette = {
  keyColor: KeyColorName;
  tones: PaletteTone[];
};

export type RoleToken = {
  name: string;
  reference: string;
  resolvedValue: string;
  theme: "light" | "dark";
  editable: boolean;
};

export type TokenExport = {
  color: {
    key: Record<string, string>;
    palette: Record<string, Record<string, string>>;
    role: {
      light: Record<string, string>;
      dark: Record<string, string>;
    };
  };
};
