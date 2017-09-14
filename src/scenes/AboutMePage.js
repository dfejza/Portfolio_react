import React from 'react';
import { PageHeader, Panel, Image, Grid, Row, Col, Thumbnail, Tooltip, OverlayTrigger, Modal } from 'react-bootstrap';


export default class AboutMePage extends React.Component {
    render() {
        return (
            <div className="content">
                <AboutMe data={this.props.store.data.page2} header={this.props.store.data.navigation} lang={this.props.store.lang}/>
                <OtherInfo data={this.props.store.data.page2} lang={this.props.store.lang}/>
            </div>
        );
    }
}

class AboutMe extends React.Component {
    render() {
        return (
            // Use a grid system due to the other components of this page relying on one. Keeps things lined up
        <Grid>
        <Row>
        <Col xs={12} md={12}>
            <Panel>
                <PageHeader>{this.props.header[2][this.props.lang]}</PageHeader>
                <div id="imgHolderAboutMe"><Image id="imagefloatleft" src={require("./../assets/me.jpg")} rounded /></div>
                <h3 id="name">{this.props.data.name[this.props.lang]}</h3> 
                {this.props.lang === 1 &&
                    <h5>{this.props.data.japName[this.props.lang]}</h5>
                }
                    <p id="aboutme">{this.props.data.summary[this.props.lang]}</p>

            </Panel>
        </Col>
        </Row>
        </Grid>
        );
    }
}

class AboutMeModal extends React.Component{
    constructor(props) {
        super(props);
        this.state = {showModal: false};

        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.tooltip = this.tooltip.bind(this);
    }

    close() {
        this.setState({ showModal: false });
    }

    open() {
        this.setState({ showModal: true });
    }

    tooltip(input){
        return(
            <Tooltip id="tooltip"><strong> {input} </strong></Tooltip>
        );
    }

    render(){
        return(
            <div>
                <OverlayTrigger placement="top" overlay={this.tooltip(this.props.tooltip)} onClick={this.open}>
                    <Thumbnail src={require("./../assets/"+ this.props.icon + ".png")} alt="242x200"></Thumbnail>
                </OverlayTrigger>
                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.tooltip}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>College Career</h4>
                        <ul>
                            <li>Java & Android</li>
                            <li>C/C++</li>
                            <li>Python</li>
                            <li>Assembly (MIPS)</li>
                            <li>Verilog HDL</li>
                        </ul>
                        <hr />
                        

                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

class OtherInfo extends React.Component {
    render() {
        return(
              <Grid>
                <Row>
                    <Col xs={12} md={4}>
                        <AboutMeModal tooltip={this.props.data.tooltips.programming[this.props.lang]} icon="coding"/>
                    </Col>
                    <Col xs={12} md={4}>
                        <AboutMeModal tooltip={this.props.data.tooltips.skills[this.props.lang]} icon="skills"/>
                    </Col>
                    <Col xs={12} md={4}>
                        <AboutMeModal tooltip={this.props.data.tooltips.work[this.props.lang]} icon="work"/>
                    </Col>
                    <Col xs={12} md={12}>
                        <AboutMeModal tooltip={this.props.data.tooltips.contact[this.props.lang]} icon="contact"/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
