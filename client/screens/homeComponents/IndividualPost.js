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
      data: []
    }
  }

  handleFetchIndividualPost(targetId) {
    axios
    .get(`http://localhost:3000/api/post/${targetId}`)
    .then(({ data }) => {
      this.setState({
        data: data
      })
    })
    .catch(err => console.error(err))
  }
  render() {
    return(
      <View>
        <View>
          <Text></Text>
        </View>
      </View>
    )
  }
}