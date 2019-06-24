import React from 'react';
import { ScrollView, StyleSheet, Button, View, TextInput, Picker} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";


export default class PostScreen extends React.Component {
    constructor() {
        super();
        this.state={
            post: '!!!',
            description: '',
            address: '', 
            catagory: ''
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
                    <Button 
                        title='Catagory'
                        onPress={() => this.props.navigation.navigate('Catagory')}
                    />
                </View>
                <View>
                    <Picker
                        // selectedValue={this.state.language}
                        style={{height: 50, width: 100}}
                        // onValueChange={(itemValue, itemIndex) =>
                        //     this.setState({language: itemValue})}
                            >
                        <Picker.Item label="Art" value="Art" />
                        <Picker.Item label="Book" value="Book" />
                        <Picker.Item label="Education" value="Education" />
                        <Picker.Item label="Food" value="Food" />
                        <Picker.Item label="Games" value="Games" />
                        <Picker.Item label="Language" value="Language" />
                        <Picker.Item label="Sport" value="Sport" />
                        <Picker.Item label="Tours" value="Tours" />
                        <Picker.Item label="Workout" value="Workout" />
                    </Picker>
                </View>
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
