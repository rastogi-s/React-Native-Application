import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {ListItem} from 'react-native-elements'
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
      <ScrollView style={{padding: 15}}>
        {this.state.courses.map((course, index) => (
          <ListItem
            onPress={() => this.props.
              navigation.navigate("ModuleList",
              {courseId: course.id})}
            title={course.title}
            key={index}
            leftIcon={{name:'subtitles' ,color:'black'}}
          />

        ))}
      </ScrollView>
    )
  }
}
export default CourseList