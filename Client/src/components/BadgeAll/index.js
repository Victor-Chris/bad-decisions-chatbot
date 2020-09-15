import React from 'react';
import { Card } from 'antd';

import "antd/dist/antd.css";
import "./style.css";

class BadgeAll extends React.Component {

    static defaultProps = {
        impersonation: false,
        emotion: false,
        polarization: false,
        conspiracy: false,
        discredit: false
    }

    render() {
        const impersonation = (this.props.impersonation) ? <img src="https://www.getbadnews.com/wp-content/uploads/2017/08/vermommen.png" alt="Impersonation" style={{ width: "100%" }} /> : "";
        const emotion = (this.props.emotion) ? <img src="https://www.getbadnews.com/wp-content/uploads/2018/01/emotion.png" alt="Emotion" style={{ width: "100%" }} /> : "";
        const polarization = (this.props.polarization) ? <img src="https://www.getbadnews.com/wp-content/uploads/2017/08/polariseer.png" alt="Polarization" style={{ width: "100%" }} /> : "";
        const conspiracy = (this.props.conspiracy) ? <img src="https://www.getbadnews.com/wp-content/uploads/2017/08/manipuleer.png" alt="Conspiracy" style={{ width: "100%" }} /> : "";
        const discredit = (this.props.discredit) ? <img src="https://www.getbadnews.com/wp-content/uploads/2017/08/verdedig.png" alt="Discredit" style={{ width: "100%" }} /> : "";

        return (
            <div style={{ width: "95%" }} >
                <Card
                    className="allBadgeCard"
                    hoverable
                >
                    <div className="badge-list">
                        <p className="allBadgeText">ALL BADGES</p>
                        <ul>
                            <li>
                                <div className="badge-holder" >
                                    {impersonation}
                                </div>
                            </li>
                            <li>
                                <div className="badge-holder" >
                                    {emotion}
                                </div>
                            </li>
                            <li>
                                <div className="badge-holder" >
                                    {polarization}
                                </div>
                            </li>
                            <li>
                                <div className="badge-holder" >
                                    {conspiracy}
                                </div>
                            </li>
                            <li>
                                <div className="badge-holder" >
                                    {discredit}
                                </div>
                            </li>
                            <li>
                                <div className="badge-holder" >

                                </div>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        );
    }
}


export default BadgeAll;