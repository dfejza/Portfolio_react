import React from 'react';
import { Grid, Row, Col, Panel, Image, Media, Accordion} from 'react-bootstrap';
import GitHubFeed from 'react-github-activity';
import axios from 'axios';

export default class PortfolioPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {feed: []};

        this.GetFeed = this.GetFeed.bind(this);
    }
    GetFeed() {
        return axios.get('https://api.github.com/users/dfejza/events')
        .then((response) => {
            this.setState({ feed: response.data });
          });
    }

    componentDidMount() {
        this.GetFeed();
    }

    render() {
        return (
            <div>
                <CardGrid page1={this.props.store.data.page1} repo={this.props.store.data.page1.git} lang={this.props.store.lang}/>
                <hr />
                <ProjectListings repos={this.props.store.data.page1.git.repos} lang={this.props.store.lang} header={this.props.store.data.page1.repoHeader}/>
                <hr />
                <Example feed={this.state.feed}/>
            </div>
        );
    }
}

class CardGrid extends React.Component{
    render(){
        return(
            <div id="RepoHeader">
                <RepoCard  page1={this.props.page1} repo={this.props.page1.git} lang={this.props.lang} type="github.png"/>
                <RepoCard  page1={this.props.page1} repo={this.props.page1.bitB} lang={this.props.lang} type="bitbucket.png"/>
            </div>
        );
    }
}

class RepoCard extends React.Component{
    render(){
        return(
            <div id="RepoCard">
                <Media>
                    <Media.Left>
                        <img width={110} height={100} src={require("./../assets/" + this.props.type)} alt=""/>
                    </Media.Left>
                    <Media.Body>
                        <a href="{this.props.page1.git.usernameLink}" id="username">{this.props.page1.git.username}</a>
                        <p id="repoCount">{this.props.page1.repoCount[this.props.lang]} : {this.props.repo.repoCount}</p>
                        <p id="followers">{this.props.page1.followers[this.props.lang]} : {this.props.repo.followers}</p>
                        <p id="following">{this.props.page1.following[this.props.lang]} : {this.props.repo.following}</p>
                    </Media.Body>
                </Media>
            </div>
        );
    }
}

class ProjectListings extends React.Component{
    render(){
        return(
            <div> <br></br>
                <h2 id="ProjectListingsHeader">{this.props.header[this.props.lang]}</h2>
                <br></br>
                <Accordion>
                    {this.props.repos.map((item, index) => (
                        <Panel header={item.name} key={index+1} eventKey={index+1}>
                            <Grid>
                                <Row className="show-grid">
                                    <Col xs={12} md={5}>
                                        <a  href={item.link}><Image src={item.image} responsive /></a>
                                    </Col>
                                    <Col xs={12} md={5}>
                                        <a  href={item.link}><h4>{item.name}</h4></a>
                                        <div>{item.description}</div>
                                    </Col>
                                </Row>
                            </Grid>
                        </Panel>
                    ))}
                </Accordion>
            </div>
        );
    }
}


class Example extends React.Component {
    render() {
      const fullName = 'Dardan Fejza - Latest public activity'
      const userName = 'dfejza'
      const avatarUrl = ''
      const events = this.props.feed;
  
      return (
        <div>
            <GitHubFeed id="githubevents"
                fullName={fullName} // Provide Full Name as displayed on GitHub
                userName={userName} // Provide User Name as displayed on Guthub
                avatarUrl={avatarUrl} // Provide the avatar url of your github profile
                events={events} // provide array of events using the users '/events' endpoint of github api
            />
        </div>
      );
    }
  }