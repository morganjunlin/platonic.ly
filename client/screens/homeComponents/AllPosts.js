import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  RefreshControl
} from 'react-native';
import dummyData from '../../../data/dummyData/getAllPosts.json';
import { SearchBar, Header } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import url from '../../../conf.js';

export default class AllPosts extends React.Component {
  constructor() {
    super()
    this.state={
      refreshing: false,
      data: [],
      singleEventData: {},
      search: '',
      form: 'all'
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.singleEvent = this.singleEvent.bind(this);
    this.singleEventDetailed = this.singleEventDetailed.bind(this);
    this.handleFetchUserPost = this.handleFetchUserPost.bind(this);
    this.fetchOnePost = this.fetchOnePost.bind(this);
    this.handleAllEventClick = this.handleAllEventClick.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  _onRefresh = () => {
    console.log('refreshing')
    this.setState({refreshing: true});
    this.handleFetchUserPost().then(() => {
      this.setState({refreshing: false});
    });
  }

  componentDidMount() {
    console.log('yay!!!!! it mounted ')
    this.handleFetchUserPost();
  }

  updateSearch = search => {
    this.setState({ search });
  };

  // this function fetches all events
  handleFetchUserPost = () => {
    axios
      .get(`${url}/api/post`)
      .then(({data}) => {
        this.setState({ data });
      })
      .catch(err => console.error(err));
  }

  // this function is the click functionality for events in all posts.
  // renders state to view one form. then fetches data of that one single event.
  handleAllEventClick(id) {
    this.fetchOnePost(id)
  }
  
  // this function fetches a single detailed event and saves it as singleEventData inside state.
  fetchOnePost(id) {
    axios
      .get(`${url}/api/post/${id}`)
      .then(singleEventData => {
        this.setState({ 
          singleEventData: singleEventData,
          form: 'one'});
      })
      .catch(err => console.error(err));
  }

  singleEvent (evnt, i) {
    let bg = {uri : evnt.category.bg};
    return (
      // <EventBox key={i}>
      <TouchableOpacity key = {i} onPress={() => this.handleAllEventClick(evnt.id)}>
        <EventBackground
          source={bg}
        >
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']}>
            <EventBox>
            
              <EventTitle>{evnt.title}</EventTitle>
              <EventForm>Posted {moment(evnt.created_at).fromNow()}. Starts {moment(new Date(evnt.schedule).toString()).calendar()}</EventForm>
              <EventForm>{evnt.currentAttendees < 2 ? `One person is going! ` : evnt.currentAttendees + ` people are going! `}
              {evnt.maxAttendees - evnt.currentAttendees} spots left. </EventForm>
              <EventForm> </EventForm>
            </EventBox>
          </LinearGradient>
        </EventBackground>
      </TouchableOpacity>
      // </EventBox>
    )
  }

  singleEventDetailed (evnt) {
    let bg = {uri : evnt.category.bg};
    <EventBackground
    source={bg}
    >
    <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']}>
      <EventBox>
      
        <EventTitle>{evnt.title}</EventTitle>
        <EventForm>Posted {moment(evnt.created_at).fromNow()}. Starts {moment(new Date(evnt.schedule).toString()).calendar()}</EventForm>
        <EventForm>LETS GOOOOO</EventForm>
        <EventForm> </EventForm>
      </EventBox>
    </LinearGradient>
  </EventBackground>
  }

  render () {
    const { search } = this.state;
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={this.updateSearch}
            value={search}
          />
        </View>

        {this.state.form === 'all'?
          this.state.data.map((evnt, i) => this.singleEvent(evnt,i)) :
          this.singleEventDetailed(this.state.singleEventData) }
      </ScrollView>
    )
  }
}

// HomeScreen.navigationOptions = {
//   title: 'Meet Friends',
// };

const EventTitle = styled.Text`
font-size: 32px;
color: #fff;
font-Family: Helvetica;
font-weight: bold
`;

const EventForm = styled.Text`
font-size: 14px;
color: #e3e3e3;
font-Family: Helvetica
`;

const EventBackground = styled.ImageBackground`
flex:1;
margin:1% 2%;
background-color:#fff;
width:96%;
height: 200px;
`;

const EventBox = styled.View`
width:100%;
height: 200px;
padding: 3%;
justifyContent: flex-end
`;

const styles = StyleSheet.create({
  evntContainer: {
    borderColor: 'red',
    borderWidth: 1,
    height:100,
    flex: 1
  }, 
  evntTitle: {
    color: 'pink',
    fontFamily: 'Helvetica',
    fontSize: 24
  }, 
  evntLocation: {
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