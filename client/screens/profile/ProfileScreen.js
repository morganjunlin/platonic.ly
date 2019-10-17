import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Avatar, Button, Card, Divider, Icon } from 'react-native-elements';
import axios from 'axios';
import moment from 'moment';
import { url, userID } from '../../../conf.js';

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {},
      participating: [],
      description: ''
    }

    this.handleLoadData = this.handleLoadData.bind(this);
    this.handleUserParticipatingActivity = this.handleUserParticipatingActivity.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.focusListener = navigation.addListener('didFocus', () => this.handleLoadData());
  }

  componentWillUnmount() {
    this.focusListener.remove();
  }

  handleLoadData = () => {
    axios
      .get(`${url}/api/user/${userID}`)
      .then(({ data }) => this.setState({
        user: data
      }))
      .catch(err => console.log('ProfileScreen: Profile data retrieve error: ', err))
  
    this.handleUserParticipatingActivity();
  }

  handleUserParticipatingActivity() {
    axios
      .get(`${url}/api/attending/${userID}`)
      .then(({data}) => {
        this.setState({ participating: data });
      })
      .catch(err => console.error(err));
  }

  logoutAsync = async () => {
    this.props.navigation.navigate('Auth');
  }

  render() {
    return (
      <ScrollView>
        
        <Card containerStyle={styles.cardNoBorder} title={this.state.user.name}>
          <View style={styles.avatarContainer}>
            <Avatar size="xlarge" rounded source={{ uri: this.state.user.profilePic }}/>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>{this.state.user.description}</Text>
          </View>

          <Divider style={{ marginTop: 5, marginBottom: 5 }}/>

          <View style={styles.buttonContainer}>
            <Button onPress={() => this.props.navigation.navigate('Edit')} title='Edit Description' style={styles.editButton} />
            <Button onPress={this.logoutAsync} title='Logout' style={styles.logoutButton} />
          </View>

          <Divider style={{ marginTop: 5, marginBottom: 5 }}/>
        </Card>

        <Card containerStyle={styles.cardNoBorder} title='List of Participating Activities'>
          {
            this.state.participating.map((post, i) => {
              let bg = {uri: post.category.bg}
              let id = {id: post.id}
              return (
                <TouchableOpacity key={i} activeOpacity={0.5} onPress={() => this.props.navigation.navigate('Individual', id)}>
                  <Card title={post.title} image={bg}>
                    <Text>City: {post.locationCity}</Text>
                    <Text>Attendees: {post.currentAttendees === null ? 
                                  0 : post.currentAttendees}/{post.maxAttendees}</Text>
                    <Text style={{marginBottom: 10}}>Starts {moment(post.schedule.toString()).calendar()}</Text>
                  </Card>
                </TouchableOpacity>
              )
            })
          }
        </Card>

      </ScrollView>
    )
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardNoBorder: {
    borderWidth: 0,
    borderColor: 'transparent',
    elevation: 0,
    shadowColor: 'rgba(0,0,0, .2)',
    shadowOffset: { height: 0, width: 0 },
    shadowOpacity: 0, //default is 1
    shadowRadius: 0//default is 1
  },
  editButton: {
    marginHorizontal: 10,
  },
  logoutButton: {
    marginHorizontal: 10,
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
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
  }
});