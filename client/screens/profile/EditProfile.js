import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import axios from 'axios';
import { url, userID } from '../../../conf.js';

export default class EditProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      profilePic: '',
      name: '',
      description: ''
    }

    this.handleLoadData = this.handleLoadData.bind(this);
    this.submitProfileChanges = this.submitProfileChanges.bind(this);
  }

  componentDidMount() {
    this.handleLoadData();
  }

  handleLoadData = () => {
    axios
      .get(`${url}/api/user/${userID}`)
      .then(({ data }) => this.setState({
        profilePic: data.profilePic,
        name: data.name,
        description: data.description
      }))
      .catch(err => console.log('EditProfile: Profile data retrieve error: ', err))
  }

  submitProfileChanges = () => {
    let { name, description } = this.state;
    let first_name = name.split(' ')[0];
    let last_name = name.split(' ')[1];

    axios
      .patch(`${url}/api/user/${userID}`, { first_name, last_name, description })
      .then(() => this.props.navigation.navigate('Profile', { name, description }))
      .catch(err => console.log('Profile edit error: ', err))    
  }

  render() {
    return (
      <ScrollView>
          <View style={styles.avatarContainer}>
            <Avatar size="xlarge" rounded source={this.state.profilePic ? {uri: this.state.profilePic} : null}/>
          </View>
          <View style={styles.container}>
            <Text style={styles.labelNames}>Name: </Text> 
            <TextInput 
              style={styles.inputNameField}
              editable = {true}
              value = {this.state.name}
              onChangeText = {(text) => this.setState({ name: text })}
            />
            <Text style={styles.labelNames}>Description: </Text> 
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.inputDescriptionField}
              editable = {true}
              value = {this.state.description}
              onChangeText = {(text) => this.setState({ description: text })}
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button onPress={this.submitProfileChanges} title='Submit' style={styles.submitButton} />
          </View>

      </ScrollView>
    )
  }
}

EditProfile.navigationOptions = {
  title: 'Edit Profile',
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  labelNames: {
    marginHorizontal: 10,
  },
  inputNameField: {
      margin: 10,
      height: 40,
      borderColor: '#d3d3d3',
      borderWidth: 1,
      padding: 5 
  },
  inputDescriptionField: {
      margin: 10,
      height: 100,
      borderColor: '#d3d3d3',
      borderWidth: 1,
      padding: 5 
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    marginHorizontal: 10,
  },
});