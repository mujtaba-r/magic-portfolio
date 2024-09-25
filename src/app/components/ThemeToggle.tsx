import { useState, useEffect } from 'react';
import { ToggleButton } from '@/once-ui/components';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <ToggleButton
      onClick={toggleTheme}
      selected={false}
      size="s"
      prefixIcon={theme === 'dark' ? 'sun' : 'moon'}
      weight="default"
    >
      {theme === 'dark' ? 'Light mode' : 'Dark mode'}
    </ToggleButton>
  );
};

export default ThemeToggle;
