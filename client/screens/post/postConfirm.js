import React from 'react';
import { ScrollView, StyleSheet, Button, View, TextInput, Text, Modal, TouchableHighlight, Alert} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {NavigationActions} from 'react-navigation';
import { DrawerActions } from 'react-navigation';
import { Dropdown } from 'react-native-material-dropdown';


const styles = StyleSheet.create({

})

const PostConfirmScreen = (props) => {
console.log(props)
  let {title, description, address, catagory} = props.navigation.state.params;
  return (
    <View style={{fontSize: 25,
                  paddingVertical: 40,
                  paddingHorizontal: 10,
                  flex: 1,}}>
      <Text>Title: {title}</Text>
      <Text>Description: {description}</Text>
      <Text>Address: {address}</Text>
      <Text>Catagory: {catagory}</Text>
      <Button 
        title="Confirm"
        onPress={() => props.navigation.navigate('Home')}
      />
    </View>
  )
}

export default PostConfirmScreen;