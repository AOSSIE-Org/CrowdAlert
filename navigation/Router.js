import { createRouter } from '@expo/ex-navigation';

import Home from '../screens/Home';
import MapView from '../screens/MapView.js';
import Profile from '../screens/Profile';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  home: () => Home,
  mapView: () => MapView,
  profile: () => Profile,
  rootNavigation: () => RootNavigation,
}));
