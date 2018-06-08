import React from 'react'
import {Text, View, StyleSheet} from 'react-native';
import {
    Container,
    Header,
    Content,
    Form,
    Item,
    Input,
    Label,
    Textarea,
    Button,

} from 'native-base';

import ExamServiceClient from "../services/ExamServiceClient";

class ExamWidget extends React.Component {
    static navigationOptions = {title: "Exam"}

    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            points: '',
            id: ''
        }

        this.addExam = this.addExam.bind(this);
        this.examServiceClient = ExamServiceClient.instance

    }


    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        const topicId = navigation.getParam("topicId")
        const unMount = navigation.getParam("unMount")
        this.setState({
            courseId: courseId,
            moduleId: moduleId,
            lessonId: lessonId,
            topicId: topicId,
            unMount:unMount
        })
    }

    componentWillUnmount(){
        console.log(this.state.unMount);
        this.state.unMount();
    }



    addExam() {

        this.examServiceClient.createExam(this.state.topicId, {
            title: this.state.title,
            description: this.state.description, points: this.state.points
        }).then((exam) =>
            this.props.navigation
                .navigate("QuestionList", {
                        examId: exam.id,
                        courseId: this.state.courseId,
                        moduleId: this.state.moduleId,
                        lessonId: this.state.lessonId,
                        topicId: this.state.topicId
                })
        )

    }

    render() {
        let title;
        let description;
        let points;

        const {goBack} = this.props.navigation;
        return (
            <Container>
                <Content>
                   <Form style={{marginTop: 5}}>
                        <Item floatingLabel>
                            <Label>Exam Title</Label>
                            <Input ref={(el) => {
                                title = el;
                            }}
                                   onChangeText={(title) => this.setState({title})}
                                   value={this.state.title}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Points</Label>
                            <Input ref={(el) => {
                                points = el;
                            }}
                                   onChangeText={(points) => this.setState({points})}
                                   value={this.state.points.toString()}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Description</Label>
                            <Input rowSpan={5} ref={(el) => {
                                description = el;
                            }}
                                   onChangeText={(description) => this.setState({description})}
                                   value={this.state.description}/>
                        </Item>
                    </Form>
                    <Button full style={{margin: 10, borderRadius: 5}} success onPress={this.addExam}>
                        <Text>Submit</Text>
                    </Button>
                    <Button full style={{margin: 10, borderRadius: 5}} danger onPress={() => goBack()}>
                        <Text>Cancel</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}


// const styles = StyleSheet.create({
//     container: {
//         borderRadius: 4,
//         borderWidth: 1,
//         borderColor: 'grey',
//         backgroundColor: 'white',
//         margin: 6,
//         padding: 5
//     },
//     headingText: {
//         fontSize: 30,
//         marginLeft: 18
//     },
//     headingTextForPoints: {
//         fontSize: 30,
//         marginRight: 1
//     }
//
// });

export default ExamWidget
