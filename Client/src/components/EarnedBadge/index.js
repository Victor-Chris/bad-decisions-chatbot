import React from 'react';
import { Card } from 'antd';

import "antd/dist/antd.css";
import "./style.css";

class EarnedBadge extends React.Component {

    static defaultProps = {
        image: process.env.PUBLIC_URL + '/profile.png',
    }

    render() {
        return (
            <div>
                <Card
                    className="badgeCard"
                    hoverable
                >
                    {/* <div style={{ width: "100%" }}> */}
                        <p className="badgeText title">BADGE EARNED</p>
                        <img className="badgeImg" src={this.props.image} alt="" />
                        <p className="badgeText type">{this.props.type}</p>
                        <p className="badgeText content">{this.props.content}</p>
                    {/* </div> */}
                </Card>
            </div>
        );
    }
}


export default EarnedBadge;