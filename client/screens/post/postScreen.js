import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, Modal, TouchableHighlight, Alert} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Button, Overlay} from 'react-native-elements';
import url from '../../../conf.js';
import axios from 'axios';




export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            title: '',
            description: '',
            address: '', 
            catagory: '', 
            maxAttendees: 0,
            isVisible: false,
            Month: '',
            Day: '',
            Hour: '', 
            Min: '',

            catgoriesPool: [
                { value: 'Art' },
                { value: 'Book' },
                { value: 'Education' },
                { value: 'Food' },
                { value: 'Game' },
                { value: 'Language' },
                { value: 'Sport' },
                { value: 'Tour' },
            ], 
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
            HourPool: [{value: 1 }, {value: 2}, {value: 3}, {value: 4}, {value: 5}, {value: 6 }, {value: 7}, {value: 8}, {value: 9}, {value: 10},
                {value: 11 }, {value: 12}, {value: 13 }, {value: 14}, {value: 15}, {value: 16}, {value: 17}, {value: 18 }, {value: 19}, {value: 20}, {value: 21}, {value: 22},
                {value: 23 }, {value: 24}], 
            MinPool: [{value: '00'}, {value: '15'}, {value: '30'}, {value: '45'}],
        };
        
        this.checkInputFields = this.checkInputFields.bind(this);
        this.handleInputAlert = this.handleInputAlert.bind(this);
        this.handleGetSchedule = this.handleGetSchedule.bind(this);
    }
    
    checkInputFields() {
        if (this.state.title === '' || this.state.description === '' || this.state.address === '') {
            return false;
        } else {
            return true;
        }
    }
    
    // handleSubmitInfo() {
    //     let { userID, title, address, city, state, zip, description, category, maxAttendees, schedule } = this.state
    //     axios
    //     .post(`${url}/api/makeNewPost`, {title, address, city, state, zip, description, category, maxAttendees, schedule })
        
    // }
    
    handleInputAlert() {
        Alert.alert(
            'You know better!!!',
            'Please fill in all fields', 
            [{text: 'ok', 
            onPress: () => console.log('informed'),
            style: 'cancel'
        }]
        )
    }

    handleGetSchedule() {
        let year = new Date().getFullYear();
        let month = this.state.Month;
        let day = this.state.Day;
        let hour = this.state.Hour;
        let min = this.state.Min;

        return new Date(year, month, day, hour, min);
    }
    
    render() {
        let { userID, title, address, description, catagory, maxAttendees, Month, Day, Hour, Min} = this.state
        return (
        <ScrollView style={styles.container}>
                <View>
                    <TextInput 
                        style={styles.inputField}
                        editable = {true}
                        placeholder = 'Title of your event'
                        onChangeText = {(text) => this.setState({title: text})}
                    />
                </View>
                <View>
                    <TextInput 
                        style={styles.inputField}
                        editable = {true}
                        placeholder = 'Description'
                        onChangeText = {(text) => this.setState({description: text})}
                    />
                </View>
                <View>
                    <TextInput 
                        style={styles.inputField}
                        editable = {true}
                        placeholder = 'Street adress, City, State, Zipcode'
                        onChangeText = {(text) => this.setState({address: text})}
                    />
                </View>
                <View style={styles.pickerSelectStyles}>
                    <Dropdown
                        label='Select a catagory'
                        data={this.state.catgoriesPool}
                        onChangeText = {(target) => this.setState({
                            catagory: target
                        })}
                    />
                </View>
                <View style={styles.pickerSelectStyles}>
                    <Dropdown
                        label='Number of attendees'
                        data={this.state.attendeesPool}
                        onChangeText = {(target) => this.setState({
                            maxAttendees: target
                        })}
                    />
                </View>
                <View style={styles.pickerContainer}>
                    <Dropdown
                            style={styles.schedulePickerContainer}
                            label='Month'
                            data={this.state.MonthPool}
                            onChangeText = {(target) => this.setState({
                                Month: target
                            })}
                    />
                    <Dropdown
                            style={styles.schedulePickerContainer}
                            label='Date'
                            data={this.state.DatePool}
                            onChangeText = {(target) => this.setState({
                                Day: target
                            })}
                    />
                    <Dropdown
                            style={styles.schedulePickerContainer}
                            label='Hour'
                            data={this.state.HourPool}
                            onChangeText = {(target) => this.setState({
                                Hour: target
                            })}
                    />
                    <Dropdown
                            style={styles.schedulePickerContainer}
                            label='Min'
                            data={this.state.MinPool}
                            onChangeText = {(target) => this.setState({
                                Min: target
                            })}
                    />
                </View>
                <Button title='submit'
                        type="outline"
                        accessibilityLabe='submit button'
                        // onPress={() => this.props.navigation.navigate('postConfirm', {title, description, address, catagory})}
                        onPress={this.checkInputFields() ? () => this.setState({isVisible: !this.state.isVisible}) : 
                                () => this.handleInputAlert()}
                />
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
                        <Text>Catagory: {catagory}</Text>
                        <Text>Number of attendees: {maxAttendees}</Text>
                        <Text>Time: {Month}/{Day} @ {Hour}:{Min}</Text>
                        <Button 
                            style={styles.confirmButton}
                            type="solid"
                            title="Confirm"
                            onPress={() => {this.props.navigation.navigate('Home'), this.setState({isVisible: !this.state.isVisible})}}
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

const styles = StyleSheet.create({
    container: {
        fontSize: 16,
        paddingVertical: 40,
        paddingHorizontal: 10,
        flex: 1,
    },
    inputField: {
        borderBottomWidth: 1,
        marginBottom: '20%'
    },
    pickerSelectStyles: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        // borderColor: 'grey',
        borderRadius: 5,
        color: 'black',
        paddingRight: 30,
        fontWeight: 'bold',
    },
    pickerContainer: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'space-around'
    }, 
    schedulePickerContainer: {
        paddingVertical: 40,
        width: 100,
        paddingHorizontal: 2
    }, 
    confirmButton: {
        marginBottom: 30
    }
});
