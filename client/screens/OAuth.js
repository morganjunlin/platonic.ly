import React from 'react';
import { TouchableOpacity, Button, StyleSheet, Text, View, Image, AsyncStorage, ImageBackground } from 'react-native';
import { AuthSession } from 'expo';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import axios from 'axios';
import { url } from '../../conf.js';

const FB_APP_ID = '537903636972442';

export default class SignInScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      result: null,
      token: null,
      responseJSON: null,
      id: null,
      name: null,
      profile: null,
    };
  }

_storeData = async () => {
    try {
      await AsyncStorage.setItem('responseJSON', this.state.responseJSON);
    } catch (error) {
      console.log("ERROR SAVING DATA: ", error);
    }
};

_storeID = async (id) => {
  try {
    await AsyncStorage.setItem('id', JSON.stringify(id))
  } catch (err) {
    console.log("ERROR SAVING DATA: ", err);
  }
}

callGraph = async (token) => {
  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
  );
  const responseJSON = JSON.stringify(await response.json());

  let test = JSON.parse(responseJSON)
  if (test.id) {
    this.setState({ responseJSON }, () => {
      var json = JSON.parse(responseJSON);

      axios
        .get(`${url}/api/user/`, { params: { email: json.email, password: 'password' } })
        .then(({ data }) => {
            if (!data.id) {
              let { id, email, name } = json
              id = Number(id)
              let firstName = name.split(' ')[0]
              let lastName = name.split(' ')[1]
              let profilePic = `http://graph.facebook.com/${id}/picture?type=large`

              axios
                .post(`${url}/api/user`, { email, password: 'password', firstName, lastName, gender: (firstName === 'Angela') ? 'female' : 'male', age: 99, profilePic, description: 'hello i am cool pls be friend me' })
                .then(({data}) => console.log('=== POST SUCCESSFUL OF USER ===', data))
                .catch(err => console.log('=== SOMETHING WENT WRONG CREATING USER ===',  err))
            } else {
              console.log('USER IS IN DATABASE. COOL:', data)
              // this should work but it doesn't
              this._storeID(data[id])
            }
          })
      });
    }
  };

  renderButton = (str) => (
    <TouchableOpacity onPress={this._handlePressAsync}>
      <View
        style={{
          width: '50%',
          alignSelf: 'center',
          borderRadius: 4,
          padding: 24,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          {str}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    if (this.state.responseJSON === null) {
      return (
          <ImageBackground source={require('../assets/images/bg3.jpg')} style={{width: '100%', height: '100%'}} >
          <View style={styles.container}>
          <Text style={styles.paragraph}>Platonic.ly</Text>
          {this.renderButton('Sign In With Facebook')}
          </View>
          </ImageBackground>
        )
    } else {
        console.log("TOKEN:", this.state.token)
        console.log("JSON RESPONSE:", this.state.responseJSON)
        this._storeData();
        this.props.navigation.navigate('Main', {
          user: this.state.responseJSON,
        });
        return (
          <View><Text>Success</Text></View>
          )
    }
  }

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v2.8/dialog/oauth?response_type=token` +
        `&client_id=${FB_APP_ID}` +
        `&redirect_uri=${encodeURIComponent(redirectUrl)}`,
    });

    const { type } = result;
    this.setState({ result: type }, () => {
      if (type === 'success') {
        this.setState({
          token: result['params']['access_token']
        }, () => {
          this.callGraph(this.state.token)
        })
      }
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  paragraph: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    margin: 24,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fffff0',
  },
});