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

export default class MyPosts extends React.Component {
  constructor() {
    super()
    this.state={
      data: [],
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this);
    // this.handleFetchUserPost = this.handleFetchUserPost.bind(this);
  }

  componentDidMount() {
    // this.handleFetchUserPost();
  }

  // handleFetchUserPost = () => {
  //   axios
  //   .get('https://localhost:3000/api/post')
  //   .then(( data ) => {
  //     // console.log(data);
  //     this.setState({
  //       data: data.data
  //     });
  //   })
  //   .catch(err => console.error(err))

  // }

  updateSearch = search => {
    this.setState({ search });
  };

  render () {
    const { search } = this.state;

    return (
      <ScrollView>
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>
        {this.state.data.map((item, i) => {
          return (
            <View key={i} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.itemLocation}>
                <Text>Location: </Text><Text>{item.locationCity}</Text>
              </View>
              <Text>Attendees: {item.currentAttendees === null ? 
                                0 : item.currentAttendees}/{item.maxAttendees}</Text>
              <Text>Schedule: {new Date(item.schedule).toString()}</Text>
              <Text>Posted {moment(item.created_at).fromNow()}</Text>
            </View>
          )
        })}
        <Text>hi</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    flex: 1
  }, 
  itemTitle: {
    color: '#00A2E5',
    fontWeight: 'bold'
  }, 
  itemLocation: {
    flexDirection:'row', 
    flexWrap:'wrap'
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  outerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    borderBottomColor: '#f2f2f2',
    borderBottomWidth: 1,
    padding: 15,
    height: 70,
  }
})