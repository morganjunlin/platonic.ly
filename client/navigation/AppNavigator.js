import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthStack from '../screens/OAuth';

export default createAppContainer(
  createSwitchNavigator({
    Main: MainTabNavigator,
    Auth: AuthStack,
  }, {
    initialRouteName: 'Auth',
  })
);
