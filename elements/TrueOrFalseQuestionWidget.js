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
    Radio,
    Button,
    CheckBox,
    Body,
    ListItem,
    Left,
    Right,
    List

} from 'native-base';

import {Icon} from 'react-native-elements'
import ExamServiceClient from "../services/ExamServiceClient";

class TrueOrFalseQuestionWidget extends React.Component {
    static navigationOptions = {title: "True Or False"}

    constructor(props) {
        super(props)
        this.state = {
            preview: false,
            title: '',
            description: '',
            points: '',
            id: '',
            isTrue: false,
            trueOrFalse: false
        }

        this.togglePreview = this.togglePreview.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.examServiceClient = ExamServiceClient.instance

    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const question = navigation.getParam("question");
        const unMount = navigation.getParam("unMount")

        if (!this.isEmpty(question)) {
            this.setState({

                examId: examId,
                title: question.title,
                description: question.description,
                id: question.id,
                points: question.points,
                isTrue: (question.isTrue) ? true : false,
                unMount:unMount

            })
        }
        else {
            this.setState({
                examId: examId
            });
        }
    }


    addQuestion() {

        if (this.state.id == undefined || this.state.id === '') {
            this.examServiceClient.createTrueFalseQuestion(this.state.examId, {
                title: this.state.title,
                description: this.state.description, points: this.state.points, isTrue: this.state.isTrue
            }).then(
                this.props.navigation
                    .navigate("QuestionList", {
                        examId: this.state.examId

                    })
            )
        }
        else {
            this.examServiceClient.updateTrueFalse(this.state.id, {
                title: this.state.title, id: this.state.id,
                description: this.state.description, points: this.state.points, isTrue: this.state.isTrue
            }).then(
                this.props.navigation
                    .navigate("QuestionList", {
                        examId: this.state.examId

                    })
            )

        }


    }

    // componentWillUnmount(){
    //
    //     this.state.unMount();
    // }



    togglePreview() {
        this.setState({preview: !this.state.preview})
    }

    render() {
        let title;
        let description;
        let points;

        const {goBack} = this.props.navigation;
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
                    {!this.state.preview && <Form style={{marginTop: 5}}>
                        <Item floatingLabel>
                            <Label>Title</Label>
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
                        <ListItem>
                            <CheckBox checked={this.state.isTrue}
                                      onPress={() => this.setState({isTrue: !this.state.isTrue})} color="green"/>
                            <Body style={{marginLeft: 10}}>
                            <Text> Check if True or Uncheck if false </Text>
                            </Body>
                        </ListItem>
                    </Form>}
                    {this.state.preview &&
                    <View style={{marginTop: 10}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{width: '70%'}}>
                                <Text style={styles.headingText}>{this.state.title}</Text>
                            </View>
                            <View style={{width: '30%'}}>
                                <Text style={styles.headingTextForPoints}> {this.state.points}pts</Text>
                            </View>
                        </View>
                        <Text style={{fontSize: 20, marginTop: 5, marginLeft: 18}}>
                            {this.state.description}
                        </Text>
                        <List style={{marginTop: 5, paddingRight: 18, paddingLeft: 2}}>
                            <ListItem style={{backgroundColor: 'white', borderRadius: 5, paddingLeft: 10}}>
                                <Left>
                                    <Text style={{fontSize: 20}}>True</Text>
                                </Left>
                                <Right>
                                    <CheckBox
                                        color={"#f0ad4e"}
                                        selectedColor={"#5cb85c"}
                                        checked={!this.state.trueOrFalse}
                                        onPress={() => this.setState({trueOrFalse: this.state.false})}
                                    />
                                </Right>
                            </ListItem>
                            <ListItem style={{backgroundColor: 'white', borderRadius: 5, paddingLeft: 10}}>
                                <Left>
                                    <Text style={{fontSize: 20}}>False</Text>
                                </Left>
                                <Right>
                                    <CheckBox
                                        color={"#f0ad4e"}
                                        selectedColor={"#5cb85c"}
                                        checked={this.state.trueOrFalse}
                                        onPress={() => this.setState({trueOrFalse: !this.state.false})}
                                    />
                                </Right>
                            </ListItem>
                        </List>

                    </View>}
                    <Button full style={{margin: 10, borderRadius: 5}} success onPress={this.addQuestion}>
                        <Text>Submit</Text>
                    </Button>
                    <Button full style={{margin: 10, borderRadius: 5}} danger onPress={() => goBack()}>
                        <Text>Cancel</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: 'grey',
        backgroundColor: 'white',
        margin: 6,
        padding: 5
    },
    headingText: {
        fontSize: 30,
        marginLeft: 18
    },
    headingTextForPoints: {
        fontSize: 30,
        marginRight: 1
    }

});

export default TrueOrFalseQuestionWidget;
