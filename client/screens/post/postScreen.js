import React from 'react';
import styled from 'styled-components';
import { AsyncStorage, ScrollView, StyleSheet, View, TextInput, Text, Modal, TouchableHighlight, Alert, ImageBackground } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Button, Overlay} from 'react-native-elements';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import { url } from '../../../conf.js';

const categories = {
  'Food': { value: 1, bg: 'https://st.focusedcollection.com/3839757/i/650/focused_178420246-stock-photo-asian-friends-having-dinner-together.jpg' },
  'Sports': { value: 2, bg: 'https://c8.alamy.com/comp/P9K822/young-asian-adult-players-playing-basketball-on-outdoor-court-P9K822.jpg' },
  'Nature': { value: 3, bg: 'https://image.shutterstock.com/image-photo/beautiful-autumn-forest-mountain-path-260nw-111970076.jpg' },
  'Education': { value: 4, bg: 'https://cdn.explara.com/thailand20180713154259.jpg' },
  'Studying': { value: 5, bg: 'https://as1.ftcdn.net/jpg/01/87/90/48/500_F_187904831_iGE4JXj48vKUsLVP5MVo81x9SIAyyQfW.jpg' },
  'Picnic': { value: 6, bg: 'https://as2.ftcdn.net/jpg/02/12/98/15/500_F_212981555_5OK5TnV7AKOx1NCTpld4pXDJ2L5CUvjQ.jpg' },
  'Beach': { value: 7, bg: 'https://as1.ftcdn.net/jpg/02/29/50/74/500_F_229507428_bDMkZ13pBOA3hjQfNTEuDgjQVBgKoqKF.jpg' },
  'Drinks': { value: 8, bg: 'https://t3.ftcdn.net/jpg/01/11/55/60/500_F_111556056_E1B9cLEy7JX2rMyv48TKfgKEU6DukFxo.jpg' },
  'Barbeque': { value: 9, bg: 'https://en.pimg.jp/029/849/737/1/29849737.jpg' },
  'Camping': { value: 10, bg: 'https://en.pimg.jp/032/573/255/1/32573255.jpg' }
};
const today = new Date();
const letsDate = {
  0: today,
  1: new Date(),
  2: new Date(),
  3: new Date(),
  4: new Date(),
  5: new Date(),
  6: new Date()
}
for (let i = 0; i < 7; i++) {
  letsDate[i].setDate(today.getDate() + i)
}

let dateOptions = Object.values(letsDate);
dateOptions = dateOptions.map(date => { return { value : moment(date).format("dddd, MMM Do, YYYY") } });

