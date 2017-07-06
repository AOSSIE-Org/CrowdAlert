import React from 'react';

import { StyleSheet, Text, View, Platform, Image, TouchableHighlight } from 'react-native';

export default class AddIncident extends React.Component{
    state = {
        type : this.props.type
    }

    render(){
        return (
            <View style={styles.container}>
                <Text> Add AddIncident {this.state.type}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});