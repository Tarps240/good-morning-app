import "../styles/ToggleTheme.scss";

function ToggleTheme ({ theme, setTheme }) {
    // Treat "darkmode" as 'checkbox' checked = true
    // if theme === "dark", the input is checked.
    const isDark = theme === "dark";

    const handleToggle = () => {
        // If we are in darkmode, switch to lightmode
        // If lightmode switch to darkmode.
        if (isDark) {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    return (
      <label className="theme-switch">
        {/* The hidden checkbox that determines on/off */}
        <input
            type="checkbox"
            checked={isDark}
            onChange={handleToggle}
        />
        <span className="slider">
            {/* We can now embed icons in the slider. */}
            <i className="sun-icon">☀️</i>
            <i className="moon-icon">🌙</i>
        </span>
      </label>
    );
}

export default ToggleTheme;