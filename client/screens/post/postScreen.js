import React from 'react';
import { ScrollView, StyleSheet, Button, View, TextInput, Picker} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Dropdown } from 'react-native-material-dropdown';




export default class PostScreen extends React.Component {
    constructor() {
        super();
        this.state={
            post: '!!!',
            description: '',
            address: '', 
            catagory: '', 
            catgoriesPool: [
                {
                    value: 'Art'
                },
                {
                    value: 'Book',
                },
                {
                    value: 'Education',
                },
                {
                    value: 'Food',
                },
                {
                    value: 'Game',
                },
                {
                    value: 'Language',
                },
                {
                    value: 'Sport',
                },
                {
                    value: 'Tour',
                },
                {
                    value: 'Workout',
                }
            ]
        };
    }
    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <TextInput 
                        style={styles.inputField}
                        editable = {true}
                        placeholder = 'Write Title'
                        onChangeText = {(text) => this.setState({post: text})}
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
                    }, () => {
                        console.log(this.state.catagory)
                    })}
                />
                </View>
                <Button title='submit'
                        accessibilityLabe='submit button'
                        onPress={() => this.props.navigation.navigate('Home')}
                />
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
    },
    test: {
        color: 'black'
    }
});
