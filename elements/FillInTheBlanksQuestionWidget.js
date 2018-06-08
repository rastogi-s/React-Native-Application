import React from 'react'
import {Text, View, StyleSheet, TextInput} from 'react-native';
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

} from 'native-base';

import {Icon} from 'react-native-elements'
import ExamServiceClient from "../services/ExamServiceClient";

class FillInTheBlanksQuestionWidget extends React.Component {
    static navigationOptions = {title: "Fill in the blanks"}

    constructor(props) {
        super(props)
        this.state = {
            preview: false,
            title: '',
            description: '',
            points: '',
            id: '',
            variables: [],
            previewDesc: ''
        }

        this.togglePreview = this.togglePreview.bind(this);
        this.addQuestion = this.addQuestion.bind(this);
        this.modifyDescription = this.modifyDescription.bind(this);
        this.getVariable = this.getVariable.bind(this);
        this.examServiceClient = ExamServiceClient.instance

    }

    isEmpty(obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }


    getVariable() {
        var previewDescriptionVars = this.state.description.match(/\[(.+?)\]/gi);
        var variables = []
        for (var p in previewDescriptionVars) {
            if (previewDescriptionVars[p].indexOf('=') > 0) {
                variables.push({vars: previewDescriptionVars[p].slice(1, previewDescriptionVars[p].length - 1)});

            }

        }

        return variables

    }

    modifyDescription() {

        var previewDesc = this.state.description;
        var previewDescriptionVars = this.state.description.match(/\[(.+?)\]/gi);
        var variables = []
        for (var p in previewDescriptionVars) {
            if (previewDescriptionVars[p].indexOf('=') > 0) {
                variables.push(previewDescriptionVars[p].slice(1, previewDescriptionVars[p].length - 1));
                previewDesc = previewDesc.replace(previewDescriptionVars[p], '|');
            }

        }

        var arr = previewDesc.split('|');

        var newArr = []
        for (var i = 0; i < arr.length; i++) {
            newArr.push(<Text style={{fontSize: 20, marginTop: 5, marginLeft: 18}} key={i}>{arr[i]}</Text>);
            if (arr.length > 1 && i < arr.length - 1)
                newArr.push(<Input style={{backgroundColor: 'white', borderRadius: 5, padding: 5, margin: 5}}
                                   key={i + 100}/>)
        }
        return newArr;
    }

    componentDidMount() {
        const {navigation} = this.props;
        const examId = navigation.getParam("examId");
        const question = navigation.getParam("question");
        //const questionId = navigation.getParam("questionId");
        //const unMount = navigation.getParam("unMount");
        if (!this.isEmpty(question)) {
            this.setState({

                examId: examId,
                title: question.title,
                description: question.description,
                id: question.id,
                points: question.points,
                variables: question.variables,
                previewDesc: question.description,
                //unMount:unMount

            })

            this.modifyDescription();
        }
        else {
            this.setState({
                examId: examId
            });
        }

    }

    // componentWillUnmount(){
    //
    //     this.state.unMount();
    // }


    addQuestion() {

        if (this.state.id == undefined || this.state.id === '') {
            var variables = this.getVariable();
            this.examServiceClient.createFillInTheBlanksQuestion(this.state.examId, {
                title: this.state.title,
                description: this.state.description, points: this.state.points, variables: variables
            }).then(
                this.props.navigation
                    .navigate("QuestionList", {
                        examId: this.state.examId

                    })
            )
        }
        else {

            var variables = this.getVariable();
            this.examServiceClient.updateFillInTheBlanks(this.state.id, {
                title: this.state.title, id: this.state.id,
                description: this.state.description, points: this.state.points, variables: variables
            }).then(
                this.props.navigation
                    .navigate("QuestionList", {
                        examId: this.state.examId

                    })
            )

        }

    }


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
                        {/*<Text style={{fontSize: 20, marginTop: 5,marginLeft:18}}>*/}
                        {/*<View style={{flexDirection: 'row'}}>*/}
                        {this.modifyDescription()}
                        {/*</View>*/}
                        {/*</Text>*/}
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

export default FillInTheBlanksQuestionWidget
