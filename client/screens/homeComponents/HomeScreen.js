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
// import moment from 'moment';
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
    this.handleChangeConents = this.handleChangeConents.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  updateSearch = (search) => {
    this.setState({ search });
  };

  handleChangeConents = (target) => {
    this.setState({ page: target });
  };

  handlePageChange = () => {
    if (this.state.page === 'AllPosts') {
      return <AllPost navigation = {this.props.navigation}/>
    } else {
      return <MyPosts />
    }
  }

  render () {
    const { search } = this.state;
    console.log(this.props.navigate)
    return (
      <ScrollView>
        {/* <Button onPress={() => this.props.navigation.navigate('Individual')}></Button> */}
        <View style={styles.HeaderButtonContainer}>
          <View >
            <Button 
              type='clear'
              title='All Posts' 
              // onPress={() => {this.handleChangeConents('AllPosts')}}
              onPress={() => this.handleChangeConents('AllPosts')}
            />
          </View>
          <View>
            <Button 
              type='clear'
              title='My Posts'
              onPress={() => {this.handleChangeConents('MyPosts')}}
            />
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
  title: 'Meet Friends',
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


