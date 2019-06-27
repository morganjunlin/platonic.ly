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
    return(
      <View>
        <View>
          <Text>hi</Text>
        </View>
      </View>
    )
  }
}