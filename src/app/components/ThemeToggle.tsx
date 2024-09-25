import { useState, useEffect } from 'react';
import { ToggleButton, Flex } from '@/once-ui/components';

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
      // Remove or rename 'variant' prop
      prefixIcon={theme === 'dark' ? 'sun' : 'moon'}
    >
      <Flex paddingX="2" textVariant="body-default-s">
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </Flex>
    </ToggleButton>
  );
};

export default ThemeToggle;
