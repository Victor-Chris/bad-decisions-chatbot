import React from 'react';
import { Card } from 'antd';

import "antd/dist/antd.css";
import "./style.css";

class Headline extends React.Component {

    render() {
        return (
            <div>
                <Card
                    className="headlineCard"
                    hoverable
                >
                    <p className="headlineCard content">{this.props.content}</p>
                    <p className="headlineCard name">{this.props.name}</p>
                </Card>
            </div>
        );
    }
}


export default Headline;