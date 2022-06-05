import React, { useState , useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, Animated, ActivityIndicator, StyleSheet } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS} from '../Constants/theme';

const Question = ({navigation, route}) => {
    const [allQuestions, setallQuestions] = useState([])
    const [loading, setloading] = useState(true)

    function shuffleArr (array){
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            [array[i], array[rand]] = [array[rand], array[i]]
        }
        return array;
    }

    const arrayMaker = (json) => {
        const array = [];
        json.forEach(item => {
            const option=[...item.incorrect_answers];
            option.push(item.correct_answer)
            array.push({
            question: item.question,
            options: shuffleArr(option), 
            correct_option: item.correct_answer,
        });
        })  
        return array;
    }

    const fetchData = async () =>{
        const { itemId, otherParam } = route.params;
        let response = await fetch(`https://opentdb.com/api.php?amount=10&encode=url3986&category=`+itemId+`&difficulty=`+otherParam);
        var json = await response.json();
        setallQuestions(arrayMaker(json.results));
        setloading(false);
    }
    
    useEffect(() => {
        fetchData();
    },[])
    
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [score, setScore] = useState(0)
    const [showNextButton, setShowNextButton] = useState(false)
    const [showScoreModal, setShowScoreModal] = useState(false)
    const [progress, setProgress] = useState(new Animated.Value(0));

    const validateAnswer = (selectedOption) => {
        let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
        setCurrentOptionSelected(selectedOption);
        setCorrectOption(correct_option);
        setIsOptionsDisabled(true);
        if(selectedOption==correct_option){
            setScore(score+1)
        } 
        setShowNextButton(true)
    }

    const handleNext = () => {
        if(currentQuestionIndex== allQuestions.length-1){
            setShowScoreModal(true)
        }else{
            setCurrentQuestionIndex(currentQuestionIndex+1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
            setShowNextButton(false);
        }
        Animated.timing(progress, {
            toValue: currentQuestionIndex+1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const restartQuiz = () => {
        setShowScoreModal(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
        setShowNextButton(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const renderQuestion = () => {
        return (
            <View style={{
                marginVertical: 40
            }}>
                {/* Question Counter */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end'
                }}>
                    <Text style={{color: COLORS.white, fontSize: 20, opacity: 0.6, marginRight: 2}}>{currentQuestionIndex+1}</Text>
                    <Text style={{color: COLORS.white, fontSize: 18, opacity: 0.6}}>/ {allQuestions.length}</Text>
                </View>

                {/* Question */}
                <Text style={{
                    color: COLORS.white,
                    fontSize: 30
                }}>{decodeURIComponent(allQuestions[currentQuestionIndex]?.question)}</Text>
            </View>
        )
    }

    const renderOptions = () => {
        return (
            <View>
                <StatusBar style="auto" />
                {   
                    allQuestions[currentQuestionIndex]?.options.map(option => (
                        <TouchableOpacity onPress={()=> validateAnswer(option)} disabled={isOptionsDisabled} key={option}
                        style={{
                            borderWidth: 3, 
                            borderColor: option==correctOption ? COLORS.success: option==currentOptionSelected ? COLORS.error : COLORS.secondary+'40',
                            backgroundColor: option==correctOption ? COLORS.success +'20': option==currentOptionSelected ? COLORS.error +'20': COLORS.secondary+'20',
                            height: 60, borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 20,
                            marginVertical: 10
                        }}
                        >
                            <Text style={{fontSize: 20, color: COLORS.white}}>{decodeURIComponent(option)}</Text>
                            {
                                option==correctOption ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.success,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="check" style={{
                                            color: COLORS.white,
                                            fontSize: 20
                                        }} />
                                    </View>
                                ): option == currentOptionSelected ? (
                                    <View style={{
                                        width: 30, height: 30, borderRadius: 30/2,
                                        backgroundColor: COLORS.error,
                                        justifyContent: 'center', alignItems: 'center'
                                    }}>
                                        <MaterialCommunityIcons name="close" style={{ color: COLORS.white, fontSize: 20}} />
                                    </View>
                                ) : null
                            }
                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }

    const renderNextButton = () => {
        if(showNextButton){
            return (
                <TouchableOpacity onPress={handleNext} style={{ marginTop: 20, width: '100%', backgroundColor: COLORS.accent, padding: 20, borderRadius: 5}}>
                    <Text style={{fontSize: 20, color: COLORS.white, textAlign: 'center'}}>Next</Text>
                </TouchableOpacity>
            )
        }else{
            return null
        }
    }

    const progressAnim = progress.interpolate({
        inputRange: [ 0 , 10],
        outputRange: ['0%','100%']
    })

    const renderProgressBar = () => {
        return (
            <View style={{ width: '100%', height: 20, marginTop: 20, borderRadius: 20, backgroundColor: '#00000020',}}>
                <Animated.View style={[{ height: 20, borderRadius: 20, backgroundColor: COLORS.accent},{width: progressAnim}]}/>
            </View>
        )
    }

    return (
       <SafeAreaView style={{ flex: 1 }}>
           {loading &&  <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" color="#ef476f" />
                        </View>}
           {!loading && <View style={{flex: 1, paddingVertical: 40, paddingHorizontal: 16, backgroundColor: COLORS.background, position:'relative'}}>
               {renderProgressBar()}
               {renderQuestion()}
               {renderOptions()}
               {renderNextButton()}
               <Modal animationType="slide" transparent={false} visible={showScoreModal}>
                   <View style={{flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center'}}>
                       <View style={{ backgroundColor: "#dfe7fd", width: '90%', borderRadius: 20, padding: 20, alignItems: 'center' }}>
                           <Text style={{fontSize: 30, fontWeight: 'bold'}}>{ score> (allQuestions.length/2) ? 'Congratulations!' : 'Better luck next time!' }</Text>
                           <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 20}}>
                               <Text style={{ fontSize: 30, color: score> (allQuestions.length/2) ? COLORS.success : COLORS.error}}>{score}</Text>
                                <Text style={{ fontSize: 20, color: COLORS.black }}>/ { allQuestions.length }</Text>
                           </View>

                           <TouchableOpacity onPress={restartQuiz}style={{ backgroundColor: COLORS.accent, padding: 20, width: '100%', borderRadius: 20}}>
                               <Text style={styles.modalButton}>Retry Quiz</Text>
                           </TouchableOpacity>
                           
                           <TouchableOpacity onPress={()=>navigation.navigate("Category")} style={{backgroundColor: COLORS.accent, padding: 20, width: '100%', borderRadius: 20, marginTop: 10,}}>
                               <Text style={styles.modalButton}>Back to Category</Text>
                           </TouchableOpacity>
                       </View>
                   </View>
               </Modal>
           </View>}
       </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", 
    backgroundColor: COLORS.background, 
    position:'relative'

  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  modalButton: {
    textAlign: 'center', 
    color: COLORS.white, 
    fontSize: 20
  },
});

export default Question;