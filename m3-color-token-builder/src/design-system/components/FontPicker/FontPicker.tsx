import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronDown, Check, Upload, Type } from 'lucide-react';
import { GOOGLE_FONTS, CATEGORY_LABELS, googleFontsUrl } from './googleFonts';
import type { FontCategory } from './googleFonts';
import './FontPicker.css';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CustomFont {
  family: string;
  url: string; // object URL
  format: string; // 'woff2' | 'woff' | 'truetype' | 'opentype'
}

export interface FontPickerProps {
  value: string;
  onChange: (family: string) => void;
  placeholder?: string;
  id?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const loadedFonts = new Set<string>();

function loadGoogleFont(family: string, variants = '400;700') {
  if (loadedFonts.has(family)) return;
  loadedFonts.add(family);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = googleFontsUrl(family, variants);
  document.head.appendChild(link);
}

function injectCustomFont(font: CustomFont) {
  const style = document.createElement('style');
  style.textContent = `@font-face {
  font-family: '${font.family}';
  src: url('${font.url}') format('${font.format}');
  font-weight: 100 900;
  font-style: normal;
}`;
  document.head.appendChild(style);
}

function formatFromExtension(ext: string): string {
  switch (ext.toLowerCase()) {
    case 'woff2': return 'woff2';
    case 'woff': return 'woff';
    case 'ttf': return 'truetype';
    case 'otf': return 'opentype';
    default: return 'truetype';
  }
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FontPicker: React.FC<FontPickerProps> = ({
  value,
  onChange,
  placeholder = 'Search fonts…',
  id,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [customFonts, setCustomFonts] = useState<CustomFont[]>([]);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery('');
        setShowUpload(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search when opening
  useEffect(() => {
    if (open) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [open]);

  // Filtered Google Fonts
  const q = query.toLowerCase().trim();
  const filteredGoogle = q
    ? GOOGLE_FONTS.filter(f => f.family.toLowerCase().includes(q))
    : GOOGLE_FONTS;

  // Filtered custom fonts
  const filteredCustom = q
    ? customFonts.filter(f => f.family.toLowerCase().includes(q))
    : customFonts;

  // Group Google Fonts by category (only show populated categories)
  const grouped = (Object.keys(CATEGORY_LABELS) as FontCategory[]).reduce<
    Record<FontCategory, typeof GOOGLE_FONTS>
  >((acc, cat) => {
    acc[cat] = filteredGoogle.filter(f => f.category === cat);
    return acc;
  }, {} as Record<FontCategory, typeof GOOGLE_FONTS>);

  // Select a Google font
  const selectGoogle = (family: string, variants?: string) => {
    loadGoogleFont(family, variants);
    onChange(family);
    setOpen(false);
    setQuery('');
    setShowUpload(false);
  };

  // Select a custom font
  const selectCustom = (family: string) => {
    onChange(family);
    setOpen(false);
    setQuery('');
    setShowUpload(false);
  };

  // Handle file upload (via input or drag-and-drop)
  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      const ext = file.name.split('.').pop() ?? '';
      if (!['woff', 'woff2', 'ttf', 'otf'].includes(ext.toLowerCase())) return;

      // Derive a readable family name from the filename
      const family = file.name
        .replace(/\.(woff2?|ttf|otf)$/i, '')
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const url = URL.createObjectURL(file);
      const format = formatFromExtension(ext);
      const custom: CustomFont = { family, url, format };

      injectCustomFont(custom);
      setCustomFonts(prev => {
        // Avoid duplicates by name
        if (prev.some(f => f.family === family)) return prev;
        return [...prev, custom];
      });

      // Auto-select if it's the first upload
      setCustomFonts(prev => {
        if (prev.length === 0) onChange(family);
        return prev;
      });
    });
    setShowUpload(false);
  }, [onChange]);

  // Drag-and-drop handlers
  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`font-picker${open ? ' font-picker--open' : ''}`}
      ref={wrapperRef}
      id={id}
    >
      {/* Trigger */}
      <button
        type="button"
        className="font-picker__trigger"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <Type size={14} style={{ flexShrink: 0, opacity: 0.5 }} />
        <span
          className="font-picker__preview-text"
          style={{ fontFamily: value ? `'${value}', sans-serif` : undefined }}
        >
          {value || 'Select a font…'}
        </span>
        <ChevronDown size={14} className="font-picker__chevron" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="font-picker__panel" role="listbox">
          {/* Search + upload toggle */}
          <div className="font-picker__search-row">
            <input
              ref={searchRef}
              type="text"
              className="font-picker__search-input"
              placeholder={placeholder}
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search fonts"
            />
            <button
              type="button"
              className="font-picker__upload-btn"
              onClick={() => setShowUpload(u => !u)}
            >
              <Upload size={12} />
              Upload custom font (.woff, .woff2, .ttf, .otf)
            </button>
          </div>

