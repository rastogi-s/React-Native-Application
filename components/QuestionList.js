import React, {Component} from 'react'
import {ScrollView, StyleSheet} from 'react-native'
import { ListItem} from 'react-native-elements'
import ExamServiceClient from "../services/ExamServiceClient";
import {Icon} from 'native-base';
import QuestionTypePicker from "../elements/QuestionTypePicker";

class QuestionList extends Component {
    static navigationOptions = {title: 'Questions'}

    constructor(props) {
        super(props);
        this.examServiceClient = ExamServiceClient.instance;
        this.state = {
            questions: [],
            examId: 1
        }
        this.delete = this.delete.bind(this);
        this.updateList = this.updateList.bind(this);
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

    updateList() {

        this.examServiceClient.findAllQuestionsForExam(this.state.examId)
            .then(questions => this.setState({questions: questions}))
    }


    delete(id) {

        let question = this.state.questions.filter((question) => {
            if (id === question.id)
                return true
            else
                return false
        })

        var quest = question[0];

        var qType = 'hhhhh';
        if (quest.type === 'MultipleChoice')
            qType = 'multi'
        else if (quest.type === 'FillInTheBlanks')
            qType = 'blanks'
        else if (quest.type === 'TrueFalse')
            qType = 'truefalse'
        else if (quest.type === 'Essay')
            qType = 'essay'

        this.examServiceClient.deleteQuestion(id, qType, this.updateList);

    }

    render() {

        var icons = {TrueFalse: 'check', Essay: 'format-align-left', MultipleChoice: 'list', FillInTheBlanks: 'code'}
        var subtitle = {
            TrueFalse: 'True or False', Essay: 'Essay', MultipleChoice: 'Multiple choice',
            FillInTheBlanks: 'Fill-in the blanks'
        }
        var navigation = {
            TrueFalse: 'TrueOrFalseQuestionWidget', Essay: 'EssayQuestionWidget',
            MultipleChoice: 'MultipleChoiceQuestionWidget', FillInTheBlanks: 'FillInTheBlanksQuestionWidget'
        }


        return (

            <ScrollView style={{padding: 15}}>
                {this.state.questions.map((question, index) => (
                    <ListItem
                        onPress={() =>
                            this.props.navigation.navigate(navigation[question.type],
                                {
                                    examId: this.state.examId,
                                    question: question,

                                })}
                        key={index}
                        leftIcon={{name: icons[question.type], color: 'black'}}
                        //rightIcon={{name:'delete',color:'black',onPress:{()=> this.delete(question.id)}}}
                        rightIcon={<Icon name={'trash'} size={20} onPress={() => this.delete(question.id)}/>}
                        subtitle={subtitle[question.type]}
                        title={question.title}/>

                ))}

                <QuestionTypePicker examId={this.state.examId} navigation={this.props.navigation} unMount={this.updateList}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        borderRadius: 5

    }

});

export default QuestionList