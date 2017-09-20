import React from 'react';
import { Panel } from 'react-bootstrap';

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                    <div dangerouslySetInnerHTML={{__html: this.props.store.data.page0.contentRaw[this.props.store.lang]}}></div>
            </div>
        );
    }
}
