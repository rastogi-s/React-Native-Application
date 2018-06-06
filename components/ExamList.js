import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {Text,Icon} from 'react-native-elements'
import FetchServiceClient from "../services/FetchServiceClient";
import {
    List,
    ListItem,
    Button,
    Left,
    Right,

} from 'native-base';
import ExamServiceClient from "../services/ExamServiceClient";

class ExamList extends Component {
    static navigationOptions = {title: 'Exams'}

    constructor(props) {
        super(props);
        this.fetchServiceClient = FetchServiceClient.instance;
        this.examServiceClient = ExamServiceClient.instance;
        this.state = {
            topicId: '',
            courseId: '',
            moduleId: '',
            lessonId: '',
            topicId: ''
        }
        this.delete=this.delete.bind(this);
        this.updateList=this.updateList.bind(this);
    }

    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        const topicId = navigation.getParam("topicId")
        this.setState({
            courseId: courseId,
            moduleId: moduleId,
            lessonId: lessonId,
            topicId: topicId
        })
        this.fetchServiceClient.findAllWidgetsForTopic(courseId, moduleId, lessonId, topicId).then(widgets => this.setState({widgets}))
    }

    updateList(){

        this.fetchServiceClient.findAllWidgetsForTopic(this.state.courseId, this.state.moduleId,
            this.state.lessonId, this.state.topicId).then(widgets => this.setState({widgets}))
    }

    delete(id){

        this.examServiceClient.deleteExam(id,this.updateList);

    }


    render() {
        var examWidgets = [];
        var widgets = this.state.widgets;
        for (var w in  widgets) {
            if (widgets[w].widgetType === 'Exam')
                examWidgets.push(widgets[w]);
        }
        return (
            <View style={{padding: 15}}>
                <List>
                    {examWidgets.map((widget, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("QuestionList", {
                                    examId: widget.id,
                                    courseId: this.state.courseId,
                                    moduleId: this.state.moduleId,
                                    lessonId: this.state.lessonId,
                                    topicId: this.state.topicId
                                })}
                            key={index}>
                            <Left>
                                <Text>{widget.title}</Text>
                            </Left>
                            <Right>
                                <Icon name="trash" type="font-awesome" onPress={() => this.delete(widget.id)}/>
                            </Right>
                        </ListItem>
                    ))}
                </List>
                <Button full style={styles.button} onPress={() => this.props.
                navigation.navigate("Exam",{
                    courseId: this.state.courseId,
                    moduleId: this.state.moduleId,
                    lessonId: this.state.lessonId,
                    topicId:this.state.topicId,
                    exam:{points:0}})} success><Text>Add Exam</Text></Button>
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

export default ExamList