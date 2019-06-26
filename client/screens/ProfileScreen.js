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
import { Avatar, Rating, AirbnbRating } from 'react-native-elements';

export default function ProfileScreen() {
  return (
    <ScrollView 
      style={styles.container} 
      // contentContainerStyle={styles.contentContainer}
      >
      <View style={styles.welcomeContainer}>
          <Avatar
            size="xlarge"
            rounded
            source={require('../assets/images/bob2.png')}
            // style={styles.welcomeImage}
          />
      </View>

      {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Robby the Robot</Text>
      </View> */}

      <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
        <Rating
          type='heart'
          defaultRating={4}
          ratingCount={5}
          imageSize={25}
          showRating
          onFinishRating={ratingCompleted}
        />
      </View>

      <View style={styles.getStartedContainer}>
        <Text style={styles.developmentModeText}>Bob is a very passionate man who always shows determination to get the job done and to encourage everyone else. He is also a fun-loving person in general and very smart. During a crisis/problem he isn't one to lose focus and often comes up with ideas on how to fix things.</Text>
      </View>
    </ScrollView>
  )
}

ProfileScreen.navigationOptions = {
  title: 'Bob the Builder',
};

function ratingCompleted(rating) {
  console.log("Rating is: " + rating)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
   contentContainer: {
    paddingTop: 30,
  },
  developmentModeText: {
    marginTop: 10,
    marginBottom: 10,
    // color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 200,
    // height: 180,
    // resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});