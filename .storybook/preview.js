import '../src/app/globals.css';
import path from 'path';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
};

export const decorators = [];

// Allow Storybook to resolve `@` alias used in the project
export const webpackFinal = async (config) => {
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    '@': path.resolve(__dirname, '../src'),
  };
  return config;
};
