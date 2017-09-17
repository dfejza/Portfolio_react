import React from 'react';
import {Jumbotron, Panel, Button, Form, FormGroup, FormControl} from 'react-bootstrap';

export default class ChatPage extends React.Component{
    constructor(props) {
        super(props);
        this.datas = [{"id" : "brah", "time":"12:12","message":"hey guys"}, {"id" : "conker", "time":"12:12","message":"hey brah"}, {"id" : "jbones", "time":"12:13","message":"sup"}];
    }
    render(){
        return(
            <Panel>
                <div id="chat">
                    {this.datas.map((item, index) => (
                        <ChatMessage key={index} message={item} />
                    ))}
                </div>
                <Form inline>
                    <FormGroup>
                      <FormControl className="chatInput" id="chatUserName" type="text" placeholder="username" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                      <FormControl className="chatInput" id="chatMessageBox" type="text" placeholder="message" />
                    </FormGroup>
                    {' '}
                    <Button id="floatRight">
                      Send
                    </Button>
                </Form>
            </Panel>
          );
    }
}

class ChatMessage extends React.Component{
    render(){
        return(
            <div ><p><i>[{this.props.message.time}]</i> <strong><span>{this.props.message.id}:</span></strong>   {this.props.message.message}</p></div>
        );
    }
}