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
import dummyData from '../../../data/dummyData/getAllPosts.json';
import { SearchBar, Header } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';

export default class IndividualPost extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      
    }
  }

  render() {
    console.log('inside individual post')
    console.log(this.props.navigation.state.params.id)
    console.log('wll the id show?')
    return(
      <View>
        <View>
          <Text>clicked post id: {this.props.navigation.state.params.id}</Text>
        </View>
      </View>
    )
  }
}