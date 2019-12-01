import { DefaultTheme } from 'react-native-paper';
import Colors from './utils/colors';

const appTheme = {
  ...DefaultTheme,
  // here you can get the access to change the default theme
  // https://github.com/callstack/react-native-paper/blob/master/src/styles/DefaultTheme.tsx

  colors: {
    ...DefaultTheme.colors,
    primary: Colors.PRIMARY,
    accent: Colors.ACCENT,
    background: Colors.LIGHT
  },

  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      ...DefaultTheme.fonts.regular,
      fontFamily: 'roboto-regular'
    },
    medium: {
      ...DefaultTheme.fonts.medium,
      fontFamily: 'roboto-medium'
    }
  }
};

export default appTheme;
