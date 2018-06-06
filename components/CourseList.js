import React, {Component} from 'react'
import {View, Alert} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import FetchServiceClient from "../services/FetchServiceClient";

class CourseList extends Component {
  static navigationOptions = {title: 'Courses'}
  constructor(props) {
    super(props)
    this.fetchServiceClient= FetchServiceClient.instance;

    this.fetchServiceClient.findAllCourses().then(courses => {
        this.setState({courses: courses})
    })
    this.state = {
      courses: []
    }
  }
  render() {
    return(
      <View style={{padding: 15}}>
        {this.state.courses.map((course, index) => (
          <ListItem
            onPress={() => this.props.
              navigation.navigate("ModuleList",
              {courseId: course.id})}
            title={course.title}
            key={index}/>
        ))}
      </View>
    )
  }
}
export default CourseList