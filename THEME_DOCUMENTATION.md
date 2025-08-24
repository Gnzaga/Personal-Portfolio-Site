# Enhanced Theme System Documentation

## Overview
The portfolio website now features an enhanced dark mode/light mode system that provides a seamless user experience with proper preference persistence and system integration. All navigation preserves theme state through client-side routing.

## Recent Fix: Navigation Theme Preservation
- **Issue**: The "View Projects" button on the home page was causing theme reset due to full page navigation
- **Solution**: Replaced regular anchor tag (`<a href="#projects">`) with React Router `Link` component
- **Result**: All navigation now preserves theme state during session

## Features

### 1. System Theme Integration
- **Automatic Detection**: The theme system automatically detects your operating system's preferred color scheme (dark/light)
- **Real-time Updates**: When you change your system's theme preference, the website will automatically update to match
- **Default Behavior**: New users will automatically get their system's preferred theme

### 2. Session-Based Preference Storage
- **Session Persistence**: Your theme choice is saved in browser sessionStorage and persists only during the current browsing session
- **Fresh Start**: Each new browser session automatically defaults to your system's preferred theme
- **Three Modes Available**:
  - **System**: Follows your operating system's preference (default for all new sessions)
  - **Light**: Use light mode for this session only
  - **Dark**: Use dark mode for this session only

### 3. Enhanced Theme Toggle
The theme toggle in the navigation bar now provides:
- **Quick Toggle**: Click the main icon to quickly toggle between light/dark
- **Dropdown Menu**: Click the arrow next to the icon for more options:
  - System (auto-detects and follows OS preference)
  - Light (manual light mode)
  - Dark (manual dark mode)

### 4. Flash Prevention
- **No FOUC**: Prevents flash of unstyled content when the page loads
- **Instant Application**: Theme is applied immediately before React loads
- **Smooth Transitions**: All theme changes include smooth CSS transitions

## Technical Implementation

### Files Modified
1. **`src/context/ThemeContext.js`**: Enhanced context with system theme detection and preference management
2. **`src/components/DarkModeToggle.js`**: New dropdown interface with more theme options
3. **`public/index.html`**: Added script to prevent flash of unstyled content

### Key Functions
- `toggleTheme()`: Switches to manual theme mode and toggles current appearance
- `toggleSystemTheme()`: Switches between system mode and manual mode
- `setLightTheme()`: Forces light mode
- `setDarkTheme()`: Forces dark mode

### SessionStorage Keys
- `theme`: Stores manual theme preference for current session ('light' or 'dark')
- `useSystemTheme`: Boolean flag indicating if system theme should be followed during this session

## User Experience

### For New Users
1. Website automatically detects and applies system theme preference
2. No setup required - works out of the box
3. Can override system preference at any time using the theme toggle
4. Manual preferences last only for the current browsing session

### For Returning Users
1. Each new browser session starts fresh with system preference
2. Manual theme changes during a session are remembered until the session ends
3. Opening a new tab or window in the same session preserves manual preferences
4. Closing and reopening the browser resets to system preference

### Accessibility
- All theme controls include proper ARIA labels
- Keyboard navigation supported
- High contrast maintained in both light and dark modes
- Visual indicators show current theme state

## Browser Compatibility
- Works in all modern browsers that support:
  - CSS media queries (`prefers-color-scheme`)
  - sessionStorage API
  - CSS custom properties (CSS variables)
- Graceful fallback to system preference in browsers without sessionStorage support
- Ultimate fallback to light mode if all features are unavailable

## Development Notes
- Theme state is managed through React Context for global accessibility
- Uses CSS classes (`dark`) on `document.documentElement` for theme application
- Event listeners monitor system theme changes during runtime
- SessionStorage ensures fresh system preference detection on each new browser session
- Preferences persist within tabs/windows of the same browsing session
- Tailwind CSS dark mode variants handle the visual styling
