import React, {Component} from 'react'
import {Text,Picker ,View, StyleSheet} from 'react-native';
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

export default class Exam extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questionType: 'MC',
            preview:false
        }
    }
    render() {
        return (
            <Container>
                <Text>Hello in exam</Text>
                {/*<View style={{padding: 10}}>*/}
                    {/*{!this.state.preview &&*/}
                    {/*<Icon name="eye-slash" type="font-awesome" style={{marginTop: 20, justifyContent: 'flex-start'}}*/}
                          {/*raised*/}
                          {/*onPress={this.togglePreview}/>}*/}
                    {/*{this.state.preview &&*/}
                    {/*<Icon name="eye" type="font-awesome" style={{marginTop: 20, justifyContent: 'flex-start'}} raised*/}
                          {/*onPress={this.togglePreview}/>}*/}
                {/*</View>*/}
                {/*<Content>*/}
                    {/*{!this.state.preview && <Form style={{margin: 5}}>*/}
                        {/*<Item floatingLabel>*/}
                            {/*<Label>Assignment Title</Label>*/}
                            {/*<Input ref={(el) => {*/}
                                {/*title = el;*/}
                            {/*}}*/}
                                   {/*onChangeText={(title) => this.setState({title})}*/}
                                   {/*value={this.state.title}/>*/}
                        {/*</Item>*/}
                        {/*<Item floatingLabel>*/}
                            {/*<Label>Points</Label>*/}
                            {/*<Input ref={(el) => {*/}
                                {/*points = el;*/}
                            {/*}}*/}
                                   {/*onChangeText={(points) => this.setState({points})}*/}
                                   {/*value={this.state.points.toString()} />*/}
                        {/*</Item>*/}
                        {/*<Item floatingLabel>*/}
                            {/*<Label>Description</Label>*/}
                            {/*<Input rowSpan={5} ref={(el) => {*/}
                                {/*description = el;*/}
                            {/*}}*/}
                                   {/*onChangeText={(description) => this.setState({description})}*/}
                                   {/*value={this.state.description}/>*/}
                        {/*</Item>*/}
                        {/*<Button full style={{marginTop: 20,borderRadius:5}} danger onPress={this.addAssignment}>*/}
                            {/*<Text>Save</Text>*/}
                        {/*</Button>*/}
                    {/*</Form>}*/}
                    {/*{this.state.preview &&*/}
                    {/*<View style={{margin: 10}}>*/}
                        {/*<View style={{flex: 1, flexDirection: 'row'}}>*/}
                            {/*<View style={{width: '70%'}}>*/}
                                {/*<Text style={styles.headingText}>{this.state.title}</Text>*/}
                            {/*</View>*/}
                            {/*<View style={{width: '30%'}}>*/}
                                {/*<Text style={styles.headingTextForPoints}> {this.state.points}pts</Text>*/}
                            {/*</View>*/}
                        {/*</View>*/}
                        {/*<Text style={{fontSize: 20,marginTop:5}} >*/}
                            {/*{this.state.description}*/}
                        {/*</Text>*/}
                        {/*<Label style={{marginTop: 10}}>Essay Answer</Label>*/}
                        {/*<Textarea rowSpan={3} style={styles.container}/>*/}
                        {/*<Label style={{marginTop: 10}}>Upload a file</Label>*/}
                        {/*<View rowSpan={1} style={styles.file}>*/}
                            {/*<Button style={{margin: 10, padding: 5, paddingLeft: 10, paddingRight: 10}} light>*/}
                                {/*<Text>Choose File</Text>*/}
                            {/*</Button>*/}
                        {/*</View>*/}
                        {/*<Label>Submit a link</Label>*/}
                        {/*<Input style={styles.container}/>*/}
                        {/*<Button full style={{marginTop: 20,borderRadius:5}} danger>*/}
                            {/*<Text>Cancel</Text>*/}
                        {/*</Button>*/}
                        {/*<Button full style={{marginTop: 20,borderRadius:5}} success>*/}
                            {/*<Text>Save</Text>*/}
                        {/*</Button>*/}
                    {/*</View>}*/}
                {/*</Content>*/}
                {/*<View>*/}
                {/*<Picker*/}
                {/*onValueChange={(itemValue, itemIndex) =>*/}
                {/*this.setState({questionType: itemValue})}*/}
                {/*selectedValue={this.state.questionType}>*/}
                {/*<Picker.Item value="MC" label="Multiple choice" />*/}
                {/*<Picker.Item value="ES" label="Essay" />*/}
                {/*<Picker.Item value="TF" label="True or false" />*/}
                {/*<Picker.Item value="FB" label="Fill in the blanks" />*/}
                {/*</Picker>*/}
                {/*<Text>{this.state.questionType}</Text>*/}
                {/*</View>*/}
            </Container>

        )
    }
}