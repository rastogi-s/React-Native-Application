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
    Left,
    Right,
} from 'native-base';

import {Icon} from 'react-native-elements'
import AssignmentServiceClient from "../services/AssignmentServiceClient";

class Assignment extends React.Component {
    static navigationOptions = {title: "Assignment"}

    constructor(props) {
        super(props)
        this.state = {
            preview: false,
            title: '',
            description: '',
            points: '',
            id:'',
            assignment:{}
        }

        this.togglePreview = this.togglePreview.bind(this);
        this.addAssignment = this.addAssignment.bind(this);
        this.assignmentServiceClient=AssignmentServiceClient.instance

    }

    componentDidMount() {
        const {navigation} = this.props;
        const courseId = navigation.getParam("courseId")
        const moduleId = navigation.getParam("moduleId")
        const lessonId = navigation.getParam("lessonId")
        const topicId = navigation.getParam("topicId")
        const assignment = navigation.getParam("assignment")

        this.setState({
            courseId: courseId,
            moduleId: moduleId,
            lessonId: lessonId,
            topicId: topicId,
            title:assignment.title,
            description:assignment.description,
            id:assignment.id,
            points:assignment.points
        })
    }



    addAssignment() {
        console.log('add assignment')
        if(this.state.id==undefined || this.state.id==='') {
            this.assignmentServiceClient.createAssignment(this.state.topicId, {
                title: this.state.title,
                description: this.state.description, points: this.state.points
            }).then(
                this.props.navigation
                    .navigate("AssignmentList", {
                        courseId: this.state.courseId,
                        moduleId: this.state.moduleId,
                        lessonId: this.state.lessonId,
                        topicId: this.state.topicId
                    })
            )
        }
        else{
            this.assignmentServiceClient.updateAssignment(this.state.id,{
                title: this.state.title,
                description: this.state.description, points: this.state.points
            }).then(
                this.props.navigation
                    .navigate("AssignmentList", {
                        courseId: this.state.courseId,
                        moduleId: this.state.moduleId,
                        lessonId: this.state.lessonId,
                        topicId: this.state.topicId
                    })
            )

        }


    }


    togglePreview() {
        console.log('toggle preview');
        this.setState({preview: !this.state.preview})
    }

    render() {
        //console.log(this.state);
        let title;
        let description;
        let points;
        return (
            <Container>
                <View style={{padding: 10}}>
                    {!this.state.preview &&
                    <Icon name="eye-slash" type="font-awesome" style={{marginTop: 20, justifyContent: 'flex-start'}}
                          raised
                          onPress={this.togglePreview}/>}
                    {this.state.preview &&
                    <Icon name="eye" type="font-awesome" style={{marginTop: 20, justifyContent: 'flex-start'}} raised
                          onPress={this.togglePreview}/>}
                </View>
                <Content>
                    {!this.state.preview && <Form style={{margin: 5}}>
                        <Item floatingLabel>
                            <Label>Assignment Title</Label>
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
                                   value={this.state.points.toString()} />
                        </Item>
                        <Item floatingLabel>
                            <Label>Description</Label>
                            <Input rowSpan={5} ref={(el) => {
                                description = el;
                            }}
                                   onChangeText={(description) => this.setState({description})}
                                   value={this.state.description}/>
                        </Item>
                        <Button full style={{marginTop: 20,borderRadius:5}} danger onPress={this.addAssignment}>
                            <Text>Save</Text>
                        </Button>
                    </Form>}
                    {this.state.preview &&
                    <View style={{margin: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '70%'}}>
                                <Text style={styles.headingText}>{this.state.title}</Text>
                            </View>
                            <View style={{width: '30%'}}>
                                <Text style={styles.headingTextForPoints}> {this.state.points}pts</Text>
                            </View>
                        </View>
                        <Text style={{fontSize: 20,marginTop:5}} >
                            {this.state.description}
                        </Text>
                        <Label style={{marginTop: 10}}>Essay Answer</Label>
                        <Textarea rowSpan={3} style={styles.container}/>
                        <Label style={{marginTop: 10}}>Upload a file</Label>
                        <View rowSpan={1} style={styles.file}>
                            <Button style={{margin: 10, padding: 5, paddingLeft: 10, paddingRight: 10}} light>
                                <Text>Choose File</Text>
                            </Button>
                        </View>
                        <Label>Submit a link</Label>
                        <Input style={styles.container}/>
                        <Button full style={{marginTop: 20,borderRadius:5}} danger>
                            <Text>Cancel</Text>
                        </Button>
                        <Button full style={{marginTop: 20,borderRadius:5}} success>
                            <Text>Save</Text>
                        </Button>
                    </View>}
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 1,
        //borderColor: '#d6d7da',
        borderColor: 'grey',
        backgroundColor: 'white',
        marginTop: 6,
        padding: 5
    },
    file: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 6,
        padding: 3,
        marginBottom: 3
    },
    headingText: {
        fontSize: 30
    },
    headingTextForPoints: {
        fontSize: 30
    }

});

export default Assignment
