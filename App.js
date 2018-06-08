import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueOrFalseQuestionWidget from './elements/TrueOrFalseQuestionWidget'
import MultipleChoiceQuestionWidget from './elements/MultipleChoiceQuestionWidget'
import {createStackNavigator} from 'react-navigation'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentList from './components/AssignmentList'
import ExamList from './components/ExamList'
import Assignment from './elements/Assignment'
import ExamWidget from './elements/ExamWidget'
import 'es6-symbol/implement';
import TopicList from "./components/TopicList";
import FillInTheBlanksQuestionWidget from "./elements/FillInTheBlanksQuestionWidget";
import EssayQuestionWidget from "./elements/EssayQuestionWidget";
import {Button} from 'native-base';

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView>
                <StatusBar barStyle="light-content"/>
                <FixedHeader navigation={this.props.navigation}/>

                <Button full style={{margin: 10, borderRadius: 5}} success
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}>
                    <Text>Courses</Text>
                </Button>

            </ScrollView>
        )
    }
}


const App = createStackNavigator({
    Home,
    CourseList,
    ModuleList,
    LessonList,
    TopicList,
    WidgetList,
    AssignmentList,
    QuestionList,
    Assignment,
    ExamList,
    ExamWidget,
    TrueOrFalseQuestionWidget,
    MultipleChoiceQuestionWidget,
    FillInTheBlanksQuestionWidget,
    EssayQuestionWidget

});

export default App;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
