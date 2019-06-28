
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  RefreshControl,
  ListView,
  Image
} from 'react-native';
import { SearchBar, Header , Button } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import url from '../../../conf.js';
import IndividualPost from './IndividualPost';

export default class AllPosts extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      refreshing: false,
      data: [],
      singleEventData: {},
      search: '',
      form: 'all'
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.singleEvent = this.singleEvent.bind(this);
    this.handleFetchUserPost = this.handleFetchUserPost.bind(this);
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
    this.fetchOnePost(id);
  }
  
  // this function fetches a single detailed event and saves it as singleEventData inside state.

  singleEvent (evnt, i) {
    let bg = {uri : evnt.category.bg};
    let id = { id: evnt.id };
    // console.log(this.props)
    return (
      // <EventBox key={i}>
      // <TouchableOpacity key = {i} onPress={() => this.handleAllEventClick(evnt.id)}>
      <TouchableOpacity key = {i} onPress={() => this.props.navigation.navigate('Individual', id )}>
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

  render () {
    console.log('inside all posts render')
    console.log(this.props.navigation)
    const { search } = this.state;
    if (this.state.form === 'all') {
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

        {this.state.data.map((evnt, i) => this.singleEvent(evnt,i))}
      </ScrollView>
      )
    } else {
      return (
        <ScrollView>
          {this.singleEventDetailed(this.state.singleEventData)}
        </ScrollView>
      )
    }
    return (
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        />
      }>
        <View>
          <Button onPress={ () => this.props.navigation.navigate('Individual')}></Button>
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

const EventFormDetails = styled.Text`
font-size: 20px;
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

const SingleEventPage = styled.View`
flex:1;
background-color:#000;
width:100%;
height: 100%;
justifyContent: flex-start;
`;

const SingleEventBackground = styled.ImageBackground`
background-color:#fff;
width:100%;
height: 300px;
`;

const SingleEventBox = styled.View`
width:100%;
height:100%;
padding: 3%;
justifyContent: flex-end;
`;

const SingleEventDetails = styled.View`
flex: 1;
width:100%;
height:400px;
background-color:#000;
padding: 3%;
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