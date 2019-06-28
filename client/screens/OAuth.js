import React from 'react';
import { TouchableOpacity, Button, StyleSheet, Text, View, Image } from 'react-native';
import { AuthSession } from 'expo';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

const FB_APP_ID = '769268703474829';

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

  callGraph = async token => {
    const response = await fetch(
      `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,about,picture`
    );
    const responseJSON = JSON.stringify(await response.json());

    let test = JSON.parse(responseJSON)
    if (test.id) {
      this.setState({ responseJSON }, () => {
        var json = JSON.parse(responseJSON);
        this.setState({
          id: json.id,
          name: json.name,
          profile: json.picture.data.url
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
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {str}
        </Text>
      </View>
    </TouchableOpacity>
  );

  render() {
    if (this.state.responseJSON === null) {
      return (
        <View style={styles.container}>
        <Text style={styles.paragraph}>Platonic.ly</Text>
          {this.renderButton('Login with FB')}
          <Text onPress={() => this.props.navigation.navigate('Main')}>bypass</Text>
        </View>
        )
    } else {
      console.log("TOKEN:", this.state.token)
      console.log("JSON RESPONSE:", this.state.responseJSON)
        this.props.navigation.navigate('Main', {
          user: this.state.responseJSON,
        });
        return (
          <View><Text>success</Text></View>
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
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});