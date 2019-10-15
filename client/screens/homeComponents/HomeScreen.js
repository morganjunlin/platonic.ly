import * as WebBrowser from 'expo-web-browser';
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
import { SearchBar, Header, Button } from 'react-native-elements';
import AllPost from './AllPosts.js';
import MyPosts from './MyPosts.js';
import IndividualPost from './IndividualPost.js';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      page: 'AllPosts',
      data: dummyData,
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.handleChangeContents = this.handleChangeContents.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  handleChangeContents = (target) => {
    this.setState({ page: target });
  };

  handlePageChange = () => {
    if (this.state.page === 'AllPosts') {
      return <AllPost navigation = {this.props.navigation}/>
    } else {
      return <MyPosts navigation = {this.props.navigation}/>
    }
  }

  render () {
    const { search } = this.state;
    return (
      <ScrollView>
        <View style={styles.HeaderButtonContainer}>
          <View >
            <Button type='clear' title='All Posts' onPress={() => this.handleChangeContents('AllPosts')}/>
          </View>
          <View>
            <Button type='clear' title='My Posts' onPress={() => {this.handleChangeContents('MyPosts')}}/>
          </View>
        </View>
        <View>
          {this.handlePageChange()}
        </View>
      </ScrollView>
    )
  }
}

HomeScreen.navigationOptions = {
  title: 'Platonic.ly',
};

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
  }, 
  HeaderButtonContainer: {
    flexDirection:'row', 
    flexWrap:'wrap',
    justifyContent: 'space-around'
  }, 
  HeaderButtonWrapper: {
    flex: 1
  },
  HeaderButtonInactive: {
    justifyContent: 'center'
  }
})


