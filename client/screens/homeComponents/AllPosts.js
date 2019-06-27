
import * as WebBrowser from 'expo-web-browser';
import styled from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import { SearchBar, Header , Button} from 'react-native-elements';
import moment from 'moment';
import axios from 'axios';
import url from '../../../conf.js';
import IndividualPost from './IndividualPost';

export default class AllPosts extends React.Component {
  constructor(props) {
    super(props)
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

  updateSearch = search => {
    this.setState({ search });
  };

  handleFetchUserPost = () => {
    axios
    .get(`${url}/api/post`)
    .then(data => {
      this.setState({
        data: data.data
      }, () => console.log(this.props));
    })
    .catch(err => console.error(err));

  }

  singleEvent (evnt, i) {
    let bg = {uri : evnt.category.bg};
    // console.log(this.props)
    return (
      // <EventBox key={i}>
      <EventBackground
      key = {i}
      source={bg}
      >
      <Button onPress={() => this.props.navigation.navigate('Individual')}></Button>
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.5)']}>
            <EventBox>
              <EventTitle>{evnt.title}</EventTitle>
              <EventForm>Posted {moment(evnt.created_at).fromNow()}. Starts {moment(new Date(evnt.schedule).toString()).calendar()}</EventForm>
              <EventForm>{evnt.currentAttendees === null ? `No one joined yet. ` : evnt.currentAttendees + ` people are going! `}
              {evnt.maxAttendees - evnt.currentAttendees} spots left. </EventForm>
              <EventForm> </EventForm>
            </EventBox>
          </LinearGradient>
        </EventBackground>
      // </EventBox>
    )
  }

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
        {this.state.data.map((evnt, i) => this.singleEvent(evnt,i))}
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
margin:2%;
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