          {/* Custom font upload drop zone */}
          {showUpload && (
            <div
              className={`font-picker__drop-zone${dragOver ? ' font-picker__drop-zone--over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
              aria-label="Upload font file"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".woff,.woff2,.ttf,.otf"
                multiple
                style={{ display: 'none' }}
                onChange={e => handleFiles(e.target.files)}
              />
              <Upload size={20} style={{ margin: '0 auto 0.375rem', opacity: 0.4 }} />
              <p className="font-picker__drop-zone-text">
                Drop font file here or click to browse
              </p>
              <p className="font-picker__drop-zone-hint">
                Supports .woff2, .woff, .ttf, .otf
              </p>
            </div>
          )}

          {/* Font list */}
          <div className="font-picker__list">
            {/* Custom uploaded fonts */}
            {filteredCustom.length > 0 && (
              <>
                <div className="font-picker__category-label">Custom Fonts</div>
                {filteredCustom.map(font => (
                  <div
                    key={`custom-${font.family}`}
                    className={`font-picker__option${value === font.family ? ' font-picker__option--selected' : ''}`}
                    role="option"
                    aria-selected={value === font.family}
                    onClick={() => selectCustom(font.family)}
                  >
                    <span
                      className="font-picker__option-name"
                      style={{ fontFamily: `'${font.family}', sans-serif` }}
                    >
                      {font.family}
                    </span>
                    <span className="font-picker__option-badge font-picker__option-badge--custom">Custom</span>
                    {value === font.family && <Check size={13} className="font-picker__option-check" />}
                  </div>
                ))}
              </>
            )}

            {/* Google Fonts grouped by category */}
            {(Object.keys(CATEGORY_LABELS) as FontCategory[]).map(cat => {
              const fonts = grouped[cat];
              if (!fonts || fonts.length === 0) return null;
              return (
                <React.Fragment key={cat}>
                  <div className="font-picker__category-label">{CATEGORY_LABELS[cat]}</div>
                  {fonts.map(font => (
                    <div
                      key={font.family}
                      className={`font-picker__option${value === font.family ? ' font-picker__option--selected' : ''}`}
                      role="option"
                      aria-selected={value === font.family}
                      onClick={() => selectGoogle(font.family, font.variants)}
                      onMouseEnter={() => loadGoogleFont(font.family, font.variants)}
                    >
                      <span
                        className="font-picker__option-name"
                        style={{ fontFamily: `'${font.family}', sans-serif` }}
                      >
                        {font.family}
                      </span>
                      <span className="font-picker__option-badge">{CATEGORY_LABELS[cat]}</span>
                      {value === font.family && <Check size={13} className="font-picker__option-check" />}
                    </div>
                  ))}
                </React.Fragment>
              );
            })}

            {/* Empty state */}
            {filteredGoogle.length === 0 && filteredCustom.length === 0 && (
              <div className="font-picker__empty">
                <p>No fonts match "{query}"</p>
                <p style={{ marginTop: '0.25rem', fontSize: '0.75rem', opacity: 0.6 }}>
                  The typed name will be used as the font-family value.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
