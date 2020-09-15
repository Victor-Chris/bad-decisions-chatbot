import React from 'react';
import { Card } from 'antd';
import GaugeChart from 'react-gauge-chart'

import "antd/dist/antd.css";
import "./style.css";

import users, { userData } from '../../utils';


class Status extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            new_followers: props.new_followers,
            total_followers: props.total_followers,
            trust: props.trust
        }
    }

    updateStat() {

        var str_new_follower = "";
        if (userData.new_followers >= 0)
            str_new_follower = "+" + userData.new_followers;
        else
            str_new_follower = String(userData.new_followers);

        var str_new_trust = "";
        if (userData.new_trust >= 0)
            str_new_trust = "+" + userData.new_trust;
        else
            str_new_trust = String(userData.new_trust);

        this.setState({
            new_followers: str_new_follower,
            total_followers: userData.total_followers,
            trust: userData.trust,
            new_trust: str_new_trust
        })

        userData.new_trust = 0;
        userData.new_followers = 0;
        users.update(userData);

        this.forceUpdate();
    }

    componentDidMount() {
        this.updateStat();
    }

    render() {

        const randomID = "id-" + String(Math.random() * 100).replace(".", "-");
        const gaugeNo = parseFloat(((this.state.trust + 100) / 2) / 100);
        const blinker = (this.state.trust <= -40) ? <span className="blink" >⚠</span> : "";

        return (
            <div style={{ width: "95%" }}>
                <Card
                    className="statusCard"
                    hoverable
                >
                    <p className="userStatus label">Followers:</p>
                    <p className="userStatus value" >{this.state.total_followers} (<span className="userStatus new">{this.state.new_followers}</span>) </p>
                    <p className="userStatus label">Credibility:</p>
                    <p className="userStatus value" >{this.state.trust} (<span className="userStatus new">{this.state.new_trust}</span>) {blinker} </p>
                    <GaugeChart id={randomID}
                        className="gaugeClass"
                        animate={false}
                        nrOfLevels={3}
                        colors={["#EC0D0D", "#7F8994", "#7F8994"]}
                        percent={gaugeNo}
                        formatTextValue={(value) => {
                            return "";
                        }
                        }
                    />
                </Card>
            </div>
        );
    }
}

export default Status;