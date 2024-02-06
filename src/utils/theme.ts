const colors = {
  'light-gray': '#f1f1f1',
  highlight: '#eee',
  blend: '#ccc',
  success: '#15803d',
  secondary: '#171717',
  information: '#bfdbfe',
  button: {
    'bg-primary': '#4d7c0f',
    'bg-primary-hover': '#65a30d',
    'text-primary': '#dcfce7',
    'bg-disabled': '#eee',
    'text-disabled': '#aaa',
    'bg-error': '#9a3412',
    'bg-error-hover': '#ea580c',
    'text-error': '#fff',
  },
};

const spacing = {
  small: '0.5rem',
  medium: '1rem',
};

export interface Theme {
  spacing: typeof spacing;
  colors: typeof colors;
}

export const theme = {
  spacing,
  colors,
};
