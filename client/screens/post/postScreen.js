import React from 'react';
import { ScrollView, StyleSheet, View, TextInput, Text, Modal, TouchableHighlight, Alert} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import { Button, Overlay} from 'react-native-elements';




export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            title: '',
            description: '',
            address: '', 
            catagory: '', 
            attendees: 0,
            isVisible: false,
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
            attendeesPool: [{value: 1}, {value: 2}, 
                {value: 3}, {value: 4}, {value: 5}, 
                {value: 6}, {value: 7}, {value: 8}, 
                {value: 9}, {value: 10}, {value: 11}, 
                {value: 12}, {value: 13}, {value: 14}, 
                {value: 15}, {value: 16}, {value: 17}, 
                {value: 18}, {value: 19}, {value: 20}]
        };
        
        this.checkInputFields = this.checkInputFields.bind(this);
        this.handleInputAlert = this.handleInputAlert.bind(this);
    }

    checkInputFields() {
        if (this.state.title === '' || this.state.description === '' || this.state.address === '') {
            return false;
        } else {
            return true;
        }
    }

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

    render() {
        let {title, description, address, catagory, attendees} = this.state;
        return (
            <ScrollView style={styles.container}>
                <View>
                    <TextInput 
                        style={styles.inputField}
                        editable = {true}
                        placeholder = 'Write Title'
                        onChangeText = {(text) => this.setState({title: text})}
                    />
                </View>
                <View>
                    <TextInput 
                        style={styles.inputField}
                        editable = {true}
                        placeholder = 'Write description'
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
                            attendees: target
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
                    windowBackgroundColor="rgba(228, 233, 237, 0.2)"
                    overlayBackgroundColor="white"
                    containerStyle={{borderColor: 'grey'}}
                    width="50%"
                    height="30%"
                    >
                    <View style={{fontSize: 25,
                                paddingVertical: 40,
                                paddingHorizontal: 10,
                                flex: 1,}}>
                        <Text>Title: {title}</Text>
                        <Text>Description: {description}</Text>
                        <Text>Address: {address}</Text>
                        <Text>Catagory: {catagory}</Text>
                        <Text>Number of attendees: {attendees}</Text>
                        <Button 
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
        fontWeight: 'bold'
    }
});
