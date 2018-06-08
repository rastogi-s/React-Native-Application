import React from 'react'
import {Picker, StyleSheet, Text, View} from 'react-native'
import {Button} from 'native-base';

class QuestionTypePicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            questionType: ""
        }
    }

    componentDidMount() {
        const examId = this.props.examId;
        var unMount = this.props.unMount;
        console.log(unMount);
        this.setState({
            examId: examId,
            unMount:unMount

        })
    }

    componentWillReceiveProps(props) {

        const examId = props.examId;
        var unMount = props.unMount;
        console.log(unMount);
        this.setState({
            examId: examId,
            unMount:unMount
        })
    }

    render() {
        return (
            <View>
                <Picker
                    onValueChange={(itemValue) => this.setState({questionType: itemValue})}
                    selectedValue={this.state.questionType}>
                    <Picker.Item value="" label="Select a Question type"/>
                    <Picker.Item value="MultipleChoiceQuestionWidget" label="Multiple choice"/>
                    <Picker.Item value="EssayQuestionWidget" label="Essay"/>
                    <Picker.Item value="TrueOrFalseQuestionWidget" label="True or false"/>
                    <Picker.Item value="FillInTheBlanksQuestionWidget" label="Fill in the blanks"/>
                </Picker>
                <Button full style={styles.button} disabled={this.state.questionType==''}
                        onPress={() => this.props.navigation.navigate(this.state.questionType, {
                            examId: this.state.examId,
                            question: {},
                            unMount:this.state.unMount
                        })} success><Text>Add Questions</Text></Button>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: 10,
        borderRadius: 5

    }

});

export default QuestionTypePicker