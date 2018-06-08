import React, {Component} from 'react'
import {View,ScrollView} from 'react-native'
import {ListItem} from 'react-native-elements'

class WidgetList extends Component {
    static navigationOptions = {title: 'Widgets'}

    constructor(props) {
        super(props);
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
            <ScrollView>
                <View style={{padding: 15}}>
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("AssignmentList", {
                                courseId: this.state.courseId,
                                moduleId: this.state.moduleId,
                                lessonId: this.state.lessonId,
                                topicId:this.state.topicId})}
                        key={1}
                        title='Assignments'
                        leftIcon={{name:'assignment' ,color:'black'}}/>
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
                        title='Exams'
                        leftIcon={{name:'assessment' ,color:'black'}}/>
                </View>
            </ScrollView>
        )
    }
}

export default WidgetList