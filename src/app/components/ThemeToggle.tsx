import { useState, useEffect } from 'react';
import { Button } from '@/once-ui/components';
import styles from '@/app/components/Header.module.scss';

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
    <Button
      onClick={toggleTheme}
      variant="tertiary"
      size="s"
      prefixIcon={theme === 'dark' ? 'sun' : 'moon'}
      label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
      className={styles.navButton}
    />
  );
};

export default ThemeToggle;
