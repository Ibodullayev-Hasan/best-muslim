// src/constants/icons.tsx
import { Ionicons } from '@expo/vector-icons';
import type { ColorValue } from 'react-native';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

type IconProps = {
  focused?: boolean;
  color?: ColorValue;
  size?: number;
};

// active: tanlangan holat, inactive: tanlanmagan holat (bo'lmasa bir xil)
const make =
  (active: IconName, inactive: IconName = active) =>
  ({ focused = false, color, size = 24 }: IconProps) => (
    <Ionicons name={focused ? active : inactive} size={size} color={color} />
  );

export const icons = {
  prayer: make('time', 'time-outline'),
  qibla: make('compass', 'compass-outline'),
  settings: make('settings', 'settings-outline'),
  book: make('book', 'book-outline'),
  // keyinchalik shu yerga qo'shib borasiz:
  // tasbeh: make('ellipse', 'ellipse-outline'),
};