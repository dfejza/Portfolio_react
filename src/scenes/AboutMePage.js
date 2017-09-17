import React from 'react';
import { PageHeader, Panel, Image, Row, Col, Thumbnail, Tooltip, OverlayTrigger, Modal, Glyphicon, Form, FormGroup, FormControl, Button } from 'react-bootstrap';
import sendContact from './../components/post'


export default class AboutMePage extends React.Component {
    render() {
        return (
            <div>
                <AboutMe data={this.props.store.data.page2} header={this.props.store.data.navigation} lang={this.props.store.lang}/>
                {/*<OtherInfo data={this.props.store.data.page2} lang={this.props.store.lang}/>*/}
            </div>
        );
    }
}

class AboutMe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false, showThanks: false,timePassed: false};

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.tooltip = this.tooltip.bind(this);
    }

    close() {
        this.setState({ showModal: false });
        this.setState({ showThanks: true });
        setTimeout(() => {this.setState({ showThanks: false })}, 3500);
    }

    open() {
        this.setState({ showModal: true });
    }

    tooltip(input){
        return(
            <Tooltip id="tooltip"><strong> {input} </strong></Tooltip>
        );
    }

    render() {
        return (
            <div>
                <Panel>
                    <PageHeader>
                        {this.props.header.aboutme[this.props.lang]} 
                        <div id="floatrightmail">
                            <OverlayTrigger placement="top" overlay={this.tooltip(this.props.data.tooltips.contact[this.props.lang])} onClick={this.open}>
                                <Thumbnail src={require("./../assets/contact.png")} alt="242x200"></Thumbnail>
                            </OverlayTrigger>
                        </div>
                    </PageHeader>
                    <div id="imgHolderAboutMe"><Image id="imagefloatleft" src={require("./../assets/me.png")} rounded /></div>
                    <h3 id="name">{this.props.data.name[this.props.lang]}</h3> 
                    {this.props.lang === 1 &&
                        <h5>{this.props.data.japName[this.props.lang]}</h5>
                    }
                        <p id="aboutme">{this.props.data.summary[this.props.lang]}</p>

                </Panel>

                <Modal bsSize="lg" show={this.state.showModal} onHide={this.close}>
                    <ContactMeModalContent closeModal={this.close} data={this.props.data} lang={this.props.lang}/>
                </Modal>
                <Modal bsSize="sm" show={this.state.showThanks}>
                    <Modal.Body>
                        <Thumbnail src={require("./../assets/shake.gif")} alt="242x200"></Thumbnail>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

class ContactMeModalContent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {name: "", email: "", message: ""};
        
        this.sendMessage = this.sendMessage.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangeMessage = this.handleChangeMessage.bind(this);
    }

    sendMessage(){
        this.props.closeModal();
        sendContact(this.state)
    }

    handleChangeName(e) {
        this.setState({ name: e.target.value });
    }
    handleChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    handleChangeMessage(e) {
        this.setState({ message: e.target.value });
    }

    render(){
        return(
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.data.tooltips.contact[this.props.lang]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Row>
                    <Col sm={12} md={3}>
                        <p id="contactquestion"> {this.props.data.contact.question[this.props.lang]}</p>
                        <p><Glyphicon glyph="map-marker" /> Kanagawa, Japan</p>
                        <p><Glyphicon glyph="phone" /> +1-631-813-6041</p>
                        <p><Glyphicon glyph="envelope" /> dardan.fejza@gmail.com</p> 
                    </Col>
                    <Col sm={12} md={9}>
                        <Form horizontal>
                            <FormGroup controlId="formHorizontalName">
                                <FormControl type="name" value={this.state.name} onChange={this.handleChangeName} placeholder={this.props.data.contact.name[this.props.lang]} />
                            </FormGroup>

                            <FormGroup controlId="formHorizontalEmail">
                                    <FormControl type="email" value={this.state.email} onChange={this.handleChangeEmail} placeholder={this.props.data.contact.email[this.props.lang]} />
                            </FormGroup>

                            <FormGroup controlId="formControlsTextarea">
                                <FormControl componentClass="textarea" value={this.state.message} onChange={this.handleChangeMessage}  placeholder={this.props.data.contact.comment[this.props.lang]} />
                            </FormGroup>

                            <Button id="submitComment" onClick={this.sendMessage}>
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    </Row>
                </Modal.Body>
            </div>
        );
    }
}
