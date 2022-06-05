import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../Constants/theme';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Image source={require('../assets/logo.png')} style={styles.logo}/>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Category")}>
        <Text style={{color: COLORS.white}}>Start</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
            flex: 1,
            backgroundColor: COLORS.background,
            position: 'relative',
            alignItems: "center",
            justifyContent: "center",
            
    },
    button: {
            backgroundColor: COLORS.accent,
            padding: 15,
            width: "90%",
            alignItems: "center",
            position: 'absolute',
            bottom: 60,
            borderRadius: 40,
            color: COLORS.white
    },
    logo: {
        height: 350,
        width: 350,
    }
});

export default Home;