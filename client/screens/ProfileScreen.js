import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Hello, world!</Text>
      </View>
    </ScrollView>
  )
}

ProfileScreen.navigationOptions = {
  title: 'User Profile',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});