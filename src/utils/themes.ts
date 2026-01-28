// Theme system with multiple pre-built themes

export type ThemeName = 'light' | 'dark' | 'sepia' | 'highcontrast' | 'coolblue' | 'warmgold'

export interface Theme {
  name: ThemeName
  label: string
  colors: {
    bg: string
    bgSecondary: string
    bgTertiary: string
    text: string
    textSecondary: string
    border: string
    primary: string
    primaryLight: string
    success: string
    warning: string
    danger: string
    info: string
    shadow: string
  }
}

export const themes: Record<ThemeName, Theme> = {
  // Light theme (default, easy on eyes)
  light: {
    name: 'light',
    label: '☀️ Light',
    colors: {
      bg: '#ffffff',
      bgSecondary: '#f8f9fa',
      bgTertiary: '#f0f2f5',
      text: '#1a1a1a',
      textSecondary: '#555555',
      border: '#e0e0e0',
      primary: '#2563eb',
      primaryLight: '#dbeafe',
      success: '#16a34a',
      warning: '#ea580c',
      danger: '#dc2626',
      info: '#0891b2',
      shadow: 'rgba(0, 0, 0, 0.1)'
    }
  },

  // Dark theme
  dark: {
    name: 'dark',
    label: '🌙 Dark',
    colors: {
      bg: '#1a1a1a',
      bgSecondary: '#2a2a2a',
      bgTertiary: '#3a3a3a',
      text: '#e5e5e5',
      textSecondary: '#a0a0a0',
      border: '#404040',
      primary: '#3b82f6',
      primaryLight: '#1e3a8a',
      success: '#4ade80',
      warning: '#fb923c',
      danger: '#ef4444',
      info: '#06b6d4',
      shadow: 'rgba(0, 0, 0, 0.3)'
    }
  },

  // Sepia (warm, paper-like)
  sepia: {
    name: 'sepia',
    label: '📖 Sepia',
    colors: {
      bg: '#f5ede4',
      bgSecondary: '#ede6d9',
      bgTertiary: '#e5dccf',
      text: '#3e2723',
      textSecondary: '#6d4c41',
      border: '#d7ccc8',
      primary: '#8b6f47',
      primaryLight: '#d7ccc8',
      success: '#558b2f',
      warning: '#e65100',
      danger: '#d32f2f',
      info: '#00695c',
      shadow: 'rgba(62, 39, 35, 0.15)'
    }
  },

  // High Contrast (accessibility)
  highcontrast: {
    name: 'highcontrast',
    label: '🔲 High Contrast',
    colors: {
      bg: '#ffffff',
      bgSecondary: '#f0f0f0',
      bgTertiary: '#e0e0e0',
      text: '#000000',
      textSecondary: '#333333',
      border: '#000000',
      primary: '#0000ff',
      primaryLight: '#ccccff',
      success: '#008000',
      warning: '#ff8c00',
      danger: '#ff0000',
      info: '#0000cd',
      shadow: 'rgba(0, 0, 0, 0.5)'
    }
  },

  // Cool Blue
  coolblue: {
    name: 'coolblue',
    label: '❄️ Cool Blue',
    colors: {
      bg: '#e8f4f8',
      bgSecondary: '#d1e7f0',
      bgTertiary: '#b9dae8',
      text: '#0f3460',
      textSecondary: '#3a5f7d',
      border: '#9cbcd1',
      primary: '#0f3460',
      primaryLight: '#d1e7f0',
      success: '#06d6a0',
      warning: '#ffa500',
      danger: '#ef476f',
      info: '#118ab2',
      shadow: 'rgba(15, 52, 96, 0.2)'
    }
  },

  // Warm Gold
  warmgold: {
    name: 'warmgold',
    label: '🌅 Warm Gold',
    colors: {
      bg: '#fff8f0',
      bgSecondary: '#fef3e2',
      bgTertiary: '#fde9d5',
      text: '#5c2e0f',
      textSecondary: '#8b4513',
      border: '#d4a574',
      primary: '#d4a574',
      primaryLight: '#f5deb3',
      success: '#52b788',
      warning: '#f77f00',
      danger: '#d62828',
      info: '#006ba6',
      shadow: 'rgba(92, 46, 15, 0.15)'
    }
  }
}

export function getTheme(name?: ThemeName): Theme {
  if (!name || !themes[name]) {
    return themes.light
  }
  return themes[name]
}

export function getStoredTheme(): ThemeName {
  try {
    const stored = localStorage.getItem('app-theme') as ThemeName
    if (stored && themes[stored]) {
      return stored
    }
  } catch {
    // localStorage not available
  }
  return 'light'
}

export function setStoredTheme(name: ThemeName): void {
  try {
    localStorage.setItem('app-theme', name)
  } catch {
    // localStorage not available
  }
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement
  const colors = theme.colors
  
  // Set CSS custom properties for tailwind/global styles
  root.style.setProperty('--color-bg', colors.bg)
  root.style.setProperty('--color-bg-secondary', colors.bgSecondary)
  root.style.setProperty('--color-bg-tertiary', colors.bgTertiary)
  root.style.setProperty('--color-text', colors.text)
  root.style.setProperty('--color-text-secondary', colors.textSecondary)
  root.style.setProperty('--color-border', colors.border)
  root.style.setProperty('--color-primary', colors.primary)
  root.style.setProperty('--color-primary-light', colors.primaryLight)
  root.style.setProperty('--color-success', colors.success)
  root.style.setProperty('--color-warning', colors.warning)
  root.style.setProperty('--color-danger', colors.danger)
  root.style.setProperty('--color-info', colors.info)
  root.style.setProperty('--color-shadow', colors.shadow)
  
  // Update body and root background
  document.body.style.backgroundColor = colors.bg
  document.body.style.color = colors.text
}
