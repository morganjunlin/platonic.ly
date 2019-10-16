import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import AllPost from '../screens/homeComponents/AllPosts';
import HomeScreen from '../screens/homeComponents/HomeScreen';
import HostPost from '../screens/homeComponents/HostPost';
import IndividualPost from '../screens/homeComponents/IndividualPost';

import PostConfirmScreen from '../screens/post/postConfirm';
import PostScreen from '../screens/post/postScreen';

import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile'

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
};

const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
  Edit: EditProfile
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
  postStack,
  ProfileStack
});
