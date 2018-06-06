import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem, Button} from 'react-native-elements'
//import FetchServiceClient from "../services/FetchServiceClient";
//import Assignment from "../elements/Assignment";

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props);
        //this.fetchServiceClient = FetchServiceClient.instance;
        this.state = {
            widgets: [],
            courseId: '',
            moduleId: '',
            lessonId: '',
            topicId: ''

        }
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

    }

    render() {
        return (
            <View>
                <View style={{padding: 15}}>
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("AssignmentList", {
                                courseId: this.state.courseId,
                                moduleId: this.state.moduleId,
                                lessonId: this.state.lessonId,
                                topicId:this.state.topicId})}
                        key={1}
                        title='Assignments'/>
                </View>
                <View style={{padding: 15}}>
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("ExamList", {
                                courseId: this.state.courseId,
                                moduleId: this.state.moduleId,
                                lessonId: this.state.lessonId,
                                topicId:this.state.topicId
                            })}
                        key={2}
                        title='Exams'/>
                </View>
            </View>
        )
    }
}

export default WidgetList