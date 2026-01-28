// Comprehensive theme system with 18 themes organized by category

export type ThemeName = 
  // Classic & High-Contrast
  | 'black-white' | 'white-black' | 'dark-grey'
  // Blue-Based
  | 'navy-white' | 'midnight-blue' | 'slate-blue'
  // Warm & Paper-Like
  | 'sepia' | 'beige' | 'light-tan'
  // Low-Light / Night Reading
  | 'charcoal-yellow' | 'dark-brown' | 'deep-green'
  // Colour-Blind Friendly
  | 'blue-white' | 'grey-white' | 'teal-white'
  // Minimalist / Modern
  | 'soft-grey' | 'off-white' | 'light-grey'

export interface Theme {
  name: ThemeName
  label: string
  category: string
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
  // ==================== CLASSIC & HIGH-CONTRAST ====================
  'black-white': {
    name: 'black-white',
    label: '⚫ Black & White',
    category: 'Classic & High-Contrast',
    colors: {
      bg: '#000000',
      bgSecondary: '#0a0a0a',
      bgTertiary: '#151515',
      text: '#ffffff',
      textSecondary: '#e0e0e0',
      border: '#333333',
      primary: '#ffffff',
      primaryLight: '#cccccc',
      success: '#00ff00',
      warning: '#ffff00',
      danger: '#ff0000',
      info: '#00ffff',
      shadow: 'rgba(255, 255, 255, 0.2)'
    }
  },

  'white-black': {
    name: 'white-black',
    label: '⚪ White & Black',
    category: 'Classic & High-Contrast',
    colors: {
      bg: '#ffffff',
      bgSecondary: '#f5f5f5',
      bgTertiary: '#efefef',
      text: '#000000',
      textSecondary: '#1a1a1a',
      border: '#cccccc',
      primary: '#000000',
      primaryLight: '#333333',
      success: '#006600',
      warning: '#996600',
      danger: '#cc0000',
      info: '#003366',
      shadow: 'rgba(0, 0, 0, 0.15)'
    }
  },

  'dark-grey': {
    name: 'dark-grey',
    label: '🩶 Dark Grey',
    category: 'Classic & High-Contrast',
    colors: {
      bg: '#2a2a2a',
      bgSecondary: '#333333',
      bgTertiary: '#404040',
      text: '#f0f0f0',
      textSecondary: '#d9d9d9',
      border: '#555555',
      primary: '#f0f0f0',
      primaryLight: '#cccccc',
      success: '#66ff66',
      warning: '#ffcc00',
      danger: '#ff6666',
      info: '#66ccff',
      shadow: 'rgba(255, 255, 255, 0.15)'
    }
  },

  // ==================== BLUE-BASED (CALM & FOCUSED) ====================
  'navy-white': {
    name: 'navy-white',
    label: '🧊 Navy Blue',
    category: 'Blue-Based',
    colors: {
      bg: '#001a4d',
      bgSecondary: '#002966',
      bgTertiary: '#003d80',
      text: '#ffffff',
      textSecondary: '#e0e8ff',
      border: '#1a4d99',
      primary: '#ffffff',
      primaryLight: '#b3d9ff',
      success: '#66ff66',
      warning: '#ffdd00',
      danger: '#ff6666',
      info: '#66d9ff',
      shadow: 'rgba(255, 255, 255, 0.2)'
    }
  },

  'midnight-blue': {
    name: 'midnight-blue',
    label: '🌌 Midnight Blue',
    category: 'Blue-Based',
    colors: {
      bg: '#0d1b2a',
      bgSecondary: '#1b263b',
      bgTertiary: '#2a3d4d',
      text: '#d3d9e8',
      textSecondary: '#b8bfd3',
      border: '#415a77',
      primary: '#d3d9e8',
      primaryLight: '#6d9bbf',
      success: '#5dd65d',
      warning: '#ffc107',
      danger: '#ff6b6b',
      info: '#4ecdc4',
      shadow: 'rgba(211, 217, 232, 0.15)'
    }
  },

