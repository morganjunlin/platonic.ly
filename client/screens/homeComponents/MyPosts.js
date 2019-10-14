import React from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
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
import url from '../../../conf.js';

const userID = 12;

export default class MyPosts extends React.Component {
  constructor() {
    super()
    this.state={
      data: [],
      search: ''
    }
    this.updateSearch = this.updateSearch.bind(this);
    this.singleEvent = this.singleEvent.bind(this);
    this.handleFetchUserPost = this.handleFetchUserPost.bind(this);
  }

  componentDidMount() {
    this.handleFetchUserPost();
  }

  handleFetchUserPost = () => {
    axios
    .get(`${url}/api/myposts/${userID}`)
    .then(({ data }) => {
      this.setState({ data });
    })
    .catch(err => console.error(err))

  }

  updateSearch = search => {
    this.setState({ search });
  };

  singleEvent (evnt, i) {
    let bg = {uri : evnt.category.bg};
    let id = { id: evnt.id };
    return (
      <TouchableOpacity key = {i} onPress={() => this.props.navigation.navigate('HostPost', id )}>
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
    )
  }

  render () {
    const { search } = this.state;

    return (
      <ScrollView>
        <View>
          <SearchBar placeholder="Search" onChangeText={this.updateSearch} value={search} />
        </View>
        {this.state.data.map((evnt, i) => this.singleEvent(evnt, i))}        
      </ScrollView>
    )
  }
}

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