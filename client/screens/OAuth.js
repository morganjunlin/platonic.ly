import React from 'react';
import { TouchableOpacity, Button, StyleSheet, Text, View, Image, AsyncStorage, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
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
      userID: null,
    };
  }

  componentDidMount() {
    this._getID()
  }

  _getID = async() => {
    try {
      this.setState({ 
        userID: await AsyncStorage.getItem('userID') || null 
      }, () => console.log('this is userID', this.state.userID))
    } catch (error) {
      console.log(error.message);
    }
  }

  _storeID = async (id) => {
    let userID = ''
    try {
      userID = await AsyncStorage.setItem('userID', JSON.stringify(id))
    } catch (err) {
      console.log("ERROR SAVING DATA: ", err);
    }
    return userID;
  }

  callGraph = async (token) => {
  const response = await fetch(
    `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`
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
                .post(`${url}/api/user`, { email, password: 'password', firstName, lastName, gender: null, age: null, profilePic, description: `Hi! My name is ${firstName}. Let's be friends!` })
                .then(({data}) => console.log('OAuth: Successful account creation from Facebook: ', data))
                .catch(err => console.log('OAuth: Something wrong with account creation from Facebook: ',  err))
            } else {
              this.setState({ userID: this._storeID(data.id) })
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
          paddingVertical: 24,
          paddingHorizontal: 4,
          backgroundColor: '#3B5998',
        }}>
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
          {str}
        </Text>
      </View>
    </TouchableOpacity>
  );

  _handlePressAsync = async () => {
    let redirectUrl = AuthSession.getRedirectUrl();
    let result = await AuthSession.startAsync({
      authUrl:
        `https://www.facebook.com/v4.0/dialog/oauth?response_type=token` +
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

  render() {
    if (this.state.userID === null) {
      return (
          <ImageBackground source={require('../assets/images/bg3.jpg')} style={{width: '100%', height: '100%'}}>
            <View style={styles.container}>
              <Text style={styles.paragraph}>Platonic.ly</Text>
              
              <View style={{ padding: 50 }}>
                <Icon.Button
                  name="facebook"
                  backgroundColor="#3b5998"
                  onPress={() => this._handlePressAsync()}
                  size={30}
                >
                  Login with Facebook
                </Icon.Button>
              </View>
            </View>
          </ImageBackground>
        )
    } else {
        // console.log("JSON RESPONSE:", this.state.responseJSON)
        console.log('USERID IS NOW: ', this.state.userID)
        return (
          this.props.navigation.navigate('Main')
        )
    }
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
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fffff0',
  },
});