  'slate-blue': {
    name: 'slate-blue',
    label: '💎 Slate Blue',
    category: 'Blue-Based',
    colors: {
      bg: '#2c3e50',
      bgSecondary: '#34495e',
      bgTertiary: '#3d5066',
      text: '#f0f5ff',
      textSecondary: '#d4dce6',
      border: '#5d6d7b',
      primary: '#f0f5ff',
      primaryLight: '#8fa3b8',
      success: '#5ecc71',
      warning: '#f39c12',
      danger: '#e74c3c',
      info: '#3498db',
      shadow: 'rgba(240, 245, 255, 0.15)'
    }
  },

  // ==================== WARM & PAPER-LIKE ====================
  sepia: {
    name: 'sepia',
    label: '📖 Sepia',
    category: 'Warm & Paper-Like',
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

  beige: {
    name: 'beige',
    label: '🏜️ Beige',
    category: 'Warm & Paper-Like',
    colors: {
      bg: '#f5f1ed',
      bgSecondary: '#ede9e5',
      bgTertiary: '#e5e1dd',
      text: '#3c3c3c',
      textSecondary: '#666666',
      border: '#d4ccc4',
      primary: '#8b7355',
      primaryLight: '#d4ccc4',
      success: '#6b8e23',
      warning: '#cd853f',
      danger: '#a0522d',
      info: '#556b2f',
      shadow: 'rgba(60, 60, 60, 0.1)'
    }
  },

  'light-tan': {
    name: 'light-tan',
    label: '🌾 Light Tan',
    category: 'Warm & Paper-Like',
    colors: {
      bg: '#fffbf0',
      bgSecondary: '#f5f0e8',
      bgTertiary: '#efe9e0',
      text: '#4a4a4a',
      textSecondary: '#6d6d6d',
      border: '#d9cfc4',
      primary: '#9b8b7e',
      primaryLight: '#d9cfc4',
      success: '#7cb342',
      warning: '#d4a574',
      danger: '#c76b6b',
      info: '#6fa8a8',
      shadow: 'rgba(74, 74, 74, 0.1)'
    }
  },

  // ==================== LOW-LIGHT / NIGHT READING ====================
  'charcoal-yellow': {
    name: 'charcoal-yellow',
    label: '🌙 Charcoal & Yellow',
    category: 'Low-Light / Night',
    colors: {
      bg: '#1a1a1a',
      bgSecondary: '#242424',
      bgTertiary: '#2d2d2d',
      text: '#f5e6d3',
      textSecondary: '#e8d9c4',
      border: '#3d3d3d',
      primary: '#f5e6d3',
      primaryLight: '#d4af37',
      success: '#7ed321',
      warning: '#ffd700',
      danger: '#ff6b6b',
      info: '#87ceeb',
      shadow: 'rgba(245, 230, 211, 0.15)'
    }
  },

  'dark-brown': {
    name: 'dark-brown',
    label: '🌃 Dark Brown',
    category: 'Low-Light / Night',
    colors: {
      bg: '#2b1d14',
      bgSecondary: '#3d2817',
      bgTertiary: '#4a3420',
      text: '#f5e6d9',
      textSecondary: '#e8d9cc',
      border: '#5a4429',
      primary: '#f5e6d9',
      primaryLight: '#d4a574',
      success: '#8bc34a',
      warning: '#ffb300',
      danger: '#ff7043',
      info: '#80deea',
      shadow: 'rgba(245, 230, 217, 0.15)'
    }
  },

  'deep-green': {
    name: 'deep-green',
    label: '🌲 Deep Green',
    category: 'Low-Light / Night',
    colors: {
      bg: '#1a2e1f',
      bgSecondary: '#243d28',
      bgTertiary: '#2d4a31',
      text: '#e8f0ea',
      textSecondary: '#d4e4d8',
      border: '#3d5a42',
      primary: '#e8f0ea',
      primaryLight: '#a8d5a8',
      success: '#81c784',
      warning: '#ffd54f',
      danger: '#ef5350',
      info: '#4dd0e1',
      shadow: 'rgba(232, 240, 234, 0.15)'
    }
  },

  // ==================== COLOUR-BLIND FRIENDLY ====================
  'blue-white': {
    name: 'blue-white',
    label: '🔵 Blue & White',
    category: 'Colour-Blind Friendly',
    colors: {
      bg: '#003d7a',
      bgSecondary: '#004d99',
      bgTertiary: '#0066cc',
      text: '#ffffff',
      textSecondary: '#e6f0ff',
      border: '#1a4d99',
      primary: '#ffffff',
      primaryLight: '#99ccff',
      success: '#00cc00',
      warning: '#ffaa00',
      danger: '#ff6633',
      info: '#66ffff',
      shadow: 'rgba(255, 255, 255, 0.2)'
    }
  },

  'grey-white': {
    name: 'grey-white',
    label: '⚙️ Grey & White',
    category: 'Colour-Blind Friendly',
    colors: {
      bg: '#333333',
      bgSecondary: '#404040',
      bgTertiary: '#4d4d4d',
      text: '#ffffff',
      textSecondary: '#e0e0e0',
      border: '#666666',
      primary: '#ffffff',
      primaryLight: '#b3b3b3',
      success: '#00cc00',
      warning: '#ffaa00',
      danger: '#ff6633',
      info: '#00cccc',
      shadow: 'rgba(255, 255, 255, 0.2)'
    }
  },

  'teal-white': {
    name: 'teal-white',
    label: '🔷 Teal & White',
    category: 'Colour-Blind Friendly',
    colors: {
      bg: '#004d5c',
      bgSecondary: '#006673',
      bgTertiary: '#007a8a',
      text: '#ffffff',
      textSecondary: '#e0f0f5',
      border: '#1a7a8a',
      primary: '#ffffff',
      primaryLight: '#80d4e6',
      success: '#00cc00',
      warning: '#ffaa00',
      danger: '#ff6633',
      info: '#00ffff',
      shadow: 'rgba(255, 255, 255, 0.2)'
    }
  },

  // ==================== MINIMALIST / MODERN ====================
  'soft-grey': {
    name: 'soft-grey',
    label: '☁️ Soft Grey',
    category: 'Minimalist / Modern',
    colors: {
      bg: '#f8f9fa',
      bgSecondary: '#f0f1f3',
      bgTertiary: '#e8eaed',
      text: '#202124',
      textSecondary: '#5f6368',
      border: '#dadce0',
      primary: '#202124',
      primaryLight: '#e8eaed',
      success: '#1f8e45',
      warning: '#f9ab00',
      danger: '#d33827',
      info: '#1f9fd0',
      shadow: 'rgba(32, 33, 36, 0.1)'
    }
  },

  'off-white': {
    name: 'off-white',
    label: '📄 Off-White',
    category: 'Minimalist / Modern',
    colors: {
      bg: '#faf9f7',
      bgSecondary: '#f4f3f1',
      bgTertiary: '#eeecea',
      text: '#2c2c2c',
      textSecondary: '#5a5a5a',
      border: '#d4d0c8',
      primary: '#2c2c2c',
      primaryLight: '#eeecea',
      success: '#2e7d32',
      warning: '#f57c00',
      danger: '#c62828',
      info: '#0277bd',
      shadow: 'rgba(44, 44, 44, 0.1)'
    }
  },

  'light-grey': {
    name: 'light-grey',
    label: '🎨 Light Grey',
    category: 'Minimalist / Modern',
    colors: {
      bg: '#f5f5f5',
      bgSecondary: '#efefef',
      bgTertiary: '#e9e9e9',
      text: '#1a3a52',
      textSecondary: '#4a6b84',
      border: '#d0d0d0',
      primary: '#1a3a52',
      primaryLight: '#d0d0d0',
      success: '#388e3c',
      warning: '#f57f17',
      danger: '#d32f2f',
      info: '#0288d1',
      shadow: 'rgba(26, 58, 82, 0.1)'
    }
  }
}

export function getTheme(name?: ThemeName): Theme {
  if (!name || !themes[name]) {
    return themes['white-black']
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
  return 'white-black'
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
