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
    Body,
    Button,
    Left,
    Right,
    ListItem,
    List,
    Radio
} from 'native-base';

import {Icon} from 'react-native-elements'
import ExamServiceClient from "../services/ExamServiceClient";

class MultipleChoiceQuestionEditor extends React.Component {
    static navigationOptions = {title: "Multiple Choice Question Editor"}

    constructor(props) {
        super(props)
        this.state = {
            preview: false,
            title: '',
            description: '',
            points: '',
            id: '',
            choice: '',
            choices: [],
            listSelected: false
        }

        this.togglePreview = this.togglePreview.bind(this);
        this.addChoice = this.addChoice.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.deleteChoice = this.deleteChoice.bind(this);
        this.examServiceClient = ExamServiceClient.instance

    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const question = navigation.getParam("question");
        //const questionId = navigation.getParam("questionId");
        console.log(examId);
        console.log(question);
        if(!this.isEmpty(question)) {
            this.setState({

                examId: examId,
                title: question.title,
                description: question.description,
                id: question.id,
                points: question.points,
                choice: question.choice,
                choices: question.choices

            })
        }
        else{
            this.setState({
                examId: examId});
        }
    }

    deleteChoice(index){
        var choices=this.state.choices.filter((choice,i) => {
            if(i==index)
                return false
            else
                return true});
        this.setState({choices:choices})

    }

    addQuestion() {

        if (this.state.id == undefined || this.state.id === '') {
            console.log('add question')
            this.examServiceClient.createMultipleChoiceQuestion(this.state.examId, {
                title: this.state.title,
                description: this.state.description, points: this.state.points,
                choice: this.state.choice, choices: this.state.choices
            }).then(
                this.props.navigation
                    .navigate("QuestionList", {
                        examId: this.state.examId,

                    })
            )
        }
        else {
            console.log('update question')
            this.examServiceClient.updateMulti(this.state.id, {
                title: this.state.title,
                description: this.state.description, points: this.state.points,
                choice: this.state.choice, choices: this.state.choices
            }).then(
                this.props.navigation
                    .navigate("QuestionList", {
                        examId: this.state.examId,

                    })
            )

        }


    }

    addChoice() {

        var choices = this.state.choices;
        choices.push({items: this.state.choicetext});
        this.setState({choices: choices});
        this.setState({choictext: ''});

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
        let choice;
        let choicetext;
        let selectedList;
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

                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '80%'}}>
                                <Item floatingLabel>
                                    <Label>Choices</Label>
                                    <Input ref={(el) => {
                                        choicetext = el;
                                    }}
                                           onChangeText={(choicetext) => this.setState({choicetext})}
                                           value={this.state.choicetext}/>
                                </Item>

                            </View>
                            <View style={{width: '20%'}}>
                                <Icon name="plus" type="font-awesome"
                                      style={{marginTop: 20, justifyContent: 'flex-end'}} raised
                                      onPress={() => this.addChoice()}/>
                            </View></View>

                        <List>
                            {this.state.choices.map((c, index) => (
                                <ListItem
                                    key={index}>
                                    <Left >
                                        <Radio style={{marginRight:8 }} onSelect={(choice) => this.setState({choice})}/>
                                        <Text ref={(el) => {
                                            choice = el;
                                        }}>{c.items}</Text>
                                    </Left>
                                    <Right >
                                        <Icon name="trash" type="font-awesome" onPress={() => this.deleteChoice(index)}/>
                                    </Right>
                                </ListItem>
                            ))}
                        </List>

                        <Button full style={{marginTop: 20, borderRadius: 5}} danger onPress={this.addQuestion}>
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
                        <Text style={{fontSize: 20, marginTop: 5}}>
                            {this.state.description}
                        </Text>
                        <List style={{marginTop: 5}}>
                            {this.state.choices.map((c, index) => (
                                <ListItem

                                    key={index} selected={this.state.listSelected}>

                                    <Left>
                                        <Radio style={{marginRight:8 }}
                                               onSelect={() => this.setState({listSelected: !this.state.listSelected})}/>
                                        <Text ref={(el) => {
                                            choice = el;
                                        }}>{c.items}</Text>
                                    </Left>
                                </ListItem>
                            ))}
                        </List>
                        <Button full style={{marginTop: 20, borderRadius: 5}} danger>
                            <Text>Cancel</Text>
                        </Button>
                        <Button full style={{marginTop: 20, borderRadius: 5}} success>
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

export default MultipleChoiceQuestionEditor
