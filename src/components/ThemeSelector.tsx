import { useEffect, useState } from 'react'
import { Palette } from 'lucide-react'
import { themes, type ThemeName, getStoredTheme, setStoredTheme, applyTheme } from '../utils/themes'

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('light')
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const stored = getStoredTheme()
    setCurrentTheme(stored)
    applyTheme(themes[stored])
  }, [])

  const handleThemeChange = (themeName: ThemeName) => {
    setCurrentTheme(themeName)
    setStoredTheme(themeName)
    applyTheme(themes[themeName])
    setShowMenu(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="p-2 rounded-lg transition-colors"
        style={{
          backgroundColor: `var(--color-bg-tertiary)`,
          color: `var(--color-text)`,
          border: `1px solid var(--color-border)`
        }}
        title="Change theme"
      >
        <Palette className="w-5 h-5" />
      </button>

      {showMenu && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg z-50 border"
          style={{
            backgroundColor: `var(--color-bg-secondary)`,
            borderColor: `var(--color-border)`,
            boxShadow: `0 4px 12px var(--color-shadow)`
          }}
        >
          <div className="p-2">
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => handleThemeChange(key as ThemeName)}
                className="w-full text-left px-3 py-2 rounded-md transition-colors flex items-center gap-2"
                style={{
                  backgroundColor: currentTheme === key ? `var(--color-primary-light)` : 'transparent',
                  color: `var(--color-text)`
                }}
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: theme.colors.primary }}
                />
                <span className="text-sm font-medium">{theme.label}</span>
                {currentTheme === key && <span className="ml-auto">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
