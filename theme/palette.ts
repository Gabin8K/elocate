
export const common = {
  divider: '#e5e5e5',
  error: '#ED5858',
  disabled: '#E5E5E5',
  gray1: '#FFFFFF',
  gray2: '#E5E5E5',
  gray3: '#A1A1A1',
  gray4: '#b0b2b0',
  transparent: 'transparent',
}

export const palette = {
  common,
  light: {
    ...common,
    primary: '#1DA445',
    primary_light: "#BBEABB",
    background: '#F8F8F8',
    card: '#FFFFFF',
    shadow: '#A1A1A1',
    text: '#000000'
  },
  dark: {
    ...common,
    primary: '#1DA445',
    primary_light: "#BBEABB",
    background: '#1F1F1F',
    card: '#2A2A2A',
    shadow: '#1B1B1B',
    text: '#FFFFFF'
  }
};
