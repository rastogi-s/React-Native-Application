import React from 'react';
import {StyleSheet, Text, View, StatusBar, ScrollView} from 'react-native';
import FixedHeader from './elements/FixedHeader'
import TrueFalseQuestionEditor from './elements/TrueFalseQuestionEditor'
import MultipleChoiceQuestionEditor from './elements/MultipleChoiceQuestionEditor'
import {createStackNavigator} from 'react-navigation'
import {Button} from 'react-native-elements'
import CourseList from './components/CourseList'
import ModuleList from './components/ModuleList'
import LessonList from './components/LessonList'
import WidgetList from './components/WidgetList'
import QuestionList from './components/QuestionList'
import AssignmentList from './components/AssignmentList'
import ExamList from './components/ExamList'
import Assignment from './elements/Assignment'
import Exam from './elements/Exam'
import 'es6-symbol/implement';
import TopicList from "./components/TopicList";
import FillInTheBlanksQuestionEditor from "./elements/FillInTheBlanksQuestionEditor";
import EssayQuestionEditor from "./elements/EssayQuestionEditor";

class Home extends React.Component {
    static navigationOptions = {
        title: 'Home'
    }

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <ScrollView id={View.NO_ID}>
                <StatusBar barStyle="light-content"/>
                <FixedHeader/>

                <Button title="Courses"
                        onPress={() => this.props.navigation
                            .navigate('CourseList')}/>

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
    Exam,
    TrueFalseQuestionEditor,
    MultipleChoiceQuestionEditor,
    FillInTheBlanksQuestionEditor,
    EssayQuestionEditor

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
