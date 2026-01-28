import { useEffect, useState } from 'react'
import { Palette } from 'lucide-react'
import { themes, type ThemeName, getStoredTheme, setStoredTheme, applyTheme } from '../utils/themes'

export default function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('white-black')
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

  // Group themes by category
  const categories = new Map<string, (typeof themes)[ThemeName][]>()
  Object.entries(themes).forEach(([, theme]) => {
    if (!categories.has(theme.category)) {
      categories.set(theme.category, [])
    }
    categories.get(theme.category)!.push(theme)
  })

  // Maintain category order
  const categoryOrder = [
    'Classic & High-Contrast',
    'Blue-Based',
    'Warm & Paper-Like',
    'Low-Light / Night',
    'Colour-Blind Friendly',
    'Minimalist / Modern'
  ]

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
          className="absolute right-0 mt-2 w-72 rounded-lg shadow-lg z-50 border max-h-[600px] overflow-y-auto"
          style={{
            backgroundColor: `var(--color-bg-secondary)`,
            borderColor: `var(--color-border)`,
            boxShadow: `0 4px 12px var(--color-shadow)`
          }}
        >
          {categoryOrder.map((category) => {
            const categoryThemes = categories.get(category) || []
            if (categoryThemes.length === 0) return null

            return (
              <div key={category}>
                {/* Category header */}
                <div
                  className="px-4 py-2 text-sm font-semibold sticky top-0"
                  style={{
                    backgroundColor: `var(--color-bg-tertiary)`,
                    color: `var(--color-primary)`,
                    borderBottom: `1px solid var(--color-border)`
                  }}
                >
                  {category}
                </div>

                {/* Theme items */}
                {categoryThemes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => handleThemeChange(theme.name)}
                    className="w-full text-left px-4 py-2 transition-colors flex items-center gap-3 hover:opacity-80"
                    style={{
                      backgroundColor:
                        currentTheme === theme.name ? `var(--color-bg-tertiary)` : 'transparent',
                      color: `var(--color-text)`,
                      borderBottom: `1px solid var(--color-border)`
                    }}
                  >
                    <div
                      className="w-4 h-4 rounded flex-shrink-0"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <span className="text-sm font-medium flex-1">{theme.label}</span>
                    {currentTheme === theme.name && (
                      <span style={{ color: `var(--color-success)` }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
