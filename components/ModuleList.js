import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {Text, ListItem} from 'react-native-elements'
import FetchServiceClient from "../services/FetchServiceClient";

class ModuleList extends Component {
    static navigationOptions = {title: 'Modules'}

    constructor(props) {
        super(props);
        this.fetchServiceClient = FetchServiceClient.instance;
        this.state = {
            modules: [],
            courseId: ''
        }
    }

    componentDidMount() {
        const courseId = this.props.navigation.getParam("courseId");
        this.setState({
            courseId: courseId
        })
        this.fetchServiceClient.findAllModulesForCourse(courseId).
        then(modules => this.setState({modules: modules}))
    }

    render() {
        return (
            <ScrollView style={{padding: 15}}>
                {this.state.modules.map((module, index) => (
                    <ListItem
                        onPress={() => this.props.navigation
                            .navigate("LessonList", {
                                courseId:
                                this.state.courseId, moduleId: module.id
                            })}
                        key={index}
                        title={module.title}
                        leftIcon={{name:'folder' ,color:'black'}}/>
                ))}
            </ScrollView>
        )
    }
}

export default ModuleList