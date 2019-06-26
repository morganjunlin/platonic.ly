import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
<<<<<<< HEAD
import { Avatar, Card, ListItem, Rating, AirbnbRating } from 'react-native-elements';
import UserDummyData from '../../data/dummyData/viewOneUser.json';
import PostsDummyData from '../../data/dummyData/getAllPosts.json';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      participating: []
    }

    this.handleLoadData = this.handleLoadData.bind(this);
    this.ratingCompleted = this.ratingCompleted.bind(this);
  }

  componentDidMount() {
    this.handleLoadData();
  }

  handleLoadData() {
    let { id, name, gender, age, profilePic, description, rating } = UserDummyData;
    // axios function

    this.setState({ 
      user: { id, name, gender, age, profilePic, description, rating }
    });

    this.handleUserParticipatingActivity();
  }

  ratingCompleted(rating) {
    console.log("Rating is: " + rating);
  };

  handleUserMadeActivity() {

  }

  handleUserParticipatingActivity() {
    // let { id, title, locationCity, locationZip, category, currentAttendees, maxAttendees, schedule, created_at } = PostsDummyData;

    this.setState({
      participating: PostsDummyData
    })
  }

  render() {
    return (
      <ScrollView 
        style={styles.container} 
        // contentContainerStyle={styles.contentContainer}
        >
        <View style={styles.avatarContainer}>
            <Avatar
              size="xlarge"
              rounded
              source={{ uri: this.state.user.profilePic, }}
              // style={styles.welcomeImage}
            />
        </View>

        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.nameText}>{this.state.user.name}</Text>
        </View>

        <View style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
          <Rating
            type='heart'
            defaultRating={this.state.user.rating}
            ratingCount={5}
            imageSize={25}
            showRating
            onFinishRating={this.ratingCompleted}
          />
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{this.state.user.description}</Text>
        </View>

        {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.nameText}>List of Active Activities</Text>
        </View> */}

        <Card 
          // style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          title='List of Participating Activities'
        >
          {
            this.state.participating.map((post, i) => {
              return (
                <Card 
                  // containerStyle={{padding: 0}} 
                  key={i}
                  title={post.title}
                >
                  <View style={{ marginHorizontal: 5, marginBottom: 5 }}>
                    <Text>City: {post.locationCity}</Text>
                    <Text>Attendees: {post.currentAttendees === null ? 
                                  0 : post.currentAttendees}/{post.maxAttendees}</Text>
                    <Text>Created at {post.created_at}</Text>
                  </View>
                </Card>
              )
            })
          }
        </Card>
      </ScrollView>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Me',
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
  nameText: {
    fontSize: 18,
    textAlign: 'center'
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 10,
    // color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  descriptionContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
<<<<<<< HEAD
=======
  welcomeImage: {
    width: 200,
    // height: 180,
    // resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
>>>>>>> 9fb2b52adf4b704b2a9c79baf1333b7c6d53824e
});