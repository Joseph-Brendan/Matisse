import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Moon, Sun, Bell, User, Info, Palette } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useColorStore } from '../../store/useColorStore';
import { showToast } from '../../store/useToastStore';
import './Settings.css';

export const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useColorStore();

  const [notifToasts, setNotifToasts] = useState(true);
  const [notifSounds, setNotifSounds] = useState(false);

  const displayName = user?.name ?? 'User';
  const displayInitials = user?.initials ?? 'U';
  const displayEmail = user?.email ?? '';
  const avatarColor = user?.avatarColor ?? 'hsl(256, 34%, 48%)';

  const handleThemeChange = (t: 'light' | 'dark') => {
    setTheme(t);
    showToast('success', `Switched to ${t} theme`);
  };

  return (
    <div className="settings-root">
      {/* Header */}
      <header className="settings-header">
        <button
          className="settings-header__back-btn"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft size={16} />
          Back
        </button>
        <h1 className="settings-header__title">Settings</h1>
      </header>

      {/* Body */}
      <div className="settings-body">

        {/* Profile */}
        <section className="settings-section" aria-labelledby="settings-profile-heading">
          <div className="settings-section__heading" id="settings-profile-heading">
            <User size={13} style={{ display: 'inline', marginRight: '0.375rem', verticalAlign: 'middle' }} />
            Profile
          </div>
          <div className="settings-profile-row">
            <div
              className="settings-avatar"
              style={{ background: avatarColor }}
              aria-hidden
            >
              {displayInitials}
            </div>
            <div>
              <p className="settings-profile-name">{displayName}</p>
              <p className="settings-profile-email">{displayEmail}</p>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row__info">
              <span className="settings-row__label">Sign out</span>
              <span className="settings-row__desc">Sign out of your Matisse account on this device.</span>
            </div>
            <button
              className="glossy-btn glossy-btn--error glossy-btn--sm"
              onClick={() => { logout(); navigate('/auth'); }}
            >
              Sign out
            </button>
          </div>
        </section>

        {/* Appearance */}
        <section className="settings-section" aria-labelledby="settings-appearance-heading">
          <div className="settings-section__heading" id="settings-appearance-heading">
            <Palette size={13} style={{ display: 'inline', marginRight: '0.375rem', verticalAlign: 'middle' }} />
            Appearance
          </div>
          <div className="settings-theme-options">
            <button
              className={`settings-theme-option${theme === 'light' ? ' settings-theme-option--active' : ''}`}
              onClick={() => handleThemeChange('light')}
              aria-pressed={theme === 'light'}
            >
              <div className="settings-theme-option__preview settings-theme-option__preview--light" />
              <Sun size={15} />
              <span className="settings-theme-option__label">Light</span>
            </button>
            <button
              className={`settings-theme-option${theme === 'dark' ? ' settings-theme-option--active' : ''}`}
              onClick={() => handleThemeChange('dark')}
              aria-pressed={theme === 'dark'}
            >
              <div className="settings-theme-option__preview settings-theme-option__preview--dark" />
              <Moon size={15} />
              <span className="settings-theme-option__label">Dark</span>
            </button>
          </div>
        </section>

        {/* Notifications */}
        <section className="settings-section" aria-labelledby="settings-notif-heading">
          <div className="settings-section__heading" id="settings-notif-heading">
            <Bell size={13} style={{ display: 'inline', marginRight: '0.375rem', verticalAlign: 'middle' }} />
            Notifications
          </div>
          <div className="settings-row">
            <div className="settings-row__info">
              <span className="settings-row__label">In-app toast notifications</span>
              <span className="settings-row__desc">Show toast messages for saves, exports, and errors.</span>
            </div>
            <label className="settings-toggle" aria-label="Toggle toast notifications">
              <input
                type="checkbox"
                className="settings-toggle__input"
                checked={notifToasts}
                onChange={e => setNotifToasts(e.target.checked)}
              />
              <span className="settings-toggle__track" />
              <span className="settings-toggle__thumb" />
            </label>
          </div>
          <div className="settings-row">
            <div className="settings-row__info">
              <span className="settings-row__label">Sound alerts</span>
              <span className="settings-row__desc">Play a subtle sound when an action completes.</span>
            </div>
            <label className="settings-toggle" aria-label="Toggle sound alerts">
              <input
                type="checkbox"
                className="settings-toggle__input"
                checked={notifSounds}
                onChange={e => setNotifSounds(e.target.checked)}
              />
              <span className="settings-toggle__track" />
              <span className="settings-toggle__thumb" />
            </label>
          </div>
        </section>

        {/* About */}
        <section className="settings-section" aria-labelledby="settings-about-heading">
          <div className="settings-section__heading" id="settings-about-heading">
            <Info size={13} style={{ display: 'inline', marginRight: '0.375rem', verticalAlign: 'middle' }} />
            About
          </div>
          <div className="settings-row">
            <div className="settings-row__info">
              <span className="settings-row__label">Matisse</span>
              <span className="settings-row__desc">Design System Token Builder</span>
            </div>
            <span className="settings-row__label" style={{ opacity: 0.5, fontSize: '0.8125rem' }}>v0.1.0</span>
          </div>
          <div className="settings-row">
            <div className="settings-row__info">
              <span className="settings-row__label">Built with</span>
              <span className="settings-row__desc">React · TypeScript · Vite · Material You</span>
            </div>
          </div>
        </section>

        <p className="settings-version">Matisse Design System Builder · v0.1.0</p>
      </div>
    </div>
  );
};
