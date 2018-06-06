import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import FetchServiceClient from "../services/FetchServiceClient";

class LessonList extends Component {
  static navigationOptions = {title: 'Lessons'}
  constructor(props) {
    super(props);
    this.fetchServiceClient = FetchServiceClient.instance;
    this.state = {
      lessons: [],
      courseId: '',
      moduleId: ''
    }
  }
  componentDidMount() {
    const {navigation} = this.props;
    const courseId = navigation.getParam("courseId");
    const moduleId = navigation.getParam("moduleId");
      this.setState({
          courseId: courseId,
          moduleId: moduleId
      })

      this.fetchServiceClient.findAllLessonsForModule(courseId,moduleId).
      then(lessons => this.setState({lessons:lessons}));
  }
  render() {
    return(
      <View style={{padding: 15}}>
      {this.state.lessons.map(
        (lesson, index) => (
          <ListItem
            onPress={() => this.props.navigation
              .navigate("TopicList", {courseId:this.state.courseId,moduleId:this.state.moduleId,lessonId: lesson.id})}
            key={index}
            title={lesson.title}/>))}
      </View>
    )
  }
}
export default LessonList