import React from 'react';
import ReactDOM from 'react-dom';
import {Panel, Button, Form, FormGroup, FormControl, PageHeader} from 'react-bootstrap';
import postRequests from '../components/post'
import axios from 'axios';

export default class ChatPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {chatData: [], user: "", msg: "",};
        this.GetFeed = this.GetFeed.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangeMsg = this.handleChangeMsg.bind(this);
    }

    GetFeed() {
        return axios.get('/updatechat')
        .then((response) => {
            console.log(response.data);
            this.setState({chatData: response.data});
        });
    }

    componentDidMount() {
        this.GetFeed();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }

    sendMessage(){
        postRequests.sendChat({"id" :this.state.user, "msg": this.state.msg});
        this.GetFeed();
        this.setState({msg:""});
    }

    handleChangeUser(e) {
        this.setState({ user: e.target.value });
    }
    handleChangeMsg(e) {
        this.setState({ msg: e.target.value });
    }

    scrollToBottom = () => {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({ behavior: "smooth" });
    }

    handleKeyPress = (event) => {
      if(event.key === 'Enter'){
        this.sendMessage()
      }
    }

    render(){
        return(
            <Panel>
                <PageHeader>{this.props.store.data.chatRoomTitle[this.props.store.lang]}<small>v0.2</small></PageHeader>
                <div id="chat">
                    {this.state.chatData.map((item, index) => (
                        <ChatMessage key={index} message={item} />
                    ))}

                    <div style={{ float:"left", clear: "both" }}
                         ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
                <Form inline>
                    <FormGroup>
                      <FormControl className="chatInput" id="chatUserName" value={this.state.user} onChange={this.handleChangeUser} type="text" placeholder="username" />
                    </FormGroup>
                    {' '}
                    <FormGroup>
                      <FormControl className="chatInput" id="chatMessageBox" value={this.state.msg} onChange={this.handleChangeMsg} onKeyPress={this.handleKeyPress} type="text" placeholder="message" />
                    </FormGroup>
                    {' '}
                    <Button id="floatRight" onClick={this.sendMessage}>
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
            <div ><p><i>[{this.props.message.time}]</i> <strong><span>{this.props.message.id != null && this.props.message.id.length > 1 ? this.props.message.id : "unnamed"}:</span></strong>   {this.props.message.msg}</p></div>
        );
    }
}