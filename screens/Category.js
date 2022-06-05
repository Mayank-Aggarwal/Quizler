import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Categories} from '../Constants/Categories.js'
import { COLORS } from '../Constants/theme.js';

const Category = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <Text style={styles.header}>Choose Category</Text>
            <ScrollView style={styles.scrollView}>
            {Categories.map((data) => { 
                return (<TouchableOpacity style={styles.button} key={data.id} onPress={()=>navigation.navigate("Difficulty",{itemId : data.id})}>
                          <Text style={{color: COLORS.white}}>{data.name}</Text>
                          </TouchableOpacity>
                        );})}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        alignItems: "center",
        backgroundColor: COLORS.background,
    },
    header: {
        fontSize: 24,
        marginTop: 50,
        color: COLORS.white
    },
    scrollView: {
        marginBottom: 10,
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

export default Category;
