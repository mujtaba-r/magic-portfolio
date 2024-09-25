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
      label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      icon={theme === 'dark' ? 'sun' : 'moon'}
      size="s"
      variant="tertiary"
      {...({ icon: theme === 'dark' ? 'sun' : 'moon' } as any)}
    />
  );
};

export default ThemeToggle;
