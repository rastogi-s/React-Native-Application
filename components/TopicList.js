import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import FetchServiceClient from "../services/FetchServiceClient";

class TopicList extends Component {
    static navigationOptions = {title: 'Topics'}

    constructor(props) {
        super(props);
        this.fetchServiceClient = FetchServiceClient.instance;
        this.state = {
            topics: [],
            courseId: '',
            moduleId: '',
            lessonId: '',
        }
    }

    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        this.setState({
            courseId: courseId,
            moduleId: moduleId,
            lessonId: lessonId
        })
        this.fetchServiceClient.findAllTopicsForLesson(courseId, moduleId, lessonId).then(topics => this.setState({topics: topics}));
    }

    render() {
        return (
            <View style={{padding: 15}}>
                {this.state.topics.map(
                    (topic, index) => (
                        <ListItem
                            onPress={() => this.props.navigation
                                .navigate("WidgetList", {
                                    courseId: this.state.courseId,
                                    moduleId: this.state.moduleId,
                                    lessonId: this.state.lessonId,
                                    topicId: topic.id})}
                            key={index}
                            title={topic.title}/>))}
            </View>
        )
    }
}

export default TopicList