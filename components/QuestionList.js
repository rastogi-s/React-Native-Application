import React, {Component} from 'react'
import {View, Alert, StyleSheet} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import ExamServiceClient from "../services/ExamServiceClient";
import {
    List,
    //ListItem,
    Button,
    Left,
    Right,

} from 'native-base';

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}

    constructor(props) {
        super(props);
        this.examServiceClient = ExamServiceClient.instance;
        this.state = {
            questions: [],
            examId: 1
        }
        //this.renderListItems=this.renderListItems.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        this.setState({
            examId: examId
        })
        this.examServiceClient.findAllQuestionsForExam(examId)
            .then(questions => this.setState({questions: questions}))
    }

    componentWillReceiveProps(props) {
        const {navigation} = props;
        const examId = navigation.getParam("examId");
        this.setState({
            examId: examId
        })
        this.examServiceClient.findAllQuestionsForExam(examId)
            .then(questions => this.setState({questions: questions}))
    }


    render() {

        var icons = {TrueFalse:'check',Essay:'format-align-left',MultipleChoice:'list',FillInTheBlanks:'code'}
        var subtitle = {TrueFalse:'True or False',Essay:'Essay',MultipleChoice:'Multiple choice',
            FillInTheBlanks:'Fill-in the blanks'}
        var navigation = {TrueFalse:'TrueFalseQuestionEditor',Essay:'EssayQuestionEditor',
            MultipleChoice:'MultipleChoiceQuestionEditor',FillInTheBlanks:'FillInTheBlanksQuestionEditor'}


        return (
            <View style={{padding: 15}}>
                {this.state.questions.map((question,index) => (

                    <ListItem
                        onPress={() =>
                            this.props.navigation.navigate(navigation[question.type],
                                    {examId:this.state.examId,
                                        question:question})}
                        key={index}
                        leftIcon={{ name: icons[question.type] }}
                        subtitle={subtitle[question.type]}
                        title={question.title}/>

                ))}
                <Button full style={styles.button} onPress={() => this.props.
                navigation.navigate("MultipleChoiceQuestionEditor",{
                    examId:this.state.examId,
                    question:{}})} success><Text>Add Questions</Text></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop:10,
        borderRadius:5

    }

});

export default QuestionList