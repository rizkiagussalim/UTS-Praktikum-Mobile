import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native'; import { StackActions } from '@react-navigation/routers';

export default class Main extends Component {
    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.dispatch(StackActions.replace('HomeScreen'))
        }, 3000);
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 7, justifyContent: 'center' }}>
                    <Text style={styles.title}>Data Kepegawaian</Text>
                    <Image source={require('../../images/logo-kemenkes.png')} style={{
                        width: 180,
                        height: 80,
                    }}>
                    </Image>
                </View>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={styles.desc}>Bekerja sama
                        dengan</Text>
                    <Image source={require('../../images/LogoSVIPB.png')} style={{
                        width: 140,
                        height: 24,
                    }}>
                    </Image>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff', alignItems: 'center', flexDirection: 'column'
    },
    title: {
        fontWeight: 'bold', fontSize: 25,
        color: '#121212', flexDirection: 'column', alignSelf: 'center', marginBottom: 20,
    },
    desc: {
        fontWeight: 'bold', fontSize: 17,
        color: '#121212', flexDirection: 'column', alignSelf: 'center', marginBottom: 20,
    },
});
