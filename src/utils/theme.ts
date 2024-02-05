const colors = {
  'light-gray': '#f5f5f5',
  highlight: '#eee',
  success: '#15803d',
  secondary: '#1c1917',
  information: '#bfdbfe',
  button: {
    'bg-primary': '#15803d',
    'bg-primary-hover': '#059669',
    'text-primary': '#dcfce7',
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