export default class PostScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bg: 'https://ak7.picdn.net/shutterstock/videos/5851637/thumb/6.jpg',
      userID: null,
      title: '',
      description: '',
      address: '', 
      category: 0, 
      maxAttendees: 0,
      isVisible: false,
      schedule: today,
      Month: '',
      Day: '',
      Hour: '', 
      Min: '',
      categoriesPool: [
        { value: 'Food' },
        { value: 'Sports' },
        { value: 'Nature' },
        { value: 'Education' },
        { value: 'Studying' },
        { value: 'Picnic' },
        { value: 'Beach' },
        { value: 'Drinks' },
        { value: 'Barbeque' },
        { value: 'Camping' } ], 
      attendeesPool: [{value: 2}, 
                {value: 3}, {value: 4}, {value: 5}, 
                {value: 6}, {value: 7}, {value: 8}, 
                {value: 9}, {value: 10}, {value: 11}, 
                {value: 12}, {value: 13}, {value: 14}, 
                {value: 15}, {value: 16}, {value: 17}, 
                {value: 18}, {value: 19}, {value: 20}],
      MonthPool: [{value: 1 }, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6 }, {value: 7}, {value: 8}, {value: 9}, {value: 10}, {value: 11}, {value: 12}], 
      DatePool: [{value: 1 }, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6 }, {value: 7}, {value: 8}, {value: 9}, {value: 10},
                {value: 11 }, {value: 12}, {value: 13}, {value: 14}, {value: 15}, {value: 16 }, {value: 17}, {value: 18}, {value: 19}, {value: 20},
                {value: 21 }, {value: 22}, {value: 23}, {value: 24}, {value: 25}, {value: 26 }, {value: 27}, {value: 28}, {value: 29}, {value: 30}],
      HourPool: [{value: 0}, {value: 1 }, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6 }, {value: 7}, {value: 8}, {value: 9}, {value: 10},
                {value: 11 }, {value: 12}, {value: 13 }, {value: 14}, {value: 15}, {value: 16}, {value: 17}, {value: 18 }, {value: 19}, {value: 20}, {value: 21}, {value: 22},
                {value: 23 }], 
      MinPool: [{value: '00'}, {value: '15'}, {value: '30'}, {value: '45'}],
    };
    
    this.getUserID = this.getUserID.bind(this);
    this.checkInputFields = this.checkInputFields.bind(this);
    this.handleInputAlert = this.handleInputAlert.bind(this);
    this.handleGetSchedule = this.handleGetSchedule.bind(this);
    this.handleSubmitInfo = this.handleSubmitInfo.bind(this);
    this.handleSubmitAndGoHome = this.handleSubmitAndGoHome.bind(this)
    this.categoryBackgroundRender = this.categoryBackgroundRender.bind(this)
  }

  componentDidMount() {
    this.getUserID();
  }

  getUserID = async () => {
    try {
      this.setState({ userID: await AsyncStorage.getItem('userID')})
    } catch (error) {
      console.log(error.message);
    }
  }
    
  checkInputFields() {
    if (this.state.title === '' || this.state.description === '' || this.state.address === '') {
      return false;
    } else {
      return true;
    }
  }

  handleSubmitInfo() {
    let { userID, title, address, city, state, zip, description, category, maxAttendees, schedule } = this.state;

    axios
      .post(`${url}/api/post`, { userID, title, address, city: 'Los Angeles', state: 'CA', zip: 90005, description, category, maxAttendees, schedule })
      .catch(err => console.error(err));
  }

  handleSubmitAndGoHome () {
      this.handleGetSchedule();
      this.handleSubmitInfo();
      this.props.navigation.navigate('Home');
      this.setState({
        isVisible: !this.state.isVisible,
        title: '',
        description: '',
        address: '', 
        category: 0, 
        maxAttendees: 0,
        isVisible: false,
        Month: '',
        Day: '',
        Hour: '', 
        Min: '',
      });
  }
    
  handleInputAlert() {
    Alert.alert(
      'Please fill in all fields', 
      [{text: 'ok', 
        onPress: () => console.log('informed'),
        style: 'cancel'
      }]
    )
  }

  handleGetSchedule() {
    let final = this.state.schedule
    final.setHours(this.state.Hour);
    final.setMinutes(this.state.Min);
    this.setState({ schedule: final })
  }
  
  categoryBackgroundRender() {
    let bg = {uri : this.state.bg};
    return (
      <SingleEventBackground source={bg}>
        <LinearGradient colors={['transparent', 'rgba(255,255,255,1)']}>
          <SingleEventBox>
            <PageTitle style={{textAlign: 'center'}}> </PageTitle>
            <PageTitle style={{textAlign: 'center'}}> </PageTitle>
            <PageTitle style={{textAlign: 'center'}}> </PageTitle>
            <PageTitle style={{textAlign: 'center'}}> </PageTitle>
            <PageTitle style={{textAlign: 'center'}}>Host an event!</PageTitle>
          </SingleEventBox>
        </LinearGradient>
      </SingleEventBackground>
    )
  }

  render() {
    let { userID, title, address, description, category, maxAttendees, Month, Day, Hour, Min } = this.state;
    
    return (
      <ScrollView style={styles.container}>
        {this.categoryBackgroundRender()}
        <View style={styles.formContainer}>
          <View style={styles.pickerSelectStyles}>
            <Dropdown
              label = 'Select the best fitting category for your event'
              data = {this.state.categoriesPool}
              onChangeText = {(target) => this.setState({
                category: categories[target].value,
                bg: categories[target].bg
              })}
            />
          </View>
          <Text>Give your event a short, eye catching title. </Text>
            <TextInput 
              style={styles.inputField}
              editable = {true}
              placeholder = 'Enter title here'
              onChangeText = {(text) => this.setState({title: text})}
              value={this.state.title}
            />
            <Text>What should people know about your event? Should people bring something? Any additional information that people should know about?</Text>
            <TextInput 
              style ={styles.inputField}
              editable = {true}
              placeholder = 'Description'
              onChangeText = {(text) => this.setState({description: text})}
              value={this.state.description}
            />
            <Text>Where will your event take place? Currently our app only supports events taking place in Los Angeles.</Text>
            <TextInput 
              style={styles.inputField}
              editable = {true}
              placeholder = 'Enter street address'
              onChangeText = {(text) => this.setState({address: text})}
              value={this.state.address}
            />
                
                    <Dropdown
                        label='How many people incuding yourself can attend?'
                        data={this.state.attendeesPool}
                        onChangeText = {(target) => this.setState({
                            maxAttendees: target
                        })}
                    />
                <Dropdown
          dropdownStyle={{ width: 100 }}
          label='Schedule the date of your event'
          data={dateOptions}
          onChangeText = {(target, indx) => this.setState({
            schedule: letsDate[indx]
          })}
        />
        <Dropdown
          dropdownStyle={{ width: 100 }}
          label='Hour'
          data={this.state.HourPool}
          onChangeText = { Hour => {
            this.handleGetSchedule()
            this.setState({ Hour })
          }}
        />
        <Dropdown
          dropdownStyle={{ width: 100 }}
          label='Minute'
          data={this.state.MinPool}
          onChangeText = { Min => {
            this.handleGetSchedule()
            this.setState({ Min })}}
        />

        
                <Button title='Submit your event!'
                        type="outline"
                        accessibilityLabel='Submit Button'
                        onPress={this.checkInputFields() ? () => this.setState({isVisible: !this.state.isVisible}) : 
                                () => this.handleInputAlert()}
                /></View>
                <PageTitle style={{textAlign: 'center'}}> </PageTitle>
                <Overlay
                    isVisible={this.state.isVisible}
                    windowBackgroundColor="rgba(228, 233, 237, 0.9)"
                    overlayBackgroundColor="white"
                    containerStyle={{borderColor: 'grey'}}
                    width="50%"
                    height="40%"
                    >
                    <View style={{fontSize: 25,
                                paddingVertical: 40,
                                paddingHorizontal: 10,
                                flex: 1,}}>
                        <Text>Title: {title}</Text>
                        <Text>Description: {description}</Text>
                        <Text>Address: {address}</Text>
                        <Text>Category: {category}</Text>
                        <Text>Number of attendees: {maxAttendees}</Text>
                        <Text>Time: {Month}/{Day} @ {Hour}:{Min}</Text>
                        <Button 
                            style={styles.confirmButton}
                            type="solid"
                            title="Confirm"
                            onPress={() => {this.handleSubmitAndGoHome()}}
                        />
                        
                    </View>
                </Overlay>
            </ScrollView>

        )
    }
};


PostScreen.navigationOptions = {
    title: 'Post',
};

const PageTitle = styled.Text`
font-size: 32px;
color: black;
font-Family: Helvetica;
`;

const SingleEventBackground = styled.ImageBackground`
background-color:#fff;
width:100%;
height: 250px;
`;

const SingleEventBox = styled.View`
width:100%;
height: 250px;
padding: 3%;
justifyContent: flex-end;
`;

const styles = StyleSheet.create({
    container: {
        fontSize: 16,
        flex: 1,
    },
    formContainer : {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
    },
    inputField: {
      margin: 10,
      height: 40,
      borderColor: '#d3d3d3',
      borderWidth: 1,
      padding: 5 
    },

    pickerSelectStyles: {
        fontSize: 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: 'black',
        fontWeight: 'bold',
    },

    pickerContainer: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
    }, 
    schedulePickerContainer: {
        width: 50,
    }, 
    confirmButton: {
        marginBottom: 30
    }
});
