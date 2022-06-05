import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet,Text,TouchableOpacity} from 'react-native';
import { COLORS } from '../Constants/theme';

const Difficulty = ({navigation, route}) => {
    const { itemId } = route.params;
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.header}>Choose Difficulty</Text>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Question",{itemId : itemId,otherParam : "easy"})}>
                <Text style={{color: COLORS.white}}>Easy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Question",{itemId : itemId,otherParam : "medium"})}>
                <Text style={{color: COLORS.white}}>Medium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Question",{itemId : itemId,otherParam : "hard"})}>
                <Text style={{color: COLORS.white}}>Hard</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: "center",
        justifyContent: "center",
        marginTop: StatusBar.currentHeight, 
        backgroundColor: COLORS.background,
   
    },
    header: {
        fontSize: 24,
        marginBottom: 15,
        color: COLORS.white
    },   
    button: {
            backgroundColor: COLORS.accent,
            padding: 15,
            width: "90%",
            margin: 15,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
    },
})

export default Difficulty;
