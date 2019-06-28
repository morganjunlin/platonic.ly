import React from 'react';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
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
import dummyData from '../../../data/dummyData/getAllPosts.json';
import { SearchBar, Header } from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import url from '../../../conf.js';

const userID = 12;

export default class IndividualPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventID: this.props.navigation.state.params.id,
      data: {
        id: -1,
        title: "",
        description: "",
        location: {},
        category: {},
        currentAttendees: [],
        maxAttendees: 0,
        schedule: "",
        created_at: ""
      }
    }
    this.fetchOnePost = this.fetchOnePost.bind(this);
    this.attendeeProfile = this.attendeeProfile.bind(this);
    this.requestToJoin = this.requestToJoin.bind(this);
  }


  // this function fetches a single detailed event and saves it as singleEventData inside state.
  fetchOnePost(id) {
    axios
      .get(`${url}/api/post/${id}`)
      .then(({data}) => {
        this.setState({ data });
      }, () => console.log(data, '!!!!!!'))
      .catch(err => console.error(err));
  }

  //this function renders a single attendee's mini info with photo and first name, and link to the full profile page.
  attendeeProfile(profile) {
    let img = {uri: profile.profilePic};
    return (
      <View key={profile.userID} style={{margin: 5}}>
        <Image style={{width: 100, height: 100}} source={img} />
        <EventFormDetails style={{textAlign: 'center'}}>{profile.firstName}</EventFormDetails>
      </View>
    )
  }

  componentDidMount() {
    this.fetchOnePost(this.state.eventID);
  }

  requestToJoin(postID) {
    axios
    .post(`${url}/api/attendees`, { userID, postID })
    .then(() => console.log(`user requested to join`))
    .catch(err => console.error(err));
  }

  render() {
    const data = this.state.data;
    let bg = {uri : data.category.bg};
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    let attendList = ds.cloneWithRows(data.currentAttendees);
    if (data.id > -1) {
    return (
      <SingleEventPage>
        <SingleEventBackground source={bg}>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,1)']}>
            <SingleEventBox>
              <EventTitle>{data.title}</EventTitle>
            </SingleEventBox>
          </LinearGradient>
        </SingleEventBackground>
        <SingleEventDetails>
          <EventForm>Posted {moment(data.created_at).fromNow()}.</EventForm>
          <EventForm>This event starts {moment(new Date(data.schedule).toString()).calendar()}</EventForm>
          <EventForm>Address: {data.location.address} {data.location.city}, {data.location.state}, {data.location.zip}</EventForm>
          <EventForm> </EventForm>
          <EventForm>Details: {data.description}</EventForm>
          <EventForm> </EventForm>
          <EventForm>
            {data.currentAttendees.length < 2 ? `One person is going! ` : `There are ${data.currentAttendees.length} people are going! `}
            {data.maxAttendees - data.currentAttendees.length === 0 ? `No more spots left!` : data.maxAttendees - data.currentAttendees.length > 1 ? `There are ${data.maxAttendees - data.currentAttendees.length} spots left!` : `Only 1 spot left!` }
          </EventForm>
          <ListView
            enableEmptySections={true}
            horizontal={true}
            style={{flex:1}}
            dataSource={attendList}
            renderRow={(profile) => this.attendeeProfile(profile) } />
          <EventRequest style={{textAlign: 'center'}} onPress={() => this.requestToJoin(data.id)}>Request to join event!</EventRequest>
        </SingleEventDetails>
      </SingleEventPage>
  )
}
  else {
    return (
      <SingleEventPage>
      </SingleEventPage>
    )
  }
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

const EventRequest = styled.Text`
font-size: 20px;
color: #e3e3e3;
font-Family: Helvetica;
borderColor: #FFffff;
borderWidth: 1;
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