import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
// import LinksScreen from '../screens/LinksScreen';
// import SettingsScreen from '../screens/SettingsScreen';

import HomeScreen from '../screens/homeComponents/HomeScreen';
import IndividualPost from '../screens/homeComponents/IndividualPost';
import HostPost from '../screens/homeComponents/HostPost';


import PostConfirmScreen from '../screens/post/postConfirm';
import PostScreen from '../screens/post/postScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AllPost from '../screens/homeComponents/AllPosts';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Individual: IndividualPost,
  HostPost: HostPost,
  AllPosts: AllPost
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={ focused }
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-ios-home'
      }
    />
  ),
};

// const LinksStack = createStackNavigator({
//   Links: LinksScreen,
// });

// LinksStack.navigationOptions = {
//   tabBarLabel: 'Messages',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-mail-open' : 'md-link'}
//     />
//   ),
// };

const postStack = createStackNavigator({
  post: PostScreen,
  postConfirm: PostConfirmScreen,
  ok: HomeScreen
});

postStack.navigationOptions = {
  tabBarLabel: 'Post', 
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-arrow-round-forward' : 'md-options'}
    />
  ),
}

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
// });

// SettingsStack.navigationOptions = {
//   tabBarLabel: 'Notification',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
//     />
//   ),
// };

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Me',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-body' : 'md-body'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  // LinksStack,
  postStack,
  // SettingsStack,
  ProfileStack
});
