import { createRouter } from '@expo/ex-navigation';

import Home from '../screens/Home';
import MapScreen from '../screens/MapScreen.js';
import Profile from '../screens/Profile';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => Home,
  mapScreen: () => MapScreen,
  profile: () => Profile,
  rootNavigation: () => RootNavigation,
}));
