import React from 'react';
import { ScrollView, StyleSheet, Button, View, TextInput, Picker} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import RNPickerSelect from 'react-native-picker-select'; 


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
                    label: 'Art',
                    value: 'Art',
                },
                {
                    label: 'Book',
                    value: 'Book',
                },
                {
                    label: 'Education',
                    value: 'Education',
                },
                {
                    label: 'Food',
                    value: 'Food',
                },
                {
                    label: 'Game',
                    value: 'Game',
                },
                {
                    label: 'Language',
                    value: 'Language',
                },
                {
                    label: 'Sport',
                    value: 'Sport',
                },
                {
                    label: 'Tour',
                    value: 'Tour',
                },
                {
                    label: 'Workout',
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
                <View>
                    <RNPickerSelect
                        placeholder={{
                            label: 'Catagory',
                            value: null,
                        }}
                        items={this.state.catgoriesPool}
                        onValueChange={(value) => {
                            this.setState({
                                catagory: value,
                            });
                        }}
                        value={this.state.catagory}
                    />
                </View>
                <Button>Submit</Button>
            </ScrollView>
        )
    }
};


PostScreen.navigationOptions = {
    title: 'Post',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    inputField: {
        borderBottomWidth: 1,
        marginBottom: '10%'
    }
});
