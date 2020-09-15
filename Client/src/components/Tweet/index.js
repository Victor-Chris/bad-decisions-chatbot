import React from 'react';
import { Card } from 'antd';

import "antd/dist/antd.css";
import "./style.css";

import { userData } from '../../utils';

class Tweet extends React.Component {

    static defaultProps = {
        image: "https://www.getbadnews.com/wp-content/uploads/2017/08/profile.png",
        name: "Name",
        description: "Profile Description",
        tweet: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse accumsan aliquam varius.",
    }

    state = {
        image: this.props.image,
        name: this.props.name,
        description: this.props.description,
        tweet: this.props.tweet,
    }

    componentDidMount() {
        if (this.props.jane) {

            this.setState({
                description: userData.tweetprofile1,
                tweet: userData.twitterreaction
            });
        }

        if (this.props.ben) {
            this.setState({
                description: userData.tweetprofile2,
                tweet: userData.twitterreaction2
            });
        }

        if (this.props.slogan) {
            this.setState({
                name: userData.naam,
                image: userData.thumbUrl,
                tweet: String(this.props.tweet).replace("{{naam}}", userData.naam)
            });
        }

        if (this.props.janeFake) {
            this.setState({
                description: userData.tweetprofile1,
                tweet: String(this.props.tweet).replace("{{naam}}", userData.naam)
            });
        }

        if (this.props.benFake) {
            this.setState({
                description: userData.tweetprofile2,
                tweet: String(this.props.tweet).replace("{{naam}}", userData.naam)
            });
        }

        if (this.props.kurt) {
            this.setState({
                image: "https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-henk.png",
                description: "Angry citizen | Fan of " + userData.naam,
                tweet: userData.responsetweet1 + " #" + userData.problem1
            });
        }

        if (this.props.kim) {
            this.setState({
                image: "https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-echtepatrioot.png",
                description: "My kids are alright | " + userData.naam + " is great",
                tweet: userData.responsetweet2 + " #" + userData.problem1
            });
        }

        if (this.props.joebot) {
            this.setState({
                tweet: userData.person1 + " is right! " + userData.blame1 + " to blame for this disaster! #" + userData.issue + " #Free" + userData.person1
            });
        }

        if (this.props.ninasimi) {
            this.setState({
                tweet: userData.blame1 + " ruining this beautiful land! How can we live like this? #" + userData.person1 + "WasRight #" + userData.issue
            });
        }

        if (this.props.kurtpl) {
            this.setState({
                tweet: "True @Joe Roe-Bot and @Nina Sim1! " + userData.blame1 + " making a total mess with support from " + userData.target + " crazies! #" + userData.issue,
                description: "You know I'm like a smart person. I follow " + userData.naam + "."
            });
        }

        if (this.props.kimpl) {
            this.setState({
                tweet: "Wow, @Joe Roe-Bot is so right. We have to stop these " + userData.target + " lunatics from hijacking our society! #" + userData.issue,
                description: "I like " + userData.naam + ". | My kids are alright."
            });
        }

        if (this.props.kimcp) {
            this.setState({
                tweet: userData.followertweet,
                description: "My kids are alright. | Fan of " + userData.naam
            });
        }

        if (this.props.kurtcp) {
            this.setState({
                tweet: userData.followertweet2,
                description: "You know I'm like a smart person. I follow " + userData.naam
            });
        }

        if (this.props.kimcp2) {
            this.setState({
                tweet: userData.followerresponse,
                description: "My kids are alright. | Fan of " + userData.naam
            });
        }

        if (this.props.kurtcp2) {
            this.setState({
                tweet: userData.followerresponse2,
                description: "You know I'm like a smart person. I follow " + userData.naam
            });
        }

        if (this.props.bobcp) {
            this.setState({
                tweet: "What in tarnation!? Is this about me? This is crazy. A new low for " + userData.naam + ". #Conspiracy #" + userData.bobeffect
            });
        }

        if (this.props.amandacp) {
            this.setState({
                tweet: "I can recommend the latest article on " + userData.naam + " about #" + userData.conspiracytopic + ". It's the only site that tells you the truth! #" + userData.conspiracyorg,
                description: userData.naam + " is the TRUTH THE WHOLE TRUTH AND NOTHING BUT THE TRUTH"
            });
        }

        if (this.props.josecp) {
            this.setState({
                tweet: "@" + userData.afknaam + ": guys, I love your content about #" + userData.conspiracytopic + "! You're telling us what the #LamestreamMedia is hiding!",
                description: "Music was my first love, " + userData.naam + " will be my last."
            });
        }

        if (this.props.fcodc) {
            this.setState({
                tweet: userData.naam + " is spreading lies. #" + userData.conspiracytopic + " story has been debunked. #PantsOnFire"
            });
        }

        if (this.props.kurtdc) {
            this.setState({
                description: userData.naam + " my eternal love | " + userData.kurteffect,
                tweet: "Hey @" + userData.afknaam + " are you just going to let this 'factchecking' thing slide? #Weak #Sad"
            });
        }

        if (this.props.kurtdc2) {
            this.setState({
                description: "I still love you, " + userData.naam + "! | Hobbies include mindful origami.",
                tweet: "Wait so you guys were lying, " + userData.naam + "? I'm hurt. Delete my number! #" + userData.conspiracytopic
            });
        }

        if (this.props.amandadc) {
            this.setState({
                description: userData.naam + " is the TRUTH THE WHOLE TRUTH AND NOTHING BUT THE TRUTH",
                tweet: userData.defensetweet1
            });
        }

        if (this.props.josedc) {
            this.setState({
                description: "Music was my first love, " + userData.naam + " will be my last.",
                tweet: userData.defensetweet2
            })
        }
    }

    render() {
        return (
            <div style={{ width: "95%" }}>
                <Card
                    className="tweetCard"
                    hoverable
                >
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ display: "flex", flexDirection: "column", width: "25%" }}>
                            <img className="tweetImg" src={this.state.image} alt="" />
                        </div>
                        <div>
                            <p className="tweetName" >{this.state.name}</p>
                            <p className="tweetDescription" >{this.state.description}</p>

                        </div>
                    </div>
                    <p className="tweetContent" >{this.state.tweet}</p>
                </Card>
            </div>
        );
    }
}


export default Tweet;