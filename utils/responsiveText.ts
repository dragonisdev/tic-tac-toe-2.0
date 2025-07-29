import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const screenDiagonal = Math.sqrt(width * width + height * height);
const isTablet = screenDiagonal > 1000; // Rough threshold for tablets

export const getResponsiveFontSize = (phoneSize: number, tabletSize: number) => {
  return isTablet ? tabletSize : phoneSize;
};

export const getResponsiveIconSize = (phoneSize: number, tabletSize: number) => {
  return isTablet ? tabletSize : phoneSize;
};

export const isTabletDevice = () => isTablet; 