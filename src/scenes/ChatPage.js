import React from "react";
import ReactDOM from "react-dom";
import io from "socket.io-client";
import postRequests from "../components/post";
import { firebaseAuth } from "../config/constants";
import axios from "axios";
import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Typography from "material-ui/Typography";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Tooltip from "material-ui/Tooltip";

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 8,
    paddingRight: 0,
    paddingBottom: 8,
    marginRight: 0,
    flexGrow: 1,
    marginTop: theme.spacing.unit * 6,
    maxWidth: "1000px"
  }),
  chat: {
    wordWrap: "break-word",
    padding: ".5rem 2rem 0rem 0rem"
  }
});

class ChatPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatData: [],
      user: "",
      msg: "",
      response: false,
      endpoint: "http://127.0.0.1:3001",
      userCount: 0
    };
    this.GetFeed = this.GetFeed.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleChangeMsg = this.handleChangeMsg.bind(this);
    var socket = null;
  }

  GetFeed() {
    return axios.get("/updatechat").then(response => {
      this.setState({ chatData: response.data });
    });
  }

  componentDidMount() {
    // Connect to the socket
    this.socket = io.connect();
    // Download chat history
    this.socket.on("chat log", data => {
      this.setState({ chatData: data });
    });
    // Listen for chat updates
    this.socket.on("chat updated", msg => {
      this.setState({ chatData: [...this.state.chatData, msg] });
    });

    this.socket.on("user count", userCount => {
      this.setState({ userCount: userCount });
    });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  sendMessage() {
    this.socket.emit("chat updated", {
      id: firebaseAuth().currentUser.email,
      msg: this.state.msg
    });
    this.setState({ msg: "" });
  }

  handleChangeMsg(e) {
    this.setState({ msg: e.target.value });
    if (e.target.value.length > 1) {
      //Display send button
      document.getElementById("sendText").style.visibility = "visible";
    } else {
      //Hide send
      document.getElementById("sendText").style.visibility = "hidden";
    }
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: "smooth" });
  };

  handleKeyPress = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  render() {
    const classes = this.props.classes;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={24}>
            <Grid item xs={12} md={7}>
              <Paper className={classes.root} elevation={4}>
                <span>
                  <h3 id="inlineMessage">Chat</h3>
                </span>{" "}
                <span style={{ float: "right", paddingTop : "10px" }}>
                  {this.state.userCount} user(s) online
                </span>
                <hr />
                <div id="chat">
                  {this.state.chatData.map((item, index) => (
                    <ChatMessageWrapped key={index} message={item} />
                  ))}

                  <div
                    style={{ float: "left", clear: "both" }}
                    ref={el => {
                      this.messagesEnd = el;
                    }}
                  />
                </div>
                <div className="inlineMessage">
                  <TextField
                    id="name"
                    label="Message"
                    value={this.state.msg}
                    onChange={this.handleChangeMsg}
                    margin="normal"
                    onKeyPress={this.handleKeyPress}
                    style={{ width: "86%", paddingRight: 0, marginRight: 0 }}
                  />
                  <Button
                    dense
                    id="sendText"
                    color="primary"
                    style={{
                      width: "9% ",
                      visibility: "hidden",
                      padding: 0,
                      margin: 0
                    }}
                    onClick={this.sendMessage}
                  >
                    Send
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

class ChatMessage extends React.Component {
  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.chat}>
          {" "}
          {
            //   <Tooltip
            //   title={this.props.message.time}
            //   id="tooltip-left"
            //   placement="left-end"
            // >
          }
          <strong>
            <span>
              {this.props.message.id != null && this.props.message.id.length > 1
                ? this.props.message.id.substring(
                    0,
                    this.props.message.id.indexOf("@") > 1
                      ? this.props.message.id.indexOf("@")
                      : this.props.message.id.length
                  )
                : "anon"}:
            </span>
          </strong>
          {
            //</Tooltip>
          }{" "}
          {this.props.message.msg}
        </div>
      </div>
    );
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired
};

const ChatMessageWrapped = withStyles(styles)(ChatMessage);

export default withStyles(styles)(ChatPage);
