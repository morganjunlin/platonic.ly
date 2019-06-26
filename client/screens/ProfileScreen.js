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
import { Rating, AirbnbRating } from 'react-native-elements';

export default function ProfileScreen() {
  return (
    <ScrollView 
      style={styles.container} 
      // contentContainerStyle={styles.contentContainer}
      >
      <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/robot-prod.png')}
            style={styles.welcomeImage}
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
        <Text style={styles.developmentModeText}>Robby is a robot. Robby robots stuff and beeps and boops and stuff. Robby would like to robot and beep and boop and Rob other fellow Robbies.</Text>
      </View>
    </ScrollView>
  )
}

ProfileScreen.navigationOptions = {
  title: 'Robby the Robot',
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
    color: 'rgba(0,0,0,0.4)',
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
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
});