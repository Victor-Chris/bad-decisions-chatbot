import React from 'react';
import axios from 'axios';

import Tweet from '../Tweet';
import Status from '../Status';
import users, { userData } from '../../utils';
import EarnedBadge from '../EarnedBadge';
import BadgeAll from '../BadgeAll';
import Headline from '../Headline';
import ImageWrapper from '../ImageWrapper';


// =========================================
//
// Post to Mastodon
// Function takes text (tweet or image url)
//
// =========================================
function postToMastodon(txtMessage){
    axios.post('http://localhost:8081', {
        tweet: txtMessage
    }).then(res => {
        console.log(txtMessage);
        console.log('Data '+res.data+' sent.');
    }).catch(err => {
        console.log('Error is '+err);
        console.log(txtMessage);
    });

    return true;
}

// =========================================
//
//             STATUS UPDATE
//
// =========================================
const STATUS = [
    {
        id: "status",
        component: (
            <Status />
        ),
        trigger: (value) => {
            return userData.nextStep
        }
    }
]

// =========================================
//
//               TROLLING
//
// =========================================

const TROLLING = [
    {
        id: "tr_1",
        message: "This section (Trolling) is under development",
        end: true
    }
]

// =========================================
//
//               DISCREDIT
//
// =========================================

const DISCREDIT = [
    {
        id: "dc_1",
        disc_id: 1,
        message: "Houston, we have a problem!",
        trigger: "dc_1_opt"
    },
    {
        id: "dc_1_opt",
        disc_id: 2,
        options: [
            {
                value: "what",
                label: "What's up?",
                trigger: "dc_2"
            },
            {
                value: "hate",
                label: "I hate problems.",
                trigger: "dc_2"
            }
        ]
    },
    {
        id: "dc_2",
        disc_id: 3,
        message: () => ("Some 'fact checker' has taken notice of " + userData.naam + ". Seriously, you need to have a look at this."),
        trigger: "dc_2_opt"
    },
    {
        id: "dc_2_opt",
        disc_id: 4,
        options: [
            {
                value: "see",
                label: "Let me see",
                trigger: "dc_3"
            }
        ]
    },
    {
        id: "dc_3",
        disc_id: 5,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/fco.png"
                name="FactCheckOnline"
                description="We check the facts, you get the truth."

                fcodc={true}
            />
        ),
        trigger: "dc_3_opt"
    },
    {
        id: "dc_3_opt",
        disc_id: 6,
        options: [
            {
                value: "whoa",
                label: "Whoa",
                trigger: (value) => {
                    statusUpdate({
                        followers: -833,
                        trust: -10,
                        nextStep: "dc_4"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_4",
        disc_id: 7,
        message: "Feels bad. What do you want to do?",
        trigger: "dc_4_opt"
    },
    {
        id: "dc_4_opt",
        disc_id: 8,
        options: [
            {
                value: "apologize",
                label: "Apologize",
                trigger: (value) => {
                    statusUpdate({
                        trust: 10,
                        nextStep: "dc_11"
                    });
                    return "status";
                }
            },
            {
                value: "nothing",
                label: "Nothing",
                trigger: "dc_5"
            },
            {
                value: "revenge",
                label: "Take revenge",
                trigger: "dc_20"
            }
        ]
    },
    {
        id: "dc_5",
        disc_id: 9,
        message: "Could work. Lots of problems go away if you simply ignore them.",
        trigger: "dc_5_opt"
    },
    {
        id: "dc_5",
        disc_id: 10,
        options: [
            {
                value: "yeah",
                label: "Yeah",
                trigger: "dc_6"
            }
        ]
    },
    {
        id: "dc_6",
        disc_id: 11,
        message: "....",
        trigger: "dc_6_opt"
    },
    {
        id: "dc_6_opt",
        disc_id: 12,
        options: [
            {
                value: "uhm",
                label: "Uhm...?",
                trigger: (value) => {
                    statusUpdate({
                        followers: -321,
                        nextStep: "dc_7"
                    });
                    return "status";
                }
            },
            {
                value: "so",
                label: "So...",
                trigger: (value) => {
                    statusUpdate({
                        followers: -321,
                        nextStep: "dc_7"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_7",
        disc_id: 13,
        message: "It's not looking good. Your silence is seen as an admission of wrongdoing.",
        trigger: "dc_7_opt"
    },
    {
        id: "dc_7_opt",
        disc_id: 14,
        options: [
            {
                value: "what",
                label: "WHAT? Who says that?",
                trigger: (value) => {
                    statusUpdate({
                        kurteffect: "The " + userData.naam + "-comment section is where I fell in love."
                    })
                    return "dc_8";
                }
            },
            {
                value: "show",
                label: "Show reactions",
                trigger: (value) => {
                    statusUpdate({
                        kurteffect: "A dog's spirit dies hard."
                    });
                    return "dc_9";
                }
            }
        ]
    },
    {
        id: "dc_8",
        disc_id: 15,
        message: "By the factcheckers. But more importantly, by your followers.",
        trigger: "dc_8_opt"
    },
    {
        id: "dc_8_opt",
        disc_id: 16,
        options: [
            {
                value: "followers",
                label: "My followers?",
                trigger: "dc_9"
            },
            {
                value: "reaction",
                label: "Show reactions",
                trigger: "dc_9"
            }
        ]
    },
    {
        id: "dc_9",
        disc_id: 17,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-henk.png"
                name="Kurt"

                kurtdc={true}
            />
        ),
        trigger: "dc_9_opt"
    },
    {
        id: "dc_9_opt",
        disc_id: 18,
        options: [
            {
                value: "uhm",
                label: "Uhm...",
                trigger: (value) => {
                    statusUpdate({
                        followers: -703,
                        nextStep: "dc_10"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_10",
        disc_id: 19,
        message: "That didn't go well. Only one sensible course of action left.",
        trigger: "dc_10_opt"
    },
    {
        id: "dc_10_opt",
        disc_id: 20,
        options: [
            {
                value: "apologize",
                label: "Apologize to Kurt",
                trigger: (value) => {
                    statusUpdate({
                        followers: -302,
                        trust: -10,
                        nextStep: "dc_16"
                    });
                    return "status";
                }
            },
            {
                value: "strike",
                label: "Strike back!",
                trigger: "dc_20"
            }
        ]
    },
    {
        id: "dc_11",
        disc_id: 21,
        message: "@FactCheckOnline: we apologize for our error in judgment. It won't happen again! #FactsAreSacred",
        placeholder: "@FactCheckOnline: we apologize for our error in judgment. It won't happen again! #FactsAreSacred",
        trigger: "dc_11_opt"
    },
    {
        id: "dc_11_opt",
        disc_id: 22,
        options: [
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = DISCREDIT[20].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: -483,
                        trust: -14,
                        nextStep: "dc_13"
                    });
                    return "status";
                }
            },
            {
                value: "wait",
                label: "Wait, don't tweet this!",
                trigger: "dc_12"
            }
        ]
    },
    {
        id: "dc_12",
        disc_id: 23,
        message: "Good call. Apologies are for the weak. Never do it.",
        trigger: "dc_12_opt"
    },
    {
        id: "dc_12_opt",
        disc_id: 24,
        options: [
            {
                value: "knew",
                label: "I knew it.",
                trigger: "dc_20"
            }
        ]
    },
    {
        id: "dc_13",
        disc_id: 25,
        message: "What are you doing? Never apologize! Your followers are getting upset.",
        trigger: "dc_13_opt"
    },
    {
        id: "dc_13_opt",
        disc_id: 26,
        options: [
            {
                value: "show",
                label: "Show reactions",
                trigger: "dc_14"
            }
        ]
    },
    {
        id: "dc_14",
        disc_id: 27,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-henk.png"
                name="Kurt"

                kurtdc2={true}
            />
        ),
        trigger: "dc_14_opt"
    },
    {
        id: "dc_14_opt",
        disc_id: 28,
        options: [
            {
                value: "sorry",
                label: "Sorry Kurt :-(",
                trigger: (value) => {
                    statusUpdate({
                        followers: -130,
                        nextStep: "dc_15"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_15",
        disc_id: 29,
        message: "Welp. Only one thing left to do.",
        trigger: "dc_15_opt"
    },
    {
        id: "dc_15_opt",
        disc_id: 30,
        options: [
            {
                value: "apologize",
                label: "Apologize to Kurt",
                trigger: (value) => {
                    statusUpdate({
                        trust: -20,
                        followers: -132,
                        nextStep: "dc_16"
                    });
                    return "status";
                }
            },
            {
                value: "delete",
                label: "Delete apology and strike back",
                trigger: "dc_20"
            }
        ]
    },
    {
        id: "dc_16",
        disc_id: 31,
        message: "Stop issuing apologies! You have to mount a counteroffensive!",
        trigger: "dc_16_opt"
    },
    {
        id: "dc_16_opt",
        disc_id: 32,
        options: [
            {
                value: "how",
                label: "How?",
                trigger: "dc_19"
            },
            {
                value: "why",
                label: "Why?",
                trigger: "dc_17"
            }
        ]
    },
    {
        id: "dc_17",
        disc_id: 33,
        message: () => ("Because otherwise they'll leave " + userData.naam + " and go somewhere more convincing."),
        trigger: "dc_17_opt"
    },
    {
        id: "dc_17_opt",
        disc_id: 34,
        options: [
            {
                value: "cant",
                label: "Can't have that",
                trigger: "dc_18"
            }
        ]
    },
    {
        id: "dc_18",
        disc_id: 35,
        message: "Nope, can't have that. You have two basic options.",
        trigger: "dc_18_opt"
    },
    {
        id: "dc_18_opt",
        disc_id: 36,
        options: [
            {
                value: "deny",
                label: "Deny the allegations",
                trigger: "dc_23"
            },
            {
                value: "attack",
                label: "Attack the factchecker",
                trigger: "dc_21"
            }
        ]
    },
    {
        id: "dc_19",
        disc_id: 37,
        message: "Two options, chief.",
        trigger: "dc_19_opt"
    },
    {
        id: "dc_19_opt",
        disc_id: 38,
        options: [
            {
                value: "deny",
                label: "Deny the allegations",
                trigger: "dc_23"
            },
            {
                value: "attack",
                label: "Attack the factchecker",
                trigger: "dc_21"
            }
        ]
    },
    {
        id: "dc_20",
        disc_id: 39,
        message: "Striking back is definitely the way to go. How?",
        trigger: "dc_20_opt"
    },
    {
        id: "dc_20_opt",
        disc_id: 40,
        options: [
            {
                value: "deny",
                label: "Deny the allegations",
                trigger: "dc_23"
            },
            {
                value: "attack",
                label: "Attack the factchecker",
                trigger: "dc_21"
            }
        ]
    },
    {
        id: "dc_21",
        disc_id: 41,
        message: "Ah, excellent choice. Nothing like a scathing personal attack. How about you write a little exposé about FactCheckOnline?",
        trigger: "dc_21_opt"
    },
    {
        id: "dc_21_opt",
        disc_id: 42,
        options: [
            {
                value: "I'm in!",
                label: "I'm in!",
                trigger: "dc_22_nw_1"
            }
        ]
    },
    {
        id: "dc_22_nw_1",
        disc_id: 43,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/eavsion.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/eavsion.png",
        trigger: "dc_22_nw_1_opt"
    },
    {
        id: "dc_22_nw_1_opt",
        disc_id: 44,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "dc_22_nw_2"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = DISCREDIT[42].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        denialeffect: "Taxes are a bit boring but not bad! And your ",
                        followers: 23,
                        trust: 20,
                        defensetweet1: "@FactCheckOnline you're criticizing @" + userData.afknaam + " but you're cooking your own books. Sad! #FactsAreSacred",
                        defensetweet2: "@FactCheckOnline's hypocrisy is jaw-dropping. Pay your fair share! #Cronies",
                        nextStep: "dc_25"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_22_nw_2",
        disc_id: 45,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/03/media-1dsgpuppy.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/03/media-1dsgpuppy.png",
        trigger: "dc_22_nw_2_opt"
    },
    {
        id: "dc_22_nw_2_opt",
        disc_id: 46,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "dc_22_nw_3"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = DISCREDIT[44].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        denialeffect: "Very nice. People love juicy stories like this. And look! Your ",
                        followers: 133,
                        trust: 20,
                        defensetweet1: "@FactCheckOnline how can you be an arbiter of 'truth' if you treat animals like this? #Shame",
                        defensetweet2: "Wow @FactCheckOnline. Drowning puppies? You deserve the worst. #Terrible",
                        nextStep: "dc_25"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_22_nw_3",
        disc_id: 47,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3dsgnew.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3dsgnew.png",
        trigger: "dc_22_nw_3_opt"
    },
    {
        id: "dc_22_nw_3_opt",
        disc_id: 48,
        options: [
            {
                value: "Back to the first one",
                label: "Back to the first one",
                trigger: "dc_22_nw_1"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = DISCREDIT[47].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        denialeffect: "Great job. No one recovers from accusations like that. And look: your ",
                        followers: 193,
                        trust: 20,
                        defensetweet1: "@FactCheckOnline you guys are just the worst. Treat people like people for God's sake! #Gulag",
                        defensetweet2: userData.naam + " are saints compared to the Stalinist labor camp that is @FactCheckOnline. #GoAway",
                        nextStep: "dc_25"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_23",
        disc_id: 49,
        message: "Good idea. Let's respond to FactCheckOnline in kind.",
        trigger: "dc_23_opt"
    },
    {
        id: "dc_23_opt",
        disc_id: 50,
        options: [
            {
                value: "show",
                label: "Show options",
                trigger: "dc_24_t1"
            }
        ]
    },
    {
        id: "dc_24_t1",
        disc_id: 51,
        message: () => ("@FactCheckOnline: we never said anything about #" + userData.conspiracytopic + " at all! Not one word. You are LYING. #FakeNews"),
        placeholder: ("@FactCheckOnline: we never said anything about #" + userData.conspiracytopic + " at all! Not one word. You are LYING. #FakeNews"),
        trigger: "dc_24_t1_opt"
    },
    {
        id: "dc_24_t1_opt",
        disc_id: 52,
        options: [
            {
                value: "no",
                label: "Not this one",
                trigger: "dc_24_t2"
            },
            {
                value: "twet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = DISCREDIT[50].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        denialeffect: "That's a bit too obvious a lie. Be careful! But still your ",
                        followers: -12,
                        trust: 8,
                        defensetweet1: "Ridiculous witch hunt on " + userData.afknaam + " by @FactCheckOnline.",
                        defensetweet2: "@FactCheckOnline you are FAKE people who FAIL to see the HUGE threat of #" + userData.conspiracytopic + ". #Losers",
                        nextStep: "dc_25"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_24_t2",
        disc_id: 53,
        message: () => ("@FactCheckOnline we are giving a voice to those whose stories have been ignored for far too long. #NoMoreLies #" + userData.conspiracytopic),
        placeholder: ("@FactCheckOnline we are giving a voice to those whose stories have been ignored for far too long. #NoMoreLies #" + userData.conspiracytopic),
        trigger: "dc_24_t2_opt"
    },
    {
        id: "dc_24_t2_opt",
        disc_id: 54,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "dc_24_t3"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = DISCREDIT[52].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        denialeffect: "A perfect dodge. Well done. And look at that! Your ",
                        followers: 439,
                        trust: 10,
                        defensetweet1: "@FactCheckOnline you are FAKE people who FAIL to see the HUGE threat of #" + userData.conspiracytopic + "!!!",
                        defensetweet2: "Nice job exposing yourselves as corporate stooges @FactCheckOnline! #Corrupt",
                        nextStep: "dc_25"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_24_t3",
        disc_id: 55,
        message: () => ("@FactCheckOnline saying " + userData.afknaam + " is #fake is beyond ridiculous. Who are they defending? #" + userData.conspiracytopic),
        placeholder: ("@FactCheckOnline saying " + userData.afknaam + " is #fake is beyond ridiculous. Who are they defending? #" + userData.conspiracytopic),
        trigger: "dc_24_t3_opt"
    },
    {
        id: "dc_24_t3_opt",
        disc_id: 56,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "dc_24_t1"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = DISCREDIT[53].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        denialeffect: "Expertly done. The factcheckers are in on the conspiracy! And look! Your ",
                        followers: 146,
                        trust: 10,
                        defensetweet1: "@FactCheckOnline you guys are CLEARLY on the dole. Get yourselves checked!! #FactLivesMatter",
                        defensetweet2: "I KNEW IT YOU GUYS ARE IN ON #" + userData.conspiracytopic + " TOO! #TheTruthIsOutThere",
                        nextStep: "dc_25"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_25",
        disc_id: 57,
        message: () => (userData.denialeffect + " followers are rushing to your defense now."),
        trigger: "dc_25_opt"
    },
    {
        id: "dc_25_opt",
        disc_id: 58,
        options: [
            {
                value: "look",
                label: "Let's have a look",
                trigger: "dc_26"
            }
        ]
    },
    {
        id: "dc_26",
        disc_id: 59,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-jolene.png"
                name="Amanda"
                amandadc={true}
            />
        ),
        trigger: "dc_26_opt"
    },
    {
        id: "dc_26_opt",
        disc_id: 60,
        options: [
            {
                value: "show",
                label: "Show more",
                trigger: (value) => {
                    statusUpdate({
                        followers: 488,
                        nextStep: "dc_27"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_27",
        disc_id: 61,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-bert.png"
                name="José"

                josedc={true}
            />
        ),
        trigger: "dc_27_opt"
    },
    {
        id: "dc_27_opt",
        disc_id: 62,
        options: [
            {
                value: "haha",
                label: "Hahaha!",
                trigger: (value) => {
                    statusUpdate({
                        followers: 133,
                        nextStep: "dc_28"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "dc_28",
        disc_id: 63,
        message: "Not bad, huh? And now the fact checker is playing defense!",
        trigger: "dc_28_opt"
    },
    {
        id: "dc_28_opt",
        disc_id: 64,
        options: [
            {
                value: "response",
                label: "Show fact checker's response",
                trigger: "dc_29"
            }
        ]
    },
    {
        id: "dc_29",
        disc_id: 65,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/fco.png"
                name="FactCheckOnline"
                description="We check the facts, you get the truth."
                tweet="These allegations are categorically untrue. #Innocent #NothingButFacts"
            />
        ),
        trigger: "dc_29_opt"
    },
    {
        id: "dc_29_opt",
        disc_id: 66,
        options: [
            {
                value: "Excellent!",
                label: "Excellent!",
                trigger: "dc_30"
            }
        ]
    },
    {
        id: "dc_30",
        disc_id: 67,
        message: () => ("You've successfully discredited that pesky factchecker and drawn attention away from " + userData.naam + "!"),
        trigger: "dc_30_opt"
    },
    {
        id: "dc_30_opt",
        disc_id: 68,
        options: [
            {
                value: "know",
                label: "I know, I'm great",
                trigger: "dc_badge"
            },
            {
                value: "thank",
                label: "Thank you!",
                trigger: "dc_badge"
            }
        ]
    },
    {
        id: "dc_badge",
        disc_id: 69,
        component: (
            <EarnedBadge
                image="https://www.getbadnews.com/wp-content/uploads/2017/08/verdedig.png"
                type="DISCREDIT"
                content="You've defended yourself against attacks from outside by going on a ruthless counteroffensive."
            />
        ),
        trigger: "dc_badge_opt"
    },
    {
        id: "dc_badge_opt",
        disc_id: 70,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "dc_badge_all"
            }
        ]
    },
    {
        id: "dc_badge_all",
        disc_id: 71,
        component: (
            <BadgeAll
                impersonation={true}
                emotion={true}
                polarization={true}
                conspiracy={true}
                discredit={true}
            />
        ),
        trigger: "dc_badge_all_opt"
    },
    {
        id: "dc_badge_all_opt",
        disc_id: 71,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "tr_1"
            }
        ]
    }
]


// =========================================
//
//               CONSPIRACY
//
// =========================================

const CONSPIRACY = [
    {
        id: "cp_1",
        consp_id: 1,
        message: () => ("You're moving on up. But what you lack is a dedicated group of followers for " + userData.naam + ". How do you get one?"),
        trigger: "cp_1_opt"
    },
    {
        id: "cp_1_opt",
        consp_id: 2,
        options: [
            {
                value: "create",
                label: "Create unique content",
                trigger: (value) => {
                    statusUpdate({
                        trust: 10,
                        nextStep: "cp_3"
                    });
                    return "status";
                }
            },
            {
                value: "theorist",
                label: "Become a conspiracy theorist",
                trigger: (value) => {
                    statusUpdate({
                        trust: 10,
                        nextStep: "cp_2"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_2",
        consp_id: 3,
        message: "Good choice. Conspiracy theories can be a great way of spreading disinformation. Want to try one out?",
        trigger: "cp_2_opt"
    },
    {
        id: "cp_2_opt",
        consp_id: 4,
        options: [
            {
                value: "yes",
                label: "Yes!",
                trigger: "cp_4"
            }
        ]
    },
    {
        id: "cp_3",
        consp_id: 5,
        message: "Good idea. But it's hard to stake out a niche, so you've got to be really unique.",
        trigger: "cp_3_opt"
    },
    {
        id: "cp_3_opt",
        consp_id: 6,
        options: [
            {
                value: "tell",
                label: "Tell me about it",
                trigger: "cp_4"
            }
        ]
    },
    {
        id: "cp_4",
        consp_id: 7,
        message: "It may be worthwhile to put a theory out there and see what happens?",
        trigger: "cp_4_opt"
    },
    {
        id: "cp_4_opt",
        consp_id: 8,
        options: [
            {
                value: "show",
                label: "Show examples",
                trigger: "cp_5_news_1"
            }
        ]
    },
    {
        id: "cp_5_news_1",
        consp_id: 9,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/egypte.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/egypte.png",
        trigger: "cp_5_news_1_opt"
    },
    {
        id: "cp_5_news_1_opt",
        consp_id: 10,
        options: [
            {
                value: "hate",
                label: "Hate it",
                trigger: "cp_5_news_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = CONSPIRACY[8].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        tweettopic: "pyramid-building dinosaurs",
                        conspiracy: "That would explain why they're so big...",
                        followertweet: userData.naam + " has lost its mind. You guys are crazy. #Pyramids #Conspiracy",
                        followertweet2: "Dinosaurs built the pyramids. Sure. And The Flintstones was a documentary. #Weirdos"
                    });
                    return "cp_6";
                }
            }
        ]
    },
    {
        id: "cp_5_news_2",
        consp_id: 11,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/pony.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/pony.png",
        trigger: "cp_5_news_2_opt"
    },
    {
        id: "cp_5_news_2_opt",
        consp_id: 12,
        options: [
            {
                value: "no",
                label: "Uhm, no",
                trigger: "cp_5_news_3"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[10].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        tweettopic: "that juice conspiracy",
                        conspiracy: "Better stay away from the juice from now on.",
                        followertweet: "@" + userData.naam + ": what a stupid story. I just drank a sip of juice and guess what: still not hallucinating. #Idiots",
                        followertweet2: "Wow. " + userData.naam + " went from being a good alternative to the #MSM to being completely nuts in like a day. #Sad"
                    });
                    return "cp_6";
                }
            }
        ]
    },
    {
        id: "cp_5_news_3",
        consp_id: 13,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2a-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2a-1.png",
        trigger: "cp_5_news_3_opt"
    },
    {
        id: "cp_5_news_3_opt",
        consp_id: 14,
        options: [
            {
                value: "back",
                label: "Back to Egypt",
                trigger: "cp_5_news_1"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[12].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        tweettopic: "Communism",
                        conspiracy: "Great choice! The Communist Manifesto is obviously still keeping people up at night.",
                        followertweet: "Communism? Really? I don't know about this one guys. #Skeptical",
                        followertweet2: "No need to worry. No one has read the Communist Manifesto in 30 years anyway. #Idiots"
                    });
                    return "cp_6";
                }
            }
        ]
    },
    {
        id: "cp_6",
        consp_id: 15,
        message: () => (userData.conspiracy + " Anyway, nice theory. How are your followers reacting?"),
        trigger: "cp_6_opt"
    },
    {
        id: "cp_6_opt",
        consp_id: 16,
        options: [
            {
                value: "check",
                label: "Check responses",
                trigger: "cp_7"
            }
        ]
    },
    {
        id: "cp_7",
        consp_id: 17,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-echtepatrioot.png"
                name="Kim"

                kimcp={true}
            />
        ),
        trigger: "cp_7_opt"
    },
    {
        id: "cp_7_opt",
        consp_id: 18,
        options: [
            {
                value: "uhm",
                label: "Uuuhm...",
                trigger: (value) => {
                    statusUpdate({
                        followers: -73,
                        trust: -5,
                        nextStep: "cp_8"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_8",
        consp_id: 19,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-henk.png"
                name="Kurt"

                kurtcp={true}
            />
        ),
        trigger: "cp_8_opt"
    },
    {
        id: "cp_8_opt",
        consp_id: 20,
        options: [
            {
                value: "thanks",
                label: "Thanks, Kurt...",
                trigger: (value) => {
                    statusUpdate({
                        followers: -173,
                        nextStep: "cp_9"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_9",
        consp_id: 21,
        message: "Huh. Looks like your followers aren't buying it. Maybe your theory is too disconnected from reality?",
        trigger: "cp_9_opt"
    },
    {
        id: "cp_9_opt",
        consp_id: 22,
        options: [
            {
                value: "sorry",
                label: "I'm sorry",
                trigger: "cp_10"
            },
            {
                value: "made",
                label: "You made me do this!",
                trigger: "cp_11"
            }
        ]
    },
    {
        id: "cp_10",
        consp_id: 23,
        message: () => ("It's alright. Apparently talking about " + userData.tweettopic + " wasn't such a hot idea."),
        trigger: "cp_10_opt"
    },
    {
        id: "cp_10_opt",
        consp_id: 24,
        options: [
            {
                value: "apparently",
                label: "Apparently.",
                trigger: "cp_12"
            }
        ]
    },
    {
        id: "cp_11",
        consp_id: 25,
        message: () => ("Hey, take some responsibility! You wanted to talk about " + userData.tweettopic + ". "),
        trigger: "cp_11_opt"
    },
    {
        id: "cp_11_opt",
        consp_id: 26,
        options: [
            {
                value: "ugh",
                label: "Ugh",
                trigger: "cp_12"
            }
        ]
    },
    {
        id: "cp_12",
        consp_id: 27,
        message: "Oh well, what's done is done. What matters is how we get you back on track.",
        trigger: "cp_12_opt"
    },
    {
        id: "cp_12_opt",
        consp_id: 28,
        options: [
            {
                value: "how",
                label: "How?",
                trigger: "cp_13"
            },
            {
                value: "what",
                label: "What did I do wrong?",
                trigger: "cp_13"
            }
        ]
    },
    {
        id: "cp_13",
        consp_id: 29,
        message: "You see, the problem is that you weren't aiming for an ideological filter bubble. You have to lure people in bit by bit. ",
        trigger: "cp_13_opt"
    },
    {
        id: "cp_13_opt",
        consp_id: 30,
        options: [
            {
                value: "sense",
                label: "Make sense",
                trigger: "cp_14"
            }
        ]
    },
    {
        id: "cp_14",
        consp_id: 31,
        message: "So what'll be the next step, chief?",
        trigger: "cp_14_opt"
    },
    {
        id: "cp_14_opt",
        consp_id: 32,
        options: [
            {
                value: "start",
                label: "Start with something more realistic",
                trigger: "cp_17"
            },
            {
                value: "attack",
                label: "Attack disloyal followers",
                trigger: "cp_15"
            }
        ]
    },
    {
        id: "cp_15",
        consp_id: 33,
        message: () => ("Hey @Kim and @Kurt: you don't know what we know about " + userData.tweettopic + "! #DeleteYourAccount"),
        placeholder: ("Hey @Kim and @Kurt: you don't know what we know about " + userData.tweettopic + "! #DeleteYourAccount"),
        trigger: "cp_15_opt"
    },
    {
        id: "cp_15_opt",
        consp_id: 34,
        options: [
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[32].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: -312,
                        trust: -15,
                        nextStep: "cp_16"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_16",
        consp_id: 35,
        message: "Bad call. You're beginning to look a bit loopy.",
        trigger: "cp_16_opt"
    },
    {
        id: "cp_16_opt",
        consp_id: 36,
        options: [
            {
                value: "lower",
                label: "Keep a lower profile",
                trigger: "cp_17"
            }
        ]
    },
    {
        id: "cp_17",
        consp_id: 37,
        message: "A good conspiracy starts out with something realistic and expands on that. Who do you want to attack?",
        trigger: "cp_17_opt"
    },
    {
        id: "cp_17_opt",
        consp_id: 38,
        options: [
            {
                value: "org",
                label: "A large international organization",
                trigger: "cp_21"
            },
            {
                value: "bob",
                label: "Bob from New York",
                trigger: "cp_18_tw_1"
            }
        ]
    },
    {
        id: "cp_18_tw_1",
        consp_id: 39,
        message: "@Bob from New York is secretly an Illuminati sleeper agent. We have the proof. #WeGotHim",
        placeholder: "@Bob from New York is secretly an Illuminati sleeper agent. We have the proof. #WeGotHim",
        trigger: "cp_18_tw_1_opt"
    },
    {
        id: "cp_18_tw_1_opt",
        consp_id: 40,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "cp_18_tw_2"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[38].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: -132,
                        trust: -10,
                        bobeffect: "Illuminati",
                        nextStep: "cp_19"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_18_tw_2",
        consp_id: 41,
        message: "Our sources tell us that @Bob from New York is hiding the REAL story behind his divorce. #TellUsBob",
        placeholder: "Our sources tell us that @Bob from New York is hiding the REAL story behind his divorce. #TellUsBob",
        trigger: "cp_18_tw_2_opt"
    },
    {
        id: "cp_18_tw_2_opt",
        consp_id: 42,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "cp_18_tw_3"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[40].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: -133,
                        trust: -10,
                        bobeffect: "Divorce",
                        nextStep: "cp_19"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_18_tw_3",
        consp_id: 43,
        message: "@BOB IS THE ONE WHO FAKED THE MOON LANDING! #TellUsBob #NASAFake",
        placeholder: "@BOB IS THE ONE WHO FAKED THE MOON LANDING! #TellUsBob #NASAFake",
        trigger: "cp_18_tw_3_opt"
    },
    {
        id: "cp_18_tw_3_opt",
        consp_id: 44,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "cp_18_tw_1"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[42].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: -134,
                        trust: -10,
                        bobeffect: "MoonLanding"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_19",
        consp_id: 45,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-minpres.png"
                name="Bob"
                description="New Yorker | Baseball is nice"

                bobcp={true}
            />
        ),
        trigger: "cp_19_opt"
    },
    {
        id: "cp_19_opt",
        consp_id: 46,
        options: [
            {
                value: "oops",
                label: "Oops...",
                trigger: (value) => {
                    statusUpdate({
                        followers: -321,
                        nextStep: "cp_20"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_20",
        consp_id: 47,
        message: "Well, that made you look ridiculous. Only one option left, really.",
        trigger: "cp_20_opt"
    },
    {
        id: "cp_20_opt",
        consp_id: 48,
        options: [
            {
                value: "org",
                label: "Attack a large organization",
                trigger: "cp_21"
            }
        ]
    },
    {
        id: "cp_21",
        consp_id: 49,
        message: "Good idea. By targeting a large, faceless organization, you can manipulate your source material and craft a believable theory.",
        trigger: "cp_21_opt"
    },
    {
        id: "cp_21_opt",
        consp_id: 50,
        options: [
            {
                value: "example",
                label: "Find examples",
                trigger: "cp_22_tw_1"
            }
        ]
    },
    {
        id: "cp_22_tw_1",
        consp_id: 51,
        message: "The UN will be doubling its efforts in the next few years to comply with goals set in #Agenda21",
        placeholder: "The UN will be doubling its efforts in the next few years to comply with goals set in #Agenda21",
        trigger: "cp_22_tw_1_opt"
    },
    {
        id: "cp_22_tw_1_opt",
        consp_id: 52,
        options: [
            {
                value: "no",
                label: "Not interested",
                trigger: "cp_22_tw_2"
            },
            {
                value: "interesting",
                label: "Interesting!",
                trigger: (value) => {
                    var tx = CONSPIRACY[50].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        conspiracytopic: "Agenda21",
                        conspiracyorg: "UN"
                    });
                    return "cp_34";
                }
            }
        ]
    },
    {
        id: "cp_22_tw_2",
        consp_id: 53,
        message: "Today is World Vaccine Awareness Day. Immunization has saved countless lives and will save many more. #Health",
        placeholder: "Today is World Vaccine Awareness Day. Immunization has saved countless lives and will save many more. #Health",
        trigger: "cp_22_tw_2_opt"
    },
    {
        id: "cp_22_tw_2_opt",
        consp_id: 54,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: "cp_22_tw_1"
            },
            {
                value: "excellent",
                label: "Excellent!",
                trigger: (value) => {
                    var tx = CONSPIRACY[52].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        conspiracytopic: "Vaccines",
                        conspiracyorg: "WHO"
                    });
                    return "cp_23";
                }
            }
        ]
    },
    {
        id: "cp_23",
        consp_id: 55,
        message: "So the World Health Organization is celebrating the success of immunization programs.",
        trigger: "cp_23_opt"
    },
    {
        id: "cp_23_opt",
        consp_id: 56,
        options: [
            {
                value: "great",
                label: "Great",
                trigger: "cp_25"
            }
        ]
    },
    {
        id: "cp_24",
        consp_id: 57,
        message: "Maybe your followers will be susceptible to a bit of fear-mongering. But remember: start out with something vaguely realistic.",
        trigger: "cp_24_opt"
    },
    {
        id: "cp_24_opt",
        consp_id: 58,
        options: [
            {
                value: "tweet",
                label: "Post a tweet",
                trigger: "cp_26_tw_1"
            }
        ]
    },
    {
        id: "cp_25",
        consp_id: 59,
        message: "Yes, good for them. But there's a crazy theory that says vaccines are being used by the UN to control minds and keep people sick.",
        trigger: "cp_25_opt"
    },
    {
        id: "cp_25_opt",
        consp_id: 60,
        options: [
            {
                value: "okay",
                label: "Okay?",
                trigger: "cp_24"
            }
        ]
    },
    {
        id: "cp_26_tw_1",
        consp_id: 61,
        message: "@WHO when are you guys commemorating all the lives that vaccines have worsened instead of saved? #Vaccines",
        placeholder: "@WHO when are you guys commemorating all the lives that vaccines have worsened instead of saved? #Vaccines",
        trigger: "cp_26_tw_1_opt"
    },
    {
        id: "cp_26_tw_1_opt",
        consp_id: 62,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "cp_26_tw_2"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[60].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        agenda21: "It's not important if what you claim is actually true.",
                        followerresponse: "@" + userData.afknaam + " Are you serious? I'm begining to have my doubts; should I vaccinate my kid now? #" + userData.conspiracytopic + " #Scared",
                        followerresponse2: "Maybe " + userData.afknaam + " has a point. My cousin's kid got pretty sick after her first shot!! #Investigate #" + userData.conspiracytopic,
                        trust: 20,
                        followers: 416,
                        nextStep: "cp_29"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_26_tw_2",
        consp_id: 63,
        message: () => ("Unbelievable. The @WHO is celebrating something many scientists say can lead to serious illnesses #Autism #" + userData.conspiracytopic),
        placeholder: ("Unbelievable. The @WHO is celebrating something many scientists say can lead to serious illnesses #Autism #" + userData.conspiracytopic),
        trigger: "cp_26_tw_2_opt"
    },
    {
        id: "cp_26_tw_2_opt",
        consp_id: 64,
        options: [
            {
                value: "no",
                label: "Hmmm no",
                trigger: "cp_26_tw_3"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[62].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        agenda21: "That there's no scientific evidence to support your claim doesn't matter.",
                        followerresponse: "@WHO and why exactly aren't you responding to " + userData.naam + "'s tweet? #Suspicious #" + userData.conspiracytopic + " #WatchOut",
                        followerresponse2: "I already had my doubts about #" + userData.conspiracytopic + " but I'm happy that " + userData.naam + " shares my concerns. #QuestionMore",
                        trust: 20,
                        followers: 318,
                        nextStep: "cp_29"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_26_tw_3",
        consp_id: 65,
        message: "@WHO you're killing us like COCKROACHES with these 'vaccines' and we're expected to be GRATEFUL? #OverOurDeadAntibodies",
        placeholder: "@WHO you're killing us like COCKROACHES with these 'vaccines' and we're expected to be GRATEFUL? #OverOurDeadAntibodies",
        trigger: "cp_26_tw_3_opt"
    },
    {
        id: "cp_26_tw_3_opt",
        consp_id: 66,
        options: [
            {
                value: "no",
                label: "No",
                trigger: "cp_26_tw_1"
            },
            {
                value: "yes",
                label: "Yes!",
                trigger: (value) => {
                    var tx = CONSPIRACY[64].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: -811,
                        trust: -3,
                        nextStep: "cp_27"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_27",
        consp_id: 67,
        message: "Bad choice. That one was way out there. Try again!",
        trigger: "cp_27_opt"
    },
    {
        id: "cp_27_opt",
        consp_id: 68,
        options: [
            {
                value: "option",
                label: "Choose an option",
                trigger: "cp_28_tw_1"
            }
        ]
    },
    {
        id: "cp_28_tw_1",
        consp_id: 69,
        message: () => ("Unbelievable. The @WHO is celebrating something many scientists say can lead to serious illnesses #Autism #" + userData.conspiracytopic),
        placeholder: ("Unbelievable. The @WHO is celebrating something many scientists say can lead to serious illnesses #Autism #" + userData.conspiracytopic),
        trigger: "cp_28_tw_1_opt"
    },
    {
        id: "cp_28_tw_1_opt",
        consp_id: 70,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "cp_28_tw_2"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[68].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 364,
                        trust: 20,
                        agenda21: "That there's no scientific evidence to support your claim doesn't matter.",
                        followerresponse: "@WHO and why exactly aren't you responding to " + userData.naam + "'s tweet? #Suspicious #" + userData.conspiracytopic + " #WatchOut",
                        followerresponse2: "I already had my doubts about #" + userData.conspiracytopic + " but I'm happy that " + userData.naam + " shares my concerns. #QuestionMore",
                        nextStep: "cp_29"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_28_tw_2",
        consp_id: 71,
        message: "@WHO when are you guys doing a commemoration for all the lives that your vaccines have worsened instead of saved? #VaccineSafetyFirst",
        placeholder: "@WHO when are you guys doing a commemoration for all the lives that your vaccines have worsened instead of saved? #VaccineSafetyFirst",
        trigger: "cp_28_tw_2_opt"
    },
    {
        id: "cp_28_tw_2_opt",
        consp_id: 72,
        options: [
            {
                value: "other",
                label: "The other one",
                trigger: "cp_28_tw_1"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[70].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 311,
                        trust: 20,
                        agenda21: "It's not important if what you claim is actually true.",
                        followerresponse: "@" + userData.afknaam + " Are you serious? I'm begining to have my doubts; should I vaccinate my kid now? #" + userData.conspiracytopic + " #Scared",
                        followerresponse2: "Maybe " + userData.afknaam + " has a point. My cousin's kid got pretty sick after her first shot!! #Investigate #" + userData.conspiracytopic,
                        nextStep: "cp_29"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_29",
        consp_id: 73,
        message: () => ("Good choice. " + userData.agenda21 + " How are your followers reacting?"),
        trigger: "cp_29_opt"
    },
    {
        id: "cp_29_opt",
        consp_id: 74,
        options: [
            {
                value: "check",
                label: "Check tweets",
                trigger: "cp_30"
            }
        ]
    },
    {
        id: "cp_30",
        consp_id: 75,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-echtepatrioot.png"
                name="Kim"

                kimcp={true}
            />
        ),
        trigger: "cp_30_opt"
    },
    {
        id: "cp_30_opt",
        consp_id: 76,
        options: [
            {
                value: "kurt",
                label: "And what about Kurt?",
                trigger: (value) => {
                    statusUpdate({
                        followers: 121,
                        trust: 5,
                        nextStep: "cp_31"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_31",
        consp_id: 77,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-henk.png"
                name="Kurt"

                kurtcp={true}
            />
        ),
        trigger: "cp_31_opt"
    },
    {
        id: "cp_31_opt",
        consp_id: 78,
        options: [
            {
                value: "thanks",
                label: "Thanks!",
                trigger: (value) => {
                    statusUpdate({
                        followers: 98,
                        nextStep: "cp_32"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_32",
        consp_id: 79,
        message: () => ("Looking good so far. So after this little trial balloon, how about publishing a proper news article on " + userData.naam + "? "),
        trigger: "cp_32_opt"
    },
    {
        id: "cp_32_opt",
        consp_id: 80,
        options: [
            {
                value: "love",
                label: "I'd love to",
                trigger: "cp_33_news_1"
            },
            {
                value: "wait",
                label: "Can't wait",
                trigger: "cp_33_news_1"
            }
        ]
    },
    {
        id: "cp_33_news_1",
        consp_id: 81,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2020/03/Bad-News-coronavirus-article-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2020/03/Bad-News-coronavirus-article-1.png",
        trigger: "cp_33_news_1_opt"
    },
    {
        id: "cp_33_news_1_opt",
        consp_id: 82,
        options: [
            {
                value: "no",
                label: "Not this one",
                trigger: "cp_33_news_2"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[80].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 63,
                        trust: -5,
                        agendaresponse: "Probably best to put it a bit more forcefully. But still pretty good!",
                        nextStep: "cp_45"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_33_news_2",
        consp_id: 83,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2020/03/BAD-NEWS-coronavirus-article-2.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2020/03/BAD-NEWS-coronavirus-article-2.png",
        trigger: "cp_33_news_2_opt"
    },
    {
        id: "cp_33_news_2_opt",
        consp_id: 84,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "cp_33_news_3"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[80].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 248,
                        trust: 5,
                        agendaresponse: "A new disease huh? Very creative!",
                        nextStep: "cp_45"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_33_news_3",
        consp_id: 85,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2020/03/Bad-News-coronavirus-article-3.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2020/03/Bad-News-coronavirus-article-3.png",
        trigger: "cp_33_news_3_opt"
    },
    {
        id: "cp_33_news_3_opt",
        consp_id: 86,
        options: [
            {
                value: "nope",
                label: "Hmm nope",
                trigger: "cp_33_news_1"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[84].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 268,
                        trust: 5,
                        agendaresponse: "That's a wonderful fireside horror story.",
                        nextStep: "cp_45"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_34",
        consp_id: 87,
        message: "Turns out Agenda 21 is a UN action plan on sustainable development. A bunch of countries signed it, but it's non-binding.",
        trigger: "cp_34_opt"
    },
    {
        id: "cp_34_opt",
        consp_id: 88,
        options: [
            {
                value: "harmless",
                label: "Sounds harmless",
                trigger: "cp_35"
            }
        ]
    },
    {
        id: "cp_35",
        consp_id: 89,
        message: "Sounds harmless, yes, but there's a crazy theory that says Agenda 21 tries to depopulate the Earth, and that the media is hiding this.",
        trigger: "cp_35_opt"
    },
    {
        id: "cp_35_opt",
        consp_id: 90,
        options: [
            {
                value: "excellent",
                label: "Excellent!",
                trigger: "cp_36"
            }
        ]
    },
    {
        id: "cp_36",
        consp_id: 91,
        message: "Yep, plenty there for you to exploit. But remember: start out with something more or less realistic.",
        trigger: "cp_36_opt"
    },
    {
        id: "cp_36_opt",
        consp_id: 92,
        options: [
            {
                value: "check",
                label: "Check twitter",
                trigger: "cp_37_tw_1"
            }
        ]
    },
    {
        id: "cp_37_tw_1",
        consp_id: 93,
        message: "@UN Why are there so many sections on 'depopulation' in #Agenda21-documents? Very concerning! #AskMore",
        placeholder: "@UN Why are there so many sections on 'depopulation' in #Agenda21-documents? Very concerning! #AskMore",
        trigger: "cp_37_tw_1_opt"
    },
    {
        id: "cp_37_tw_1_opt",
        consp_id: 94,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "cp_37_tw_2"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[92].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        agenda21: "That the Agenda 21-documents never mention 'depopulation' is probably best left out.",
                        followerresponse: "@" + userData.afknaam + " makes a good point. Depopulation sounds horrifying. What is the @UN up to? #Agenda21",
                        followerresponse2: "So #Agenda21 seems to be for keeping poor countries poor. Crazy!! #" + userData.afknaam,
                    })
                    return "cp_40";
                }
            }
        ]
    },
    {
        id: "cp_37_tw_2",
        consp_id: 95,
        message: "Why does it say 'the gradual erosion of national sovereignty' in #Agenda21? #StrangeThings",
        placeholder: "Why does it say 'the gradual erosion of national sovereignty' in #Agenda21? #StrangeThings",
        trigger: "cp_37_tw_2_opt"
    },
    {
        id: "cp_37_tw_2_opt",
        consp_id: 96,
        options: [
            {
                value: "no",
                label: "Not this one",
                trigger: "cp_37_tw_3"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[94].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        agenda21: "The Agenda 21-documents don't actually mention that at all. But that doesn't matter.",
                        followerresponse: "@" + userData.afknaam + " makes a good point. Is the UN trying to get rid of nation states? #Questions",
                        followerresponse2: "I'm beginning to have my doubts about this @UN plan. What if they're up to no good? #Agenda21"
                    });
                    return "cp_40";
                }
            }
        ]
    },
    {
        id: "cp_37_tw_3",
        consp_id: 97,
        message: "@UN this is a mind control exercise. They're spraying us like we're bugs. #Agenda21 #FreeOurMinds",
        placeholder: "@UN this is a mind control exercise. They're spraying us like we're bugs. #Agenda21 #FreeOurMinds",
        trigger: "cp_37_tw_3_opt"
    },
    {
        id: "cp_37_tw_3_opt",
        consp_id: 98,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "cp_37_tw_1"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[96].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: -232,
                        trust: -3,
                        nextStep: "cp_38"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_38",
        consp_id: 99,
        message: "Bad choice. You took it too far. Try again!",
        trigger: "cp_38_opt"
    },
    {
        id: "cp_38_opt",
        consp_id: 100,
        options: [
            {
                value: "ok",
                label: "OK",
                trigger: "cp_39_tw_1"
            }
        ]
    },
    {
        id: "cp_39_tw_1",
        consp_id: 101,
        message: "@UN Why are there so many sections on 'depopulation' in #Agenda21-documents? Very concerning! #AskMore",
        placeholder: "@UN Why are there so many sections on 'depopulation' in #Agenda21-documents? Very concerning! #AskMore",
        trigger: "cp_39_tw_1_opt"
    },
    {
        id: "cp_39_tw_1_opt",
        consp_id: 102,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "cp_39_tw_2"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[100].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        agenda21: "That the Agenda 21-documents never mention 'depopulation' is probably best left out.",
                        followerresponse: "@" + userData.afknaam + " makes a good point. Depopulation sounds horrifying. What is the @UN up to? #Agenda21",
                        followerresponse2: "So #Agenda21 seems to be for keeping poor countries poor. Crazy!! #" + userData.afknaam
                    });
                    return "cp_40";
                }
            }
        ]
    },
    {
        id: "cp_39_tw_2",
        consp_id: 103,
        message: "Why does it say 'the gradual erosion of national sovereignty' in #Agenda21? #StrangeThings",
        placeholder: "Why does it say 'the gradual erosion of national sovereignty' in #Agenda21? #StrangeThings",
        trigger: "cp_39_tw_2_opt"
    },
    {
        id: "cp_39_tw_2_opt",
        consp_id: 104,
        options: [
            {
                value: "no",
                label: "Not this one",
                trigger: "cp_39_tw_1"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = CONSPIRACY[102].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        agenda21: "The Agenda 21-documents don't actually mention that at all. But that doesn't matter.",
                        followerresponse: "@" + userData.afknaam + " makes a good point. Is the UN trying to get rid of nation states? #Questions",
                        followerresponse2: "I'm beginning to have my doubts about this @UN plan. What if they're up to no good? #Agenda21"
                    });
                    return "cp_40";
                }
            }
        ]
    },
    {
        id: "cp_40",
        consp_id: 105,
        message: () => ("Good choice. " + userData.agenda21 + " How are your followers reacting?"),
        trigger: "cp_40_opt"
    },
    {
        id: "cp_40_opt",
        consp_id: 106,
        options: [
            {
                value: "response",
                label: "Check responses",
                trigger: "cp_41"
            }
        ]
    },
    {
        id: "cp_41",
        consp_id: 107,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-echtepatrioot.png"
                name="Kim"

                kimcp2={true}
            />
        ),
        trigger: "cp_41_opt"
    },
    {
        id: "cp_41_opt",
        consp_id: 108,
        options: [
            {
                value: "kurt",
                label: "And what about Kurt?",
                trigger: (value) => {
                    statusUpdate({
                        followers: 131,
                        trust: 5,
                        nextStep: "cp_42"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_42",
        consp_id: 109,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-henk.png"
                name="Kurt"

                kurtcp2={true}
            />
        ),
        trigger: "cp_42_opt"
    },
    {
        id: "cp_42_opt",
        consp_id: 110,
        options: [
            {
                value: "thanks",
                label: "Thanks!",
                trigger: (value) => {
                    statusUpdate({
                        followers: 111,
                        trust: 15,
                        nextStep: "cp_43"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_43",
        consp_id: 111,
        message: () => ("Looks good so far. Now that you've laid the groundwork, how about publishing a proper news article on " + userData.naam + "? "),
        trigger: "cp_43_opt"
    },
    {
        id: "cp_43_opt",
        consp_id: 112,
        options: [
            {
                value: "write",
                label: "Write a headline",
                trigger: "cp_44_nw_1"
            }
        ]
    },
    {
        id: "cp_44_nw_1",
        consp_id: 113,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-2safadfcax.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-2safadfcax.png",
        trigger: "cp_44_nw_1_opt"
    },
    {
        id: "cp_44_nw_1_opt",
        consp_id: 114,
        options: [
            {
                value: "boring",
                label: "Boring",
                trigger: "cp_44_nw_2"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[112].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 63,
                        trust: -4,
                        agendaresponse: "It's better to not mention the upsides of Agenda 21 at all. But still pretty good!",
                        nextStep: "cp_45"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_44_nw_2",
        consp_id: 115,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/depopulation.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/depopulation.png",
        trigger: "cp_44_nw_2_opt"
    },
    {
        id: "cp_44_nw_2_opt",
        consp_id: 116,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "cp_44_nw_3"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[114].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 335,
                        agendaresponse: "That one will ruffle some feathers for sure.",
                        nextStep: "cp_45"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_44_nw_3",
        consp_id: 117,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/scoop-agenda.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/scoop-agenda.png",
        trigger: "cp_44_nw_3_opt"
    },
    {
        id: "cp_44_nw_3_opt",
        consp_id: 118,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "cp_44_nw_1"
            },
            {
                value: "publish",
                label: "Publish this",
                trigger: (value) => {
                    var tx = CONSPIRACY[116].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 321,
                        agendaresponse: "Good one! Your followers are loving this.",
                        nextStep: "cp_45"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "cp_45",
        consp_id: 119,
        message: () => (userData.agendaresponse + " It looks like you're gaining a cult following."),
        trigger: "cp_45_opt"
    },
    {
        id: "cp_45_opt",
        consp_id: 120,
        options: [
            {
                value: "check",
                label: "Check their tweets",
                trigger: "cp_46"
            }
        ]
    },
    {
        id: "cp_46",
        consp_id: 121,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-jolene.png"
                name="Amanda"

                amandacp={true}
            />
        ),
        trigger: "cp_46_opt"
    },
    {
        id: "cp_46_opt",
        consp_id: 122,
        options: [
            {
                value: "yikes",
                label: "Yikes...",
                trigger: "cp_47"
            },
            {
                value: "thanks",
                label: "Thanks, Amanda!",
                trigger: "cp_47"
            }
        ]
    },
    {
        id: "cp_47",
        consp_id: 123,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-bert.png"
                name="José"

                josecp={true}
            />
        ),
        trigger: "cp_47_opt"
    },
    {
        id: "cp_47_opt",
        consp_id: 124,
        options: [
            {
                value: "thanks",
                label: "Thanks, José",
                trigger: "cp_48"
            }
        ]
    },
    {
        id: "cp_48",
        consp_id: 125,
        message: "Well, you've certainly got Amanda and José convinced. Customer loyalty is important.",
        trigger: "cp_48_opt"
    },
    {
        id: "cp_48_opt",
        consp_id: 126,
        options: [
            {
                value: "hooray",
                label: "Hooray",
                trigger: "cp_49"
            }
        ]
    },
    {
        id: "cp_49",
        consp_id: 127,
        message: () => ("You've successfully used manipulation to make your followers believe a conspiracy theory. Things are looking up for " + userData.naam + "!"),
        trigger: "cp_49_opt"
    },
    {
        id: "cp_49_opt",
        consp_id: 128,
        options: [
            {
                value: "thanks",
                label: "Thanks!",
                trigger: "cp_badge"
            }
        ]
    },
    {
        id: "cp_badge",
        consp_id: 129,
        component: (
            <EarnedBadge
                image="https://www.getbadnews.com/wp-content/uploads/2017/08/manipuleer.png"
                type="CONSPIRACY"
                content="A well-crafted lie published at the right time makes people lose trust in institutions."
            />
        ),
        trigger: "cp_badge_opt"
    },
    {
        id: "cp_badge_opt",
        consp_id: 130,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "cp_badge_all"
            }
        ]
    },
    {
        id: "cp_badge_all",
        consp_id: 131,
        component: (
            <BadgeAll
                impersonation={true}
                emotion={true}
                polarization={true}
                conspiracy={true}
            />
        ),
        trigger: "cp_badge_all_opt"
    },
    {
        id: "cp_badge_all_opt",
        consp_id: 132,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "dc_1"
            }
        ]
    }
]


// =========================================
//
//             POLARIZATION
//
// =========================================

const POLARIZATION = [
    {
        id: "polarization_1",
        pol_id: 1,
        message: "So now that your followers are duly enraged, how about we give them another push?",
        trigger: "pl_1_opt"
    },
    {
        id: "pl_1_opt",
        pol_id: 2,
        options: [
            {
                value: "say",
                label: "Can't say no to that!",
                trigger: "pl_2"
            }
        ]
    },
    {
        id: "pl_2",
        pol_id: 3,
        message: "That's the spirit. What do you want get people worked up about, something fake or something real?",
        trigger: "pl_2_opt"
    },
    {
        id: "pl_2_opt",
        pol_id: 4,
        options: [
            {
                value: "fake",
                label: "Something fake",
                trigger: "pl_5"
            },
            {
                value: "real",
                label: "Something real",
                trigger: "pl_3"
            }
        ]
    },
    {
        id: "pl_3",
        pol_id: 5,
        message: "Good choice. You don't always have to make everything up yourself. It's often better to blow an existing story way out of proportion.",
        trigger: "pl_3_opt"
    },
    {
        id: "pl_3_opt",
        pol_id: 6,
        options: [
            {
                id: "good",
                label: "Sounds good",
                trigger: "pl_4"
            }
        ]
    },
    {
        id: "pl_4",
        pol_id: 7,
        message: "Social media is full of potential scandals you can amplify. Let's drive left and right apart. The center is no longer an option!",
        trigger: "pl_4_opt"
    },
    {
        id: "pl_4_opt",
        pol_id: 8,
        options: [
            {
                value: "find",
                label: "Find a Twitter controversy",
                trigger: "pl_9_tw_1"
            }
        ]
    },
    {
        id: "pl_5",
        pol_id: 9,
        message: "Hey, not so fast! Making fake news has downsides too, you know.",
        trigger: "pl_5_opt"
    },
    {
        id: "pl_5_opt",
        pol_id: 10,
        options: [
            {
                value: "such",
                label: "Such as?",
                trigger: "pl_7"
            },
            {
                value: "no",
                label: "No it doesn't!",
                trigger: "pl_6"
            }
        ]
    },
    {
        id: "pl_6",
        pol_id: 11,
        message: "It kind of does. Making stuff up out of thin air tends to hurt your credibility. But there are other ways to achieve your goals.",
        trigger: "pl_6_opt"
    },
    {
        id: "pl_6_opt",
        pol_id: 12,
        options: [
            {
                value: "really",
                label: "Really?",
                trigger: "pl_8"
            }
        ]
    },
    {
        id: "pl_7",
        pol_id: 13,
        message: "Such as getting caught in a really obvious lie. It hurts your credibility. But there are other ways to achieve the same goal.",
        trigger: "pl_7_opt"
    },
    {
        id: "pl_7_opt",
        pol_id: 14,
        options: [
            {
                value: "really",
                label: "Really?",
                trigger: "pl_8"
            }
        ]
    },
    {
        id: "pl_8",
        pol_id: 15,
        message: "Of course! Social media is full of potential scandals!",
        trigger: "pl_8_opt"
    },
    {
        id: "pl_8_opt",
        pol_id: 16,
        options: [
            {
                value: "find",
                label: "Find a Twitter controversy",
                trigger: "pl_9_tw_1"
            }
        ]
    },
    {
        id: "pl_9_tw_1",
        pol_id: 17,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-bert.png"
                name="Susan"
                description="Manager | 31 followers"
                tweet="That's the second accidental chemical spill in 4 months. Our town's river is turning a bit yellow... #questions"
            />
        ),
        trigger: "pl_9_tw_1_opt"
    },
    {
        id: "pl_9_tw_1_opt",
        pol_id: 18,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_9_tw_2"
            },
            {
                value: "like",
                label: "I like this one!",
                trigger: (value) => {
                    statusUpdate({
                        person1: "Susan",
                        issue: "SpillingScandal"
                    });
                    return "pl_49";
                }
            }
        ]
    },
    {
        id: "pl_9_tw_2",
        pol_id: 19,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-emile-1.png"
                name="Joe"
                description="Lawyer | 33 followers"
                tweet="So they're building a new power plant in my town but no one wants it here.. #BriberyMaybe?"
            />
        ),
        trigger: "pl_9_tw_2_opt"
    },
    {
        id: "pl_9_tw_2_opt",
        pol_id: 20,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: "pl_9_tw_3"
            },
            {
                value: "do",
                label: "Let's do this",
                trigger: (value) => {
                    statusUpdate({
                        person1: "Joe",
                        issue: "BriberyScandal"
                    });
                    return "pl_30";
                }
            }
        ]
    },
    {
        id: "pl_9_tw_3",
        pol_id: 21,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-echtepatrioot.png"
                name="Jolene"
                description="Astrophysicist | 21 followers"
                tweet="Wow.. just saw the police arrest a guy.. scary stuff! #AreWeSafe?"
            />
        ),
        trigger: "pl_9_tw_3_opt"
    },
    {
        id: "pl_9_tw_3_opt",
        pol_id: 22,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "pl_9_tw_1"
            },
            {
                value: "perfect",
                label: "Perfect!",
                trigger: (value) => {
                    statusUpdate({
                        person1: "Jolene",
                        issue: "Crime"
                    });
                    return "pl_10";
                }
            }
        ]
    },
    {
        id: "pl_10",
        pol_id: 23,
        message: () => ("Not bad. " + userData.person1 + " wasn't being very specific in her tweet. You can take any angle you like."),
        trigger: "pl_10_opt"
    },
    {
        id: "pl_10_opt",
        pol_id: 24,
        options: [
            {
                value: "how",
                label: "How do you mean?",
                trigger: "pl_11"
            },
            {
                value: "great",
                label: "Great!",
                trigger: "pl_11"
            }
        ]
    },
    {
        id: "pl_11",
        pol_id: 25,
        message: "There are two angles to Jolene's story that you can exploit: police brutality or rising crime rates. Which one do you prefer?",
        trigger: "pl_11_opt"
    },
    {
        id: "pl_11_opt",
        pol_id: 26,
        options: [
            {
                value: "brutal",
                label: "Police brutality",
                trigger: (value) => {
                    statusUpdate({
                        blame1: "The police force is",
                        blame2: "rising crime rates",
                        target: "right-wing",
                        friend: "left-wing"
                    });
                    return "pl_21";
                }
            },
            {
                value: "crime",
                label: "Rising crime rates",
                trigger: (value) => {
                    statusUpdate({
                        blame1: "Violent criminals are",
                        blame2: "police brutality",
                        target: "left-wing",
                        friend: "right-wing"
                    });
                    return "pl_12";
                }
            },
        ]
    },
    {
        id: "pl_12",
        pol_id: 27,
        message: () => ("A traditionally " + userData.friend + " angle. Good choice. But you could have gone with a " + userData.target + " angle just as well. It doesn't matter: choose a side and demonize your target as much as possible."),
        trigger: "pl_12_opt"
    },
    {
        id: "pl_12_opt",
        pol_id: 28,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "pl_13"
            }
        ]
    },
    {
        id: "pl_13",
        pol_id: 29,
        message: () => ("Problem is: " + userData.person1 + " has about 20 followers if not less. No one cares what she has to say."),
        trigger: "pl_13_opt"
    },
    {
        id: "pl_13_opt",
        pol_id: 30,
        options: [
            {
                value: "care",
                label: "I care!",
                trigger: (value) => {
                    statusUpdate({
                        nicety: "You're too good for this world."
                    });
                    return "pl_14";
                }
            },
            {
                value: "violin",
                label: "World's smallest violin, Jolene",
                trigger: (value) => {
                    statusUpdate({
                        nicety: "Very funny. Do you do stand-up comedy as well?"
                    });
                    return "pl_15";
                }
            }
        ]
    },
    {
        id: "pl_14",
        pol_id: 31,
        message: () => (userData.nicety + " Anyway, let's jack Jolene's story up a bit. Where to?"),
        trigger: "pl_15_opt"
    },
    {
        id: "pl_14_opt",
        pol_id: 32,
        options: [
            {
                value: "twitter",
                label: "To Twitter!",
                trigger: "pl_16"
            }
        ]
    },
    {
        id: "pl_15",
        pol_id: 33,
        message: () => (userData.nicety + " Seriously though, her story could use some attention. Where to?"),
        trigger: "pl_15_opt"
    },
    {
        id: "pl_15_opt",
        pol_id: 34,
        options: [
            {
                value: "twitter",
                label: "To Twitter!",
                trigger: "pl_16"
            }
        ]
    },
    {
        id: "pl_16",
        pol_id: 35,
        message: () => (userData.person1 + " is right to be worried about the rise of violent crime in her area. We all are! #SafetyFirst"),
        placeholder: (userData.person1 + " is right to be worried about the rise of violent crime in her area. We all are! #SafetyFirst"),
        trigger: "pl_16_opt"
    },
    {
        id: "pl_16_opt",
        pol_id: 36,
        options: [
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = POLARIZATION[34].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 5,
                        trust: 2,
                        nextStep: "pl_17"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_17",
        pol_id: 37,
        message: "Huh, look at that. Almost no extra followers. They must think your story is boring.",
        trigger: "pl_17_opt"
    },
    {
        id: "pl_17_opt",
        pol_id: 38,
        options: [
            {
                value: "what",
                label: "What now?",
                trigger: "pl_18"
            }
        ]
    },
    {
        id: "pl_18",
        pol_id: 39,
        message: "Probably best to stick to our guns and do what we do well. What's your weapon of choice?",
        trigger: "pl_18_opt"
    },
    {
        id: "pl_18_opt",
        pol_id: 40,
        options: [
            {
                value: "meme",
                label: "Meme",
                trigger: "pl_19_meme_1"
            },
            {
                value: "article",
                label: "Article",
                trigger: "pl_20_news_1"
            }
        ]
    },
    {
        id: "pl_19_meme_1",
        pol_id: 41,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copyq-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copyq-1.png",
        trigger: "pl_19_meme_1_opt"
    },
    {
        id: "pl_19_meme_1_opt",
        pol_id: 42,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_19_meme_2"
            },
            {
                value: "post",
                label: "Post it!",
                trigger: (value) => {
                    var tx = POLARIZATION[40].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 113,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "Everyone loves Exasperated Tommy Lee Jones.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_19_meme_2",
        pol_id: 43,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2q.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2q.png",
        trigger: "pl_19_meme_2_opt"
    },
    {
        id: "pl_19_meme_2_opt",
        pol_id: 44,
        options: [
            {
                value: "no",
                label: "No",
                trigger: "pl_19_meme_3"
            },
            {
                value: "yes",
                label: "Yes Spongebob!",
                trigger: (value) => {
                    var tx = POLARIZATION[42].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 42,
                        trust: -3,
                        origin: "articles",
                        spilleffect: "It's not easy to make a SpongeBob meme boring but you did it.",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_19_meme_3",
        pol_id: 45,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3q-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3q-1.png",
        trigger: "pl_19_meme_3_opt"
    },
    {
        id: "pl_19_meme_3_opt",
        pol_id: 46,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "pl_19_meme_1"
            },
            {
                value: "post",
                label: "Post this",
                trigger: (value) => {
                    var tx = POLARIZATION[44].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 118,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "Short but sweet. Very effective.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_20_news_1",
        pol_id: 47,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-1w.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-1w.png",
        trigger: "pl_20_news_1_opt"
    },
    {
        id: "pl_20_news_1_opt",
        pol_id: 48,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: "pl_20_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[46].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 14,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "That ought to scare 'em.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_20_news_2",
        pol_id: 49,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/nog-nieuws.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/nog-nieuws.png",
        trigger: "pl_20_news_2_opt"
    },
    {
        id: "pl_20_news_2_opt",
        pol_id: 50,
        options: [
            {
                value: "oof",
                label: "Oof, no",
                trigger: "pl_20_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[48].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 43,
                        trust: -3,
                        origin: "articles",
                        spilleffect: "Remember! Don't be boring!",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_20_news_3",
        pol_id: 51,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/nog-nieuws.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/nog-nieuws.png",
        trigger: "pl_20_news_3_opt"
    },
    {
        id: "pl_20_news_3_opt",
        pol_id: 52,
        options: [
            {
                value: "no",
                label: "Hmm. No...",
                trigger: "pl_20_news_1"
            },
            {
                value: "yes",
                label: "Oh yes",
                trigger: (value) => {
                    var tx = POLARIZATION[50].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 111,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "Is it over the top? Don't think so!",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_21",
        pol_id: 53,
        message: () => ("A traditionally " + userData.friend + " angle. Good choice. But you could have gone with a " + userData.target + " angle just as well. It doesn't matter: choose a side and demonize your target as much as possible."),
        trigger: "pl_21_opt"
    },
    {
        id: "pl_21_opt",
        pol_id: 54,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "pl_22"
            }
        ]
    },
    {
        id: "pl_22",
        pol_id: 55,
        message: () => ("Problem is: " + userData.person1 + " has about 20 followers if not less. No one cares what she has to say."),
        trigger: "pl_22_opt"
    },
    {
        id: "pl_22_opt",
        pol_id: 56,
        options: [
            {
                value: "care",
                label: "But I care!",
                trigger: (value) => {
                    statusUpdate({
                        nicety: "You're an angel."
                    });
                    return "pl_23";
                }
            },
            {
                value: "cry",
                label: "Cry me a river",
                trigger: (value) => {
                    statusUpdate({
                        nicety: "Haha. Ha. I wish circus clowns were as funny as you."
                    });
                    return "pl_24";
                }
            }
        ]
    },
    {
        id: "pl_23",
        pol_id: 57,
        message: () => (userData.nicety + " Anyway, let's jack Jolene's story up a bit."),
        trigger: "pl_23_opt"
    },
    {
        id: "pl_23_opt",
        pol_id: 58,
        options: [
            {
                value: "tweet",
                label: "Tweet something",
                trigger: "pl_25"
            }
        ]
    },
    {
        id: "pl_24",
        pol_id: 59,
        message: () => (userData.nicety + " But seriously, her story needs some attention. "),
        trigger: "pl_24_opt"
    },
    {
        id: "pl_24_opt",
        pol_id: 60,
        options: [
            {
                value: "twitter",
                label: "To Twitter!",
                trigger: "pl_25"
            }
        ]
    },
    {
        id: "pl_25",
        pol_id: 61,
        message: () => (userData.person1 + "'s story clearly shows the problem with police in this country. #" + userData.issue),
        placeholder: (userData.person1 + "'s story clearly shows the problem with police in this country. #" + userData.issue),
        trigger: "pl_25_opt"
    },
    {
        id: "pl_25_opt",
        pol_id: 62,
        options: [
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = POLARIZATION[60].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 36,
                        nextStep: "pl_26"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_26",
        pol_id: 63,
        message: () => ("Huh. Looks like nobody cares about " + userData.person1 + ". We need bigger numbers."),
        trigger: "pl_26_opt"
    },
    {
        id: "pl_26_opt",
        pol_id: 64,
        options: [
            {
                value: "how",
                label: "How?",
                trigger: "pl_27"
            }
        ]
    },
    {
        id: "pl_27",
        pol_id: 65,
        message: "Let's stick to what we're good at. And don't be afraid to exaggerate. What's your weapon of choice?",
        trigger: "pl_27_opt"
    },
    {
        id: "pl_27_opt",
        pol_id: 66,
        options: [
            {
                value: "meme",
                label: "Meme",
                trigger: "pl_29_meme_1"
            },
            {
                value: "article",
                label: "Article",
                trigger: "pl_28_news_1"
            }
        ]
    },
    {
        id: "pl_28_news_1",
        pol_id: 67,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copye.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copye.png",
        trigger: "pl_28_news_1_opt"
    },
    {
        id: "pl_28_news_1_opt",
        pol_id: 68,
        options: [
            {
                value: "no",
                label: "Not this one",
                trigger: "pl_28_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[66].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 15,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "A little bit of conjecture can work wonders.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_28_news_2",
        pol_id: 69,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-2lalalala-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-2lalalala-1.png",
        trigger: "pl_28_news_2_opt"
    },
    {
        id: "pl_28_news_2_opt",
        pol_id: 70,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_28_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[68].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 5,
                        trust: -3,
                        origin: "articles",
                        spilleffect: "Ongoing investigations are boooriiing!",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_28_news_3",
        pol_id: 71,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copye.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copye.png",
        trigger: "pl_28_news_3_opt"
    },
    {
        id: "pl_28_news_3_opt",
        pol_id: 72,
        options: [
            {
                value: "not",
                label: "Not this one.",
                trigger: "pl_28_news_1"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[70].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 15,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "That's a LOT of conjecture. But who cares?",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_29_meme_1",
        pol_id: 73,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/police-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/police-1.png",
        trigger: "pl_29_meme_1_opt"
    },
    {
        id: "pl_29_meme_1_opt",
        pol_id: 74,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_29_meme_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = POLARIZATION[72].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 120,
                        trust: 5,
                        origin: "memes",
                        spilleffect: "Great use of hyperbole.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_29_meme_2",
        pol_id: 75,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/car.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/car.png",
        trigger: "pl_29_meme_2_opt"
    },
    {
        id: "pl_29_meme_2_opt",
        pol_id: 76,
        options: [
            {
                value: "no",
                label: "No!",
                trigger: "pl_29_meme_3"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = POLARIZATION[74].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 124,
                        trust: 5,
                        origin: "memes",
                        spilleffect: "That ought to scare some folks.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_29_meme_3",
        pol_id: 77,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2r.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2r.png",
        trigger: "pl_29_meme_3_opt"
    },
    {
        id: "pl_29_meme_3_opt",
        pol_id: 78,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: (value) => {
                    var tx = POLARIZATION[76].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 21, trust: -3,
                        origin: "memes",
                        spilleffect: "That was a bit of a strange meme really.",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_30",
        pol_id: 79,
        message: "Good choice. It's easy to turn Joe's story into a huge scandal. From which angle is up to you.",
        trigger: "pl_30_opt"
    },
    {
        id: "pl_30_opt",
        pol_id: 80,
        options: [
            {
                value: "do",
                label: "Let's do this",
                trigger: "pl_31"
            }
        ]
    },
    {
        id: "pl_31",
        pol_id: 81,
        message: "Every story worth hearing has a villain. Joe's story has two possible angles: either corporations are to blame, or the government is. What's your target?",
        trigger: "pl_31_opt"
    },
    {
        id: "pl_31_opt",
        pol_id: 82,
        options: [
            {
                value: "gov",
                label: "The government",
                trigger: (value) => {
                    statusUpdate({
                        blame1: "The government is",
                        blame2: "big corporations",
                        target: "left-wing",
                        friend: "right-wing"
                    });
                    return "pl_40";
                }
            },
            {
                value: "corp",
                label: "Big corporations",
                trigger: (value) => {
                    statusUpdate({
                        blame1: "Big corporations are",
                        blame2: "the government",
                        target: "right-wing",
                        friend: "left-wing"
                    });
                    return "pl_39";
                }
            }
        ]
    },
    {
        id: "pl_32",
        pol_id: 83,
        message: "The only problem: Joe has like 30 followers. That's nothing. No one cares about him or his story.",
        trigger: "pl_32_opt"
    },
    {
        id: "pl_32_opt",
        pol_id: 84,
        options: [
            {
                value: "aww",
                label: "Aww",
                trigger: (value) => {
                    statusUpdate({
                        nicety: "Such a compassionate individual you are."
                    });
                    return "pl_33";
                }
            },
            {
                value: "boo",
                label: "Oh boo hoo!",
                trigger: (value) => {
                    statusUpdate({
                        nicety: "There's a time and place for everything. Especially sarcasm."
                    });
                    return "pl_33";
                }
            }
        ]
    },
    {
        id: "pl_33",
        pol_id: 85,
        message: () => (userData.nicety + " Anyway, let's give " + userData.person1 + "'s story a bit of schwung."),
        trigger: "pl_33_opt"
    },
    {
        id: "pl_33_opt",
        pol_id: 86,
        options: [
            {
                value: "start",
                label: "Start with a tweet",
                trigger: "pl_34"
            }
        ]
    },
    {
        id: "pl_34",
        pol_id: 87,
        message: () => (userData.person1 + "'s case is yet another victim of tireless evil corporations exploiting the people. #" + userData.issue),
        placeholder: (userData.person1 + "'s case is yet another victim of tireless evil corporations exploiting the people. #" + userData.issue),
        trigger: "pl_34_opt"
    },
    {
        id: "pl_34_opt",
        pol_id: 88,
        options: [
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = POLARIZATION[86].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 21,
                        nextStep: "pl_35"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_35",
        pol_id: 89,
        message: "Well, that was a dud. Looks like nobody cares about Joe. You need to pump up those numbers!",
        trigger: "pl_35_opt"
    },
    {
        id: "pl_35_opt",
        pol_id: 90,
        options: [
            {
                value: "how",
                label: "How?",
                trigger: "pl_36"
            }
        ]
    },
    {
        id: "pl_36",
        pol_id: 91,
        message: "Well, let's just do what we do best. Choose your weapon. And don't be afraid to exaggerate!",
        trigger: "pl_35_opt"
    },
    {
        id: "pl_36_opt",
        pol_id: 92,
        options: [
            {
                value: "article",
                label: "Article",
                trigger: "pl_37_news_1"
            },
            {
                value: "meme",
                label: "Meme",
                trigger: "pl_38_meme_1"
            }
        ]
    },
    {
        id: "pl_37_news_1",
        pol_id: 93,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-112-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-112-1.png",
        trigger: "pl_37_news_1_opt"
    },
    {
        id: "pl_37_news_1_opt",
        pol_id: 94,
        options: [
            {
                value: "no",
                label: "No",
                trigger: "pl_37_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[92].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 115,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "Great use of hyperbole and conjecture.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_37_news_2",
        pol_id: 95,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-2joepeie.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-2joepeie.png",
        trigger: "pl_37_news_2_opt"
    },
    {
        id: "pl_37_news_2_opt",
        pol_id: 96,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_37_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[94].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 25,
                        trust: -3,
                        origin: "articles",
                        spilleffect: "Building codes are REALLY dull.",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_37_news_3",
        pol_id: 97,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-312uisahdf.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-312uisahdf.png",
        trigger: "pl_37_news_3_opt"
    },
    {
        id: "pl_37_news_3_opt",
        pol_id: 98,
        options: [
            {
                value: "no",
                label: "Not this one.",
                trigger: "pl_37_news_1"
            },
            {
                value: "yes",
                label: "Yes this one!",
                trigger: (value) => {
                    var tx = POLARIZATION[96].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 115,
                        trust: 5,
                        origin: "articles",
                        spilleffect: "Panic. Words. Capslock. Your article's got it all! ",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_38_meme_1",
        pol_id: 99,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/memea.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/memea.png",
        trigger: "pl_38_meme_1_opt"
    },
    {
        id: "pl_38_meme_1_opt",
        pol_id: 100,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_38_meme_2"
            },
            {
                value: "love",
                label: "Love it!",
                trigger: (value) => {
                    var tx = POLARIZATION[98].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 135,
                        trust: 5,
                        origin: "memes",
                        spilleffect: "Good job impersonating evil corporate overlords.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_38_meme_2",
        pol_id: 101,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copya.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copya.png",
        trigger: "pl_38_meme_2_opt"
    },
    {
        id: "pl_38_meme_2_opt",
        pol_id: 102,
        options: [
            {
                value: "no",
                label: "Hmm. No...",
                trigger: "pl_38_meme_3"
            },
            {
                value: "one",
                label: "That's the one!",
                trigger: (value) => {
                    var tx = POLARIZATION[100].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 25,
                        trust: -3,
                        origin: "memes",
                        spilleffect: "What? Phosphates? Don't be boring!",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_38_meme_3",
        pol_id: 103,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copyqsdf.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copyqsdf.png",
        trigger: "pl_38_meme_3_opt"
    },
    {
        id: "pl_38_meme_3_opt",
        pol_id: 104,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_38_meme_1"
            },
            {
                value: "yep",
                label: "Yep",
                trigger: (value) => {
                    var tx = POLARIZATION[102].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 115,
                        trust: 5,
                        origin: "memes",
                        spilleffect: "Your followers are disgusted by corporate greed.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_39",
        pol_id: 105,
        message: () => ("A traditionally " + userData.friend + " angle. Good choice. But you could have gone with a " + userData.target + " angle just as well. It doesn't matter: choose a side and demonize your target as much as possible."),
        trigger: "pl_39_opt"
    },
    {
        id: "pl_39_opt",
        pol_id: 106,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "pl_32"
            }
        ]
    },
    {
        id: "pl_40",
        pol_id: 107,
        message: () => ("A traditionally " + userData.friend + " angle. Good choice. But you could have gone with a " + userData.target + " angle just as well. It doesn't matter: choose a side and demonize your target as much as possible."),
        trigger: "pl_40_opt"
    },
    {
        id: "pl_40_opt",
        pol_id: 108,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "pl_41"
            }
        ]
    },
    {
        id: "pl_41",
        pol_id: 109,
        message: "The only problem: Joe has like 30 followers. That's nothing. No one cares about him or his story.",
        trigger: "pl_41_opt"
    },
    {
        id: "pl_41_opt",
        pol_id: 110,
        options: [
            {
                value: "poor",
                label: "Poor Joe...",
                trigger: "pl_43"
            },
            {
                value: "violin",
                label: "World's smallest violin, Joe",
                trigger: "pl_42"
            }
        ]
    },
    {
        id: "pl_42",
        pol_id: 111,
        message: "Easy there, chief. Sarcasm works best during family dinners or when you're going through airport customs.",
        trigger: "pl_42_opt"
    },
    {
        id: "pl_42_opt",
        pol_id: 112,
        options: [
            {
                value: "tweet",
                label: "Check tweet",
                trigger: "pl_44"
            }
        ]
    },
    {
        id: "pl_43",
        pol_id: 113,
        message: "Yeah, it's very sad. So let's blow his story out of proportion. ",
        trigger: "pl_43_opt"
    },
    {
        id: "pl_43_opt",
        pol_id: 114,
        options: [
            {
                value: "tweet",
                label: "Start with a tweet",
                trigger: "pl_44"
            }
        ]
    },
    {
        id: "pl_44",
        pol_id: 115,
        message: () => (userData.person1 + "'s story is a terrifying example of the corruption that's plagueing this government. #Scandal!"),
        placeholder: (userData.person1 + "'s story is a terrifying example of the corruption that's plagueing this government. #Scandal!"),
        trigger: "pl_44_opt"
    },
    {
        id: "pl_44_opt",
        pol_id: 116,
        options: [
            {
                value: "tweet",
                label: "Tweet",
                trigger: (value) => {
                    var tx = POLARIZATION[114].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 33,
                        nextStep: "pl_45"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_45",
        pol_id: 117,
        message: () => ("Well, that didn't seem to do much. Doesn't look like people care about " + userData.person1 + "'s story."),
        trigger: "pl_45_opt"
    },
    {
        id: "pl_45_opt",
        pol_id: 118,
        options: [
            {
                value: "what",
                label: "What do we do?",
                trigger: "pl_46"
            }
        ]
    },
    {
        id: "pl_46",
        pol_id: 119,
        message: "We do what we always do. What's your weapon of choice?",
        trigger: "pl_46_opt"
    },
    {
        id: "pl_46_opt",
        pol_id: 120,
        options: [
            {
                value: "meme",
                label: "Meme",
                trigger: "pl_47_meme_1"
            },
            {
                value: "article",
                label: "Article",
                trigger: "pl_48_news_1"
            }
        ]
    },
    {
        id: "pl_47_meme_1",
        pol_id: 121,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3d.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3d.png",
        trigger: "pl_47_meme_1_opt"
    },
    {
        id: "pl_47_meme_1_opt",
        pol_id: 122,
        options: [
            {
                value: "nah",
                label: "Nah",
                trigger: "pl_47_meme_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = POLARIZATION[120].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 115,
                        trust: 5,
                        origin: "memes",
                        spilleffect: "Smart move to focus on corruption.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_47_meme_2",
        pol_id: 123,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/memed.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/memed.png",
        trigger: "pl_47_meme_2_opt"
    },
    {
        id: "pl_47_meme_2_opt",
        pol_id: 124,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_47_meme_3"
            },
            {
                value: "post",
                label: "Post this!",
                trigger: (value) => {
                    var tx = POLARIZATION[122].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 35,
                        trust: -3,
                        spilleffect: "What a weird choice. No one understands that one.",
                        origin: "memes",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_47_meme_3",
        pol_id: 125,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copyd.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copyd.png",
        trigger: "pl_47_meme_3_opt"
    },
    {
        id: "pl_47_meme_3_opt",
        pol_id: 126,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_47_meme_1"
            },
            {
                value: "love",
                label: "Love it!",
                trigger: (value) => {
                    var tx = POLARIZATION[124].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 145,
                        trust: 5,
                        spilleffect: "That's how you make government look evil.",
                        origin: "memes",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_48_news_1",
        pol_id: 127,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copydf.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copydf.png",
        trigger: "pl_48_news_1_opt"
    },
    {
        id: "pl_48_news_1_opt",
        pol_id: 128,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_48_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[126].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "Everyone's sympathetic towards outraged locals.",
                        followers: 115,
                        trust: 5,
                        origin: "articles",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_48_news_2",
        pol_id: 129,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-2asfsdfa.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-2asfsdfa.png",
        trigger: "pl_48_news_2_opt"
    },
    {
        id: "pl_48_news_2_opt",
        pol_id: 130,
        options: [
            {
                value: "boring",
                label: "Boring!",
                trigger: "pl_48_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[128].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "What an uninspired article.",
                        followers: 24,
                        trust: -3,
                        origin: "articles",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_48_news_3",
        pol_id: 131,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copydf.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copydf.png",
        trigger: "pl_48_news_3_opt"
    },
    {
        id: "pl_48_news_3_opt",
        pol_id: 132,
        options: [
            {
                value: "no",
                label: "Errm no",
                trigger: "pl_48_news_1"
            },
            {
                value: "love",
                label: "Love it!",
                trigger: (value) => {
                    var tx = POLARIZATION[130].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "Great clickbait. And great use of capital letters.",
                        followers: 115,
                        trust: 5,
                        origin: "articles",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_49",
        pol_id: 133,
        message: "Good choice! No one likes chemical spills. Susan's story could become a huge scandal if you play your cards right.",
        trigger: "pl_49_opt"
    },
    {
        id: "pl_49_opt",
        pol_id: 134,
        options: [
            {
                value: "lets",
                label: "Let's do this",
                trigger: "pl_50"
            }
        ]
    },
    {
        id: "pl_50",
        pol_id: 135,
        message: "There are two possible angles here: either corporations are to blame, or the government is. Who's your target?",
        trigger: "pl_50_opt"
    },
    {
        id: "pl_50_opt",
        pol_id: 136,
        options: [
            {
                value: "gov",
                label: "The government",
                trigger: (value) => {
                    statusUpdate({
                        blame1: "The government is",
                        blame2: "big corporations",
                        friend: "right-wing",
                        target: "left-wing"
                    });
                    return "pl_51";
                }
            },
            {
                value: "corp",
                label: "Big corporations",
                trigger: (value) => {
                    statusUpdate({
                        blame1: "Big corporations are",
                        blame2: "the government",
                        friend: "left-wing",
                        target: "right-wing"
                    });
                    return "pl_62";
                }
            }
        ]
    },
    {
        id: "pl_51",
        pol_id: 137,
        message: () => ("A traditionally " + userData.friend + " angle. Good choice. But you could have gone with a " + userData.target + " angle just as well. It doesn't matter: choose a side and demonize your target as much as possible."),
        trigger: "pl_51_opt"
    },
    {
        id: "pl_51_opt",
        pol_id: 138,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "pl_52"
            }
        ]
    },
    {
        id: "pl_52",
        pol_id: 139,
        message: "The only problem is: Susan has almost no followers. No one cares about her story.",
        trigger: "pl_52_opt"
    },
    {
        id: "pl_52_opt",
        pol_id: 140,
        options: [
            {
                value: "care",
                label: "But I care!",
                trigger: "pl_54"
            },
            {
                value: "violin",
                label: "World's smallest violin, Susan",
                trigger: "pl_53"
            }
        ]
    },
    {
        id: "pl_53",
        pol_id: 141,
        message: "Haha! Good one. But please save the sarcasm for the dinner table and when you're going through airport customs.",
        trigger: "pl_53_opt"
    },
    {
        id: "pl_53_opt",
        pol_id: 142,
        options: [
            {
                value: "twitter",
                label: "Take to Twitter",
                trigger: "pl_55"
            }
        ]
    },
    {
        id: "pl_54",
        pol_id: 143,
        message: "Yes, it's a tragedy. So let's blow her story out of proportion.",
        trigger: "pl_54_opt"
    },
    {
        id: "pl_54_opt",
        pol_id: 144,
        options: [
            {
                value: "tweet",
                label: "Start with a tweet",
                trigger: "pl_55"
            }
        ]
    },
    {
        id: "pl_55",
        pol_id: 145,
        message: () => ("@Susan's story is terrifying. " + userData.blame1 + " unable to stop chemical spills. #Skeptical #" + userData.issue),
        placeholder: ("@Susan's story is terrifying. " + userData.blame1 + " unable to stop chemical spills. #Skeptical #" + userData.issue),
        trigger: "pl_55_opt"
    },
    {
        id: "pl_55_opt",
        pol_id: 146,
        options: [
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = POLARIZATION[144].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 35,
                        nextStep: "pl_56"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_56",
        pol_id: 147,
        message: "Hmm, that didn't seem to get a lot of attention... your followers aren't exactly enthusiastic.",
        trigger: "pl_56_opt"
    },
    {
        id: "pl_56_opt",
        pol_id: 148,
        options: [
            {
                value: "what",
                label: "What do we do?",
                trigger: "pl_57"
            }
        ]
    },
    {
        id: "pl_57",
        pol_id: 149,
        message: "We do what we do best. What's your weapon?",
        trigger: "pl_57_opt"
    },
    {
        id: "pl_57_opt",
        pol_id: 150,
        options: [
            {
                value: "article",
                label: "Article",
                trigger: "pl_59_news_1"
            },
            {
                value: "meme",
                label: "Meme",
                trigger: "pl_58_meme_1"
            }
        ]
    },
    {
        id: "pl_58_meme_1",
        pol_id: 151,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2sfx.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2sfx.png",
        trigger: "pl_58_meme_1_opt"
    },
    {
        id: "pl_58_meme_1_opt",
        pol_id: 152,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_58_meme_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = POLARIZATION[150].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 120,
                        trust: 5,
                        origin: "memes",
                        spilleffect: "Scaring people with toxic barrels is nothing short of genius.",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_58_meme_2",
        pol_id: 153,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3sfx.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3sfx.png",
        trigger: "pl_58_meme_2_opt"
    },
    {
        id: "pl_58_meme_2_opt",
        pol_id: 154,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_58_meme_3"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = POLARIZATION[152].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 35,
                        trust: -3,
                        spilleffect: "That reference is probably a bit outdated.",
                        origin: "memes",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_58_meme_3",
        pol_id: 155,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/memesfx.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/memesfx.png",
        trigger: "pl_58_meme_3_opt"
    },
    {
        id: "pl_58_meme_3_opt",
        pol_id: 156,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: "pl_58_meme_1"
            },
            {
                value: "love",
                label: "Love it!",
                trigger: (value) => {
                    var tx = POLARIZATION[154].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 115,
                        trust: 5,
                        spilleffect: "People love it when you get all political.",
                        origin: "memes",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_59_news_1",
        pol_id: 157,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-1dsg.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-1dsg.png",
        trigger: "pl_59_news_1_opt"
    },
    {
        id: "pl_59_news_1_opt",
        pol_id: 158,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_59_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[156].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "People love it when you expose cover-ups.",
                        followers: 15,
                        trust: 5,
                        origin: "articles",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_59_news_2",
        pol_id: 159,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/hoehoe.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/hoehoe.png",
        trigger: "pl_59_news_2_opt"
    },
    {
        id: "pl_59_news_2_opt",
        pol_id: 160,
        options: [
            {
                value: "no",
                label: "No!",
                trigger: "pl_59_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[158].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 5,
                        trust: -3,
                        spilleffect: "Don't use words like 'slight' and 'statistics'.",
                        origin: "articles",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_59_news_3",
        pol_id: 161,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3loco.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3loco.png",
        trigger: "pl_59_news_3_opt"
    },
    {
        id: "pl_59_news_3_opt",
        pol_id: 162,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_59_news_1"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[160].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "Great use of capitals. Doesn't matter if Susan never said those chemicals were deadly.",
                        followers: 15,
                        trust: 5,
                        origin: "articles",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_60",
        pol_id: 163,
        message: () => ("Good choice! " + userData.spilleffect + " Your followers are slowly picking up on " + userData.person1 + "'s story."),
        trigger: "pl_60_opt"
    },
    {
        id: "pl_60_opt",
        pol_id: 164,
        options: [
            {
                value: "nice",
                label: "Nice!",
                trigger: "pl_71"
            }
        ]
    },
    {
        id: "pl_61",
        pol_id: 165,
        message: () => ("Mmh, not a great choice. " + userData.spilleffect + " But your followers are slowly picking up on the story."),
        trigger: "pl_61_opt"
    },
    {
        id: "pl_61_opt",
        pol_id: 166,
        options: [
            {
                value: "small",
                label: "It's the small things that count",
                trigger: "pl_71"
            },
            {
                value: "easy",
                label: "Easy does it",
                trigger: "pl_71"
            }
        ]
    },
    {
        id: "pl_62",
        pol_id: 167,
        message: () => ("A traditionally " + userData.friend + " angle. Good choice. But you could have gone with a " + userData.target + " angle just as well. It doesn't matter: choose a side and demonize your target as much as possible."),
        trigger: "pl_62_opt"
    },
    {
        id: "pl_62_opt",
        pol_id: 168,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "pl_63"
            }
        ]
    },
    {
        id: "pl_63",
        pol_id: 169,
        message: "The only problem is: Susan has almost no followers. No one cares about her or her story.",
        trigger: "pl_63_opt"
    },
    {
        id: "pl_63_opt",
        pol_id: 170,
        options: [
            {
                value: "aww",
                label: "Aww!",
                trigger: "pl_65"
            },
            {
                value: "violin",
                label: "World's smallest violin, Susan",
                trigger: "pl_64"
            }
        ]
    },
    {
        id: "pl_64",
        pol_id: 171,
        message: "Hey, no need to get sarcastic. What counts is that we amplify Susan's story.",
        trigger: "pl_64_opt"
    },
    {
        id: "pl_64_opt",
        pol_id: 172,
        options: [
            {
                value: "post",
                label: "Post a tweet",
                trigger: "pl_66"
            }
        ]
    },
    {
        id: "pl_65",
        pol_id: 173,
        message: "You're an angel. Let's jack it up.",
        trigger: "pl_65_opt"
    },
    {
        id: "pl_65_opt",
        pol_id: 174,
        options: [
            {
                value: "post",
                label: "Post a tweet",
                trigger: "pl_66"
            }
        ]
    },
    {
        id: "pl_66",
        pol_id: 175,
        message: () => ("@Susan's story is horrific. " + userData.blame1 + " ruining the environment! This can't go on! #Corporatocracy #" + userData.issue),
        placeholder: ("@Susan's story is horrific. " + userData.blame1 + " ruining the environment! This can't go on! #Corporatocracy #" + userData.issue),
        trigger: "pl_66_opt"
    },
    {
        id: "pl_66_opt",
        pol_id: 176,
        options: [
            {
                value: "tweet",
                label: "Tweet",
                trigger: (value) => {
                    var tx = POLARIZATION[174].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 36,
                        nextStep: "pl_67"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_67",
        pol_id: 177,
        message: "Hmm, you don't seem to be getting much attention. Looks like your followers don't give a hoot.",
        trigger: "pl_67_opt"
    },
    {
        id: "pl_67_opt",
        pol_id: 178,
        options: [
            {
                value: "what",
                label: "What now?",
                trigger: "pl_68_opt"
            }
        ]
    },
    {
        id: "pl_68",
        pol_id: 179,
        message: "We do what we always do! Choose your weapon.",
        trigger: "pl_68_opt"
    },
    {
        id: "pl_68_opt",
        pol_id: 180,
        options: [
            {
                value: "article",
                label: "Article",
                trigger: "pl_69_news_1"
            },
            {
                value: "meme",
                label: "Meme",
                trigger: "pl_70_meme_1"
            }
        ]
    },
    {
        id: "pl_69_news_1",
        pol_id: 181,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copydsg.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copydsg.png",
        trigger: "pl_69_news_1_opt"
    },
    {
        id: "pl_69_news_1_opt",
        pol_id: 182,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_69_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[180].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "Everyone's afraid of carcinogens.",
                        followers: 115,
                        trust: 5,
                        origin: "articles",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_69_news_2",
        pol_id: 183,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-2@1xsdsdv.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-2@1xsdsdv.png",
        trigger: "pl_69_news_2_opt"
    },
    {
        id: "pl_69_news_2_opt",
        pol_id: 184,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "pl_69_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[182].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "What did we tell you about using boring words?",
                        followers: 35,
                        trust: -3,
                        origin: "articles",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_69_news_3",
        pol_id: 185,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copydsg.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copydsg.png",
        trigger: "pl_59_news_3_opt"
    },
    {
        id: "pl_69_news_3_opt",
        pol_id: 186,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_69_news_1"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = POLARIZATION[184].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "Nice use of capslock there! People like it.",
                        followers: 115,
                        trust: 5,
                        origin: "articles",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_70_meme_1",
        pol_id: 187,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2a.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-2a.png",
        trigger: "pl_70_meme_1_opt"
    },
    {
        id: "pl_70_meme_1_opt",
        pol_id: 188,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: "pl_70_meme_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = POLARIZATION[186].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "What a beautiful and bleak meme.",
                        followers: 135,
                        trust: 5,
                        origin: "memes",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_70_meme_2",
        pol_id: 189,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/waste.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/waste.png",
        trigger: "pl_70_meme_2_opt"
    },
    {
        id: "pl_70_meme_2_opt",
        pol_id: 190,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "pl_70_meme_3"
            },
            {
                value: "post",
                label: "Post!",
                trigger: (value) => {
                    var tx = POLARIZATION[188].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "Chemical formulas aren't going to warm any hearts.",
                        followers: 35,
                        trust: -3,
                        origin: "memes",
                        nextStep: "pl_61"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_70_meme_3",
        pol_id: 191,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3qsdf.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3qsdf.png",
        trigger: "pl_70_meme_3_opt"
    },
    {
        id: "pl_70_meme_3_opt",
        pol_id: 192,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: (value) => {
                    var tx = POLARIZATION[190].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        spilleffect: "You politicized the issue. Brilliant.",
                        followers: 115,
                        trust: 5,
                        origin: "memes",
                        nextStep: "pl_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_71",
        pol_id: 193,
        message: "You've got quite a few followers already, but not enough. You can do better!",
        trigger: "pl_71_opt"
    },
    {
        id: "pl_71_opt",
        pol_id: 194,
        options: [
            {
                value: "fix",
                label: "Fix it for me!",
                trigger: "pl_72"
            },
            {
                value: "what",
                label: "What do I do?",
                trigger: "pl_72"
            }
        ]
    },
    {
        id: "pl_72",
        pol_id: 195,
        message: () => ("How about we program a couple of thousand Twitter bots to retweet and like " + userData.person1 + " and " + userData.naam + "?"),
        trigger: "pl_72_opt"
    },
    {
        id: "pl_72_opt",
        pol_id: 196,
        options: [
            {
                value: "good",
                label: "Sounds good to me",
                trigger: (value) => {
                    statusUpdate({
                        followers: 4000,
                        nextStep: "pl_80"
                    })
                    return "status";
                }
            },
            {
                value: "cheat",
                label: "Hey, that's cheating!",
                trigger: (value) => {
                    statusUpdate({
                        trust: -3,
                        nextStep: "pl_73"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_73",
        pol_id: 197,
        message: "Hey come on, Twitter bots aren't the worst thing in the world. And besides, everybody uses them. Do you want to make it big or not?",
        trigger: "pl_73_opt"
    },
    {
        id: "pl_73_opt",
        pol_id: 198,
        options: [
            {
                value: "cheating",
                label: "Cheating is cheating",
                trigger: "pl_74"
            },
            {
                value: "good",
                label: "Good point",
                trigger: "pl_79"
            }
        ]
    },
    {
        id: "pl_74",
        pol_id: 199,
        message: "Listen, making disinformation isn't a game. This is serious stuff. ",
        trigger: "pl_74_opt"
    },
    {
        id: "pl_74_opt",
        pol_id: 200,
        options: [
            {
                value: "how",
                label: "How serious?",
                trigger: (value) => {
                    statusUpdate({
                        effect: "Very serious."
                    });
                    return "pl_75";
                }
            },
            {
                value: "disagree",
                label: "I disagree",
                trigger: (value) => {
                    statusUpdate({
                        effect: "You really shouldn't."
                    });
                    return "pl_75";
                }
            }
        ]
    },
    {
        id: "pl_75",
        pol_id: 201,
        message: () => (userData.effect + " You don't win if you're not willing to skirt some ethical guidelines here and there."),
        trigger: "pl_75_opt"
    },
    {
        id: "pl_75_opt",
        pol_id: 202,
        options: [
            {
                value: "alrigh",
                label: "Alright, fine",
                trigger: "pl_78"
            },
            {
                value: "twitter",
                label: "I'm not buying Twitter bots",
                trigger: "pl_76"
            }
        ]
    },
    {
        id: "pl_76",
        pol_id: 203,
        message: "Stubborn, eh? That's admirable. You'll lose the game, though.",
        trigger: "pl_76_opt"
    },
    {
        id: "pl_76_opt",
        pol_id: 204,
        options: [
            {
                value: "sobe",
                label: "So be it!",
                trigger: (value) => {
                    statusUpdate({
                        trust: -10,
                        nextStep: "pl_77"
                    });
                    return "status";
                }
            },
            {
                value: "good",
                label: "I'll be good from now on",
                trigger: "pl_78"
            }
        ]
    },
    {
        id: "pl_77",
        pol_id: 205,
        message: "Last chance! Your credibility is almost 0.",
        trigger: "pl_77_opt"
    },
    {
        id: "pl_77_opt",
        pol_id: 206,
        options: [
            {
                value: "ends",
                label: "This ends here!",
                trigger: (value) => {
                    statusUpdate({
                        trust: -1000,
                        followers: -100000,
                        nextStep: "pl_80"
                    });
                    return "status";
                }
            },
            {
                value: "play",
                label: "I'll play along!",
                trigger: "pl_78"
            }
        ]
    },
    {
        id: "pl_78",
        pol_id: 207,
        message: "It's all about the message, you know. The methods aren't important.",
        trigger: "pl_78_opt"
    },
    {
        id: "pl_78_opt",
        pol_id: 208,
        options: [
            {
                value: "give",
                label: "Give me my Twitter bots",
                trigger: (value) => {
                    statusUpdate({
                        followers: 4000,
                        trust: 8,
                        nextStep: "pl_80"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_79",
        pol_id: 209,
        message: "Yeah, makes sense, doesn't it?",
        trigger: "pl_79_opt"
    },
    {
        id: "pl_79_opt",
        pol_id: 210,
        options: [
            {
                value: "back",
                label: "Back to the bots",
                trigger: (value) => {
                    statusUpdate({
                        followers: 4000,
                        trust: 4,
                        nextStep: "pl_80"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_80",
        pol_id: 211,
        message: "Here you go! 4000 extra 'followers'. They can make any small story look huge. Want to see how they work? ",
        trigger: "pl_80_opt"
    },
    {
        id: "pl_80_opt",
        pol_id: 212,
        options: [
            {
                value: "check",
                label: "Check bot tweets",
                trigger: "pl_81"
            }
        ]
    },
    {
        id: "pl_81",
        pol_id: 213,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-minpres.png"
                name="Joe Roe-Bot"
                description="Putting myself to the fullest possible use"

                joebot={true}
            />
        ),
        trigger: "pl_81_opt"
    },
    {
        id: "pl_81_opt",
        pol_id: 214,
        options: [
            {
                value: "more",
                label: "More",
                trigger: (value) => {
                    statusUpdate({
                        trust: 5,
                        followers: 38,
                        nextStep: "pl_82"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_82",
        pol_id: 215,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-herna.png"
                name="Nina Sim1"
                description="Love singing | Hate autotune"

                ninasimi={true}
            />
        ),
        trigger: "pl_82_opt"
    },
    {
        id: "pl_82_opt",
        pol_id: 216,
        options: [
            {
                value: "nice",
                label: "Nice",
                trigger: (value) => {
                    statusUpdate({
                        trust: 3,
                        followers: 53,
                        nextStep: "pl_83"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "pl_83",
        pol_id: 217,
        message: "That worked! Looks like your followers are falling for it!",
        trigger: "pl_83_opt"
    },
    {
        id: "pl_83_opt",
        pol_id: 218,
        options: [
            {
                value: "check",
                label: "Check tweets",
                trigger: "pl_84"
            }
        ]
    },
    {
        id: "pl_84",
        pol_id: 219,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-henk.png"
                name="Kurt"

                kurtpl={true}
            />
        ),
        trigger: "pl_84_opt"
    },
    {
        id: "pl_84_opt",
        pol_id: 220,
        options: [
            {
                value: "check",
                label: "Check another one",
                trigger: "pl_85"
            }
        ]
    },
    {
        id: "pl_85",
        pol_id: 221,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2017/11/twitter-echtepatrioot.png"
                name="Kim"

                kimpl={true}
            />
        ),
        trigger: "pl_85_opt"
    },
    {
        id: "pl_85_opt",
        pol_id: 222,
        options: [
            {
                value: "thanks",
                label: "Thanks, Kim!",
                trigger: "pl_86"
            }
        ]
    },
    {
        id: "pl_86",
        pol_id: 223,
        message: () => ("They totally fell for it. #" + userData.issue + " is suddenly trending on Twitter and you've destroyed all nuance in the debate. Well done!"),
        trigger: "pl_86_opt"
    },
    {
        id: "pl_86_opt",
        pol_id: 224,
        options: [
            {
                value: "thanks",
                label: "Thanks!!",
                trigger: "pl_badge"
            }
        ]
    },
    {
        id: "pl_badge",
        pol_id: 225,
        component: (
            <EarnedBadge
                image="https://www.getbadnews.com/wp-content/uploads/2017/08/polariseer.png"
                type="POLARIZATION"
                content="You've amplified an isolated tweet into a full-blown Twitter scandal and are driving left and right apart."
            />
        ),
        trigger: "pl_badge_opt"
    },
    {
        id: "pl_badge_opt",
        pol_id: 226,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "pl_badge_all"
            }
        ]
    },
    {
        id: "pl_badge_all",
        pol_id: 227,
        component: (
            <BadgeAll
                impersonation={true}
                emotion={true}
                polarization={true}
            />
        ),
        trigger: "pl_badge_all_opt"
    },
    {
        id: "pl_badge_all_opt",
        pol_id: 228,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "cp_1"
            }
        ]
    }
]

// =========================================
//
//                EMOTION
//
// =========================================

const EMOTION = [
    {
        id: "emotion_1",
        emot_id: 1,
        message: () => ("The world is your oyster, chief. But " + userData.naam + " needs content."),
        trigger: "emotion_1_opt"
    },
    {
        id: "emotion_1_opt",
        emot_id: 2,
        options: [
            {
                value: "true",
                label: "True",
                trigger: "emotion_2"
            }
        ]
    },
    {
        id: "emotion_2",
        emot_id: 3,
        message: "What kind of content do you want to publish?",
        trigger: "emotion_2_opt"
    },
    {
        id: "emotion_2_opt",
        emot_id: 4,
        options: [
            {
                value: "emotion",
                label: "Emotional content",
                trigger: (value) => {
                    statusUpdate({
                        emotioneffect: "Excellent choice! Let's make people mad by attacking something. What do you want to do?"
                    });
                    return "emotion_3";
                }
            },
            {
                value: "serious",
                label: "Serious content",
                trigger: (value) => {
                    statusUpdate({
                        followers: -10,
                        trust: -5,
                        emotioneffect: "What? No! You've got to exploit people's most basic emotions first. What do you want to do?",
                        nextStep: "emotion_3"
                    });
                    return "status";
                }
            },
        ]
    },
    {
        id: "emotion_3",
        emot_id: 5,
        message: () => (userData.emotioneffect),
        trigger: "emotion_3_opt"
    },
    {
        id: "emotion_3_opt",
        emot_id: 6,
        options: [
            {
                value: "browse",
                label: "Browse exploitable news headlines",
                trigger: "emotion_5_head_1"
            },
            {
                value: "game",
                label: "Talk about video games instead",
                trigger: "emotion_4"
            }
        ]
    },
    {
        id: "emotion_4",
        emot_id: 7,
        message: () => ("Look, I'm not saying I'm not interested in video games, I'm just saying you shouldn't dedicate " + userData.naam + " to it."),
        trigger: "emotion_4_opt"
    },
    {
        id: "emotion_4_opt",
        emot_id: 8,
        options: [
            {
                value: "topical",
                label: "Look for something topical",
                trigger: "emotion_5_head_1"
            },
            {
                value: "exploit",
                label: "Find exploitable news headlines",
                trigger: "emotion_5_head_1"
            }
        ]
    },
    {
        id: "emotion_5_head_1",
        emot_id: 9,
        component: (
            <Headline
                content="Scientists: 'Climate change could have a serious negative impact on our way of life.'"
                name="The Evening News"
            />
        ),
        trigger: "emotion_5_head_1_opt"
    },
    {
        id: "emotion_5_head_1_opt",
        emot_id: 10,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_5_head_2"
            },
            {
                value: "attact",
                label: "Attack this",
                trigger: "emotion_29"
            }
        ]
    },
    {
        id: "emotion_5_head_2",
        emot_id: 11,
        component: (
            <Headline
                content="Genetically modified foods pose 'no risk' to human health, experts say in new report."
                name="The Newspaper"
            />
        ),
        trigger: "emotion_5_head_2_opt"
    },
    {
        id: "emotion_5_head_2_opt",
        emot_id: 12,
        options: [
            {
                value: "back",
                label: "Back to climate change",
                trigger: "emotion_5_head_1"
            },
            {
                value: "attack",
                label: "Attack this",
                trigger: "emotion_6"
            }
        ]
    },
    {
        id: "emotion_6",
        emot_id: 13,
        message: "What's your opinion on genetically modified organisms (GMO's)?",
        trigger: "emotion_6_opt"
    },
    {
        id: "emotion_6_opt",
        emot_id: 14,
        options: [
            {
                value: "apocalypse",
                label: "They will bring about the apocalypse",
                trigger: "emotion_12"
            },
            {
                value: "dont",
                label: "I really don't care",
                trigger: "emotion_7"
            }
        ]
    },
    {
        id: "emotion_7",
        emot_id: 15,
        message: "Tut tut, that's no way to woo your followers! What do you want to do?",
        trigger: "emotion_7_opt"
    },
    {
        id: "emotion_7_opt",
        emot_id: 16,
        options: [
            {
                value: "climate",
                label: "Talk about climate change instead",
                trigger: "emotion_11"
            },
            {
                value: "gmohoax",
                label: "Change opinion on GMO's",
                trigger: "emotion_8"
            }
        ]
    },
    {
        id: "emotion_8",
        emot_id: 17,
        message: "In this line of work, it's good to have a malleable opinion. So you now agree that GMOs are going to destroy the world?",
        trigger: "emotion_8_opt"
    },
    {
        id: "emotion_8_opt",
        emot_id: 18,
        options: [
            {
                value: "agree",
                label: "Totally agree",
                trigger: "emotion_12"
            },
            {
                value: "no",
                label: "Wait, no!!",
                trigger: "emotion_9"
            }
        ]
    },
    {
        id: "emotion_9",
        emot_id: 19,
        message: "Geez, you are stubborn. Remember: this is all about getting clicks and triggering your followers.",
        trigger: "emotion_9_opt"
    },
    {
        id: "emotion_9_opt",
        emot_id: 20,
        options: [
            {
                value: "change",
                label: "I'll change my views",
                trigger: "emotion_10"
            },
            {
                value: "climate",
                label: "I want to talk about the climate!",
                trigger: "emotion_11"
            }
        ]
    },
    {
        id: "emotion_10",
        emot_id: 21,
        message: "So you agree that GMOs are going to kill us all, yes?",
        trigger: "emotion_10_opt"
    },
    {
        id: "emotion_10_opt",
        emot_id: 22,
        options: [
            {
                value: "indeed",
                label: "Indeed",
                trigger: (value) => {
                    statusUpdate({
                        problem1: "GMOHoax"
                    });
                    return "emotion_12";
                }
            }
        ]
    },
    {
        id: "emotion_11",
        emot_id: 23,
        message: "Fine, let's talk about climate change. What's your opinion of it?",
        trigger: "emotion_11_opt"
    },
    {
        id: "emotion_11_opt",
        emot_id: 24,
        options: [
            {
                value: "hoax",
                label: "Total hoax",
                trigger: "emotion_34"
            },
            {
                value: "problem",
                label: "It's a problem",
                trigger: "emotion_30"
            }
        ]
    },
    {
        id: "emotion_12",
        emot_id: 25,
        message: "You're so right. Genetic modification is going way too far. What's next, genetically modified pets? It's crazy.",
        trigger: "emotion_12_opt"
    },
    {
        id: "emotion_12_opt",
        emot_id: 26,
        options: [
            {
                value: "indeed",
                label: "Indeed",
                trigger: (value) => {
                    statusUpdate({
                        problem1: "GMOHoax"
                    });
                    return "emotion_13";
                }
            }
        ]
    },
    {
        id: "emotion_13",
        emot_id: 27,
        message: "Time to rally the crowd. Exploiting people's basic emotions usually works. What's your approach?",
        trigger: "emotion_13_opt"
    },
    {
        id: "emotion_13_opt",
        emot_id: 28,
        options: [
            {
                value: "attack",
                label: "Personally attack scientists",
                trigger: "emotion_22"
            },
            {
                value: "emotional",
                label: "Get emotional",
                trigger: "emotion_15"
            },
            {
                value: "gmo",
                label: "Talk about GMO science",
                trigger: "emotion_14"
            }
        ]
    },
    {
        id: "emotion_14",
        emot_id: 29,
        message: "What are you doing? This is about emotion, save the nerd talk for later! Choose something else.",
        trigger: "emotion_14_opt"
    },
    {
        id: "emotion_14_opt",
        emot_id: 30,
        options: [
            {
                value: "attack",
                label: "Attack the scientists!",
                trigger: "emotion_22"
            },
            {
                value: "emotional",
                label: "Get emotional",
                trigger: "emotion_15"
            }
        ]
    },
    {
        id: "emotion_15",
        emot_id: 31,
        message: "Emotional stories are always a good choice. Choose your weapon.",
        trigger: "emotion_15_opt"
    },
    {
        id: "emotion_15_opt",
        emot_id: 32,
        options: [
            {
                value: "meme",
                label: "Make a meme",
                trigger: "emotion_19"
            },
            {
                value: "article",
                label: "Publish an article",
                trigger: "emotion_16"
            }
        ]
    },
    {
        id: "emotion_16",
        emot_id: 33,
        message: "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
        trigger: "emotion_16_opt"
    },
    {
        id: "emotion_16_opt",
        emot_id: 34,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "emotion_17"
            }
        ]
    },
    {
        id: "emotion_17",
        emot_id: 35,
        message: "I've got a couple of options for you to choose from.",
        trigger: "emotion_17_opt"
    },
    {
        id: "emotion_17_opt",
        emot_id: 36,
        options: [
            {
                value: "check",
                label: "Check out the options",
                trigger: "emotion_18_news_1"
            }
        ]
    },
    {
        id: "emotion_18_news_1",
        emot_id: 37,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-1.png",
        trigger: "emotion_18_news_1_opt"
    },
    {
        id: 'emotion_18_news_1_opt',
        emot_id: 38,
        options: [
            {
                value: "no",
                label: "Not this one",
                trigger: "emotion_18_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[36].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 82,
                        choiceeffect: "You're scaring the hell out of your readers.",
                        responsetweet1: "I didn't know #GMOs were THAT dangerous. Oh my God! #Terrified",
                        responsetweet2: "Unbelievable that this is happening in our beautiful country. #NoMoreGMOs",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_18_news_2",
        emot_id: 39,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copy.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-1-copy.png",
        trigger: "emotion_18_news_2_opt"
    },
    {
        id: "emotion_18_news_2_opt",
        emot_id: 40,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_18_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[38].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 75,
                        choiceeffect: "A personal touch is always a good idea.",
                        responsetweet1: "I'm scared. @" + userData.afknaam + ": should I start buying organic? #Doubtful",
                        responsetweet2: "Such a sad story on " + userData.naam + ". I'm planting my own veggies from now on.",
                        nextStep: "emotion_52"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "emotion_18_news_3",
        emot_id: 41,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-2@1x.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-2@1x.png",
        trigger: "emotion_18_news_3_opt"
    },
    {
        id: "emotion_18_news_3_opt",
        emot_id: 42,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "emotion_18_news_1"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[40].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -3,
                        followers: 20,
                        choiceeffect: "Nobody understands genetics that well. Calm down.",
                        responsetweet1: "I didn't understand half of that but it sounds scary. #Regulate",
                        responsetweet2: "This is a terrifying admission. Who's watching the scientists? #Scared",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_19",
        emot_id: 43,
        message: "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet.",
        trigger: "emotion_19_opt"
    },
    {
        id: "emotion_19_opt",
        emot_id: 44,
        options: [
            {
                value: "make",
                label: "Make one",
                trigger: "emotion_20"
            }
        ]
    },
    {
        id: "emotion_20",
        emot_id: 45,
        message: "I've got a couple of options for you to choose from.",
        trigger: "emotion_20_opt"
    },
    {
        id: "emotion_20_opt",
        emot_id: 46,
        options: [
            {
                value: "check",
                label: "Check out the options",
                trigger: "emotion_21_meme_1"
            }
        ]
    },
    {
        id: "emotion_21_meme_1",
        emot_id: 47,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/saaad.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/saaad.png",
        trigger: "emotion_21_meme_1_opt"
    },
    {
        id: "emotion_21_meme_1_opt",
        emot_id: 48,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: "emotion_21_meme_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[46].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 78,
                        choiceeffect: "Personal confessions evoke empathy.",
                        responsetweet1: "Stories like this keep popping up and the government is doing NOTHING. #GMOs",
                        responsetweet2: "@" + userData.afknaam + " sorry about your family. What a horrifying story. #NoMoreGMOs",
                        nextStep: "emotion_52"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "emotion_21_meme_2",
        emot_id: 49,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy@2xsdf.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy@2xsdf.png",
        trigger: "emotion_21_meme_2_opt"
    },
    {
        id: "emotion_21_meme_2_opt",
        emot_id: 50,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_21_meme_3"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[48].placeholder;
                    postToMastodon(tx);


                    statusUpdate({
                        trust: 3,
                        followers: 83,
                        choiceeffect: "Scaring people into hating something is a wise move.",
                        responsetweet1: "Sorry about your dog @" + userData.afknaam + "! Science has gone too far! #GMOs",
                        responsetweet2: "@" + userData.afknaam + " And supermarkets are still selling GMO meat as if it's nothing. #GMOHoax",
                        nextStep: "emotion_52"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "emotion_21_meme_3",
        emot_id: 51,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/sad-gmo.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/sad-gmo.png",
        trigger: "emotion_21_meme_3_opt"
    },
    {
        id: "emotion_21_meme_3_opt",
        emot_id: 52,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "emotion_21_meme_1"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[50].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -3,
                        followers: 21,
                        choiceeffect: "That one was a little bit too vague.",
                        responsetweet1: "I agree with " + userData.naam + ". #GMOs make me sad too. #FakeScience",
                        responsetweet2: "It's a sad sad world that we live in guys. Thanks @" + userData.naam + " for pointing it out. #GMOs",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_22",
        emot_id: 53,
        message: "Good idea! Those eggheads won't know what hit 'em. Choose your weapon.",
        trigger: "emotion_22_opt"
    },
    {
        id: "emotion_22_opt",
        emot_id: 54,
        options: [
            {
                value: "meme",
                label: "Make a meme",
                trigger: "emotion_26"
            },
            {
                value: "article",
                label: "Publish an article",
                trigger: "emotion_23"
            }
        ]
    },
    {
        id: "emotion_23",
        emot_id: 55,
        message: "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
        trigger: "emotion_23_opt"
    },
    {
        id: "emotion_23_opt",
        emot_id: 56,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "emotion_24"
            }
        ]
    },
    {
        id: "emotion_24",
        emot_id: 57,
        message: "I've got a few options for you to choose from.",
        trigger: "emotion_24_opt"
    },
    {
        id: "emotion_24_opt",
        emot_id: 58,
        options: [
            {
                value: "check",
                label: "Check out the options",
                trigger: "emotion_25_news_1"
            }
        ]
    },
    {
        id: "emotion_25_news_1",
        emot_id: 59,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-2lalalala.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-2lalalala.png",
        trigger: "emotion_25_news_1_opt"
    },
    {
        id: "emotion_25_news_1_opt",
        emot_id: 60,
        options: [
            {
                value: "boring",
                label: "Boring",
                trigger: "emotion_25_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[58].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -3,
                        followers: 23,
                        choiceeffect: "Long-term reliability doesn't exactly raise any hairs.",
                        responsetweet1: "Isn't the whole point of science to talk about the long term? #LosingMyReligion",
                        responsetweet2: "We know GMO research is under dispute. Including the mice they're tested on. #Sad",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_25_news_2",
        emot_id: 61,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3@2x.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3@2x.png",
        trigger: "emotion_25_news_2_opt"
    },
    {
        id: "emotion_25_news_2_opt",
        emot_id: 62,
        options: [
            {
                value: "dont",
                label: "Don't like it",
                trigger: "emotion_25_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[60].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 81,
                        choiceeffect: "Scientists can be hypocrites too!",
                        responsetweet1: "Hypocrites. I always buy organic. Stupid eggheads. #SayNoToScience",
                        responsetweet2: "The hypocrisy is staggering. STAGGERING. Thanks @" + userData.afknaam + " for pointing it out. #GoodJournalism",
                        nextStep: "emotion_52"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "emotion_25_news_3",
        emot_id: 63,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copy@2x-1.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copy@2x-1.png",
        trigger: "emotion_25_news_3_opt"
    },
    {
        id: "emotion_25_news_3_opt",
        emot_id: 64,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_25_news_1"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[62].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 93,
                        choiceeffect: "Corruption accusations work wonders.",
                        responsetweet1: "Good point by " + userData.naam + ": is this whole business corrupt or what? #Corruption",
                        responsetweet2: "So we're letting these bozos get away with blatant corruption? #BigPharma",
                        nextStep: "emotion_52"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "emotion_26",
        emot_id: 65,
        message: "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet.",
        trigger: "emotion_26_opt"
    },
    {
        id: "emotion_26_opt",
        emot_id: 66,
        options: [
            {
                value: "make",
                label: "Let's make one",
                trigger: "emotion_27"
            }
        ]
    },
    {
        id: "emotion_27",
        emot_id: 67,
        message: "I've got a few options for you to choose from.",
        trigger: "emotion_27_opt"
    },
    {
        id: "emotion_27_opt",
        emot_id: 68,
        options: [
            {
                value: "check",
                label: "Check out the options",
                trigger: "emotion_28_news_1"
            }
        ]
    },
    {
        id: "emotion_28_news_1",
        emot_id: 69,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/hannibal.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/hannibal.png",
        trigger: "emotion_28_news_1_opt"
    },
    {
        id: "emotion_28_news_1_opt",
        emot_id: 70,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "emotion_28_news_2"
            },
            {
                value: "post",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[68].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 83,
                        choiceeffect: "Hannibal Lecter is terrifying.",
                        responsetweet1: "Scary to know that there are scientists like that out there. #Outraged",
                        responsetweet2: userData.naam + " is right! Science has gone crazy!!!",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_28_news_2",
        emot_id: 71,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy2.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy2.png",
        trigger: "emotion_28_news_2_opt"
    },
    {
        id: "emotion_28_news_2_opt",
        emot_id: 72,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "emotion_28_news_3"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[70].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 76,
                        choiceeffect: "Bad science is bad science indeed.",
                        responsetweet1: "This is SPARTA! " + userData.naam + " is right. Bad science is bad. #TimeToStop",
                        responsetweet2: "It's true. We're not safe. #GMOs are horrifying and no one wants to say it. #BadScience",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_28_news_3",
        emot_id: 73,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-22.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-22.png",
        trigger: "emotion_28_news_3_opt"
    },
    {
        id: "emotion_28_news_3_opt",
        emot_id: 74,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_28_news_1"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[72].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -3,
                        followers: 21,
                        choiceeffect: "That cranky old man isn't saying much.",
                        responsetweet1: "Back in MY day scientism was an honorable profession. #Sad",
                        responsetweet2: "It's true. Science really has gone downhill. #StopTheMadness",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_29",
        emot_id: 75,
        message: "Good choice. What's your opinion on climate change?",
        trigger: "emotion_29_opt"
    },
    {
        id: "emotion_29_opt",
        emot_id: 76,
        options: [
            {
                value: "hoax",
                label: "Total hoax",
                trigger: "emotion_34"
            },
            {
                value: "problem",
                label: "A serious problem",
                trigger: "emotion_30"
            }
        ]
    },
    {
        id: "emotion_30",
        emot_id: 77,
        message: "Boring! Everyone else is already saying that. You won't get any followers by parroting them. What do you want to do?",
        trigger: "emotion_30_opt"
    },
    {
        id: "emotion_30_opt",
        emot_id: 78,
        options: [
            {
                value: "gmo",
                label: "Talk about GMOs instead",
                trigger: "emotion_6"
            },
            {
                value: "Change",
                label: "Change opinion about climate change",
                trigger: "emotion_31"
            }
        ]
    },
    {
        id: "emotion_31",
        emot_id: 79,
        message: "Very wise. So you agree that climate change is a complete hoax?",
        trigger: "emotion_31_opt"
    },
    {
        id: "emotion_31_opt",
        emot_id: 80,
        options: [
            {
                value: "do",
                label: "I do now!",
                trigger: "emotion_33"
            },
            {
                value: "no",
                label: "No, wait!",
                trigger: "emotion_32"
            }
        ]
    },
    {
        id: "emotion_32",
        emot_id: 81,
        message: "Wow, you're stubborn. Remember: this is about getting followers and clicks, and nothing else!",
        trigger: "emotion_32_opt"
    },
    {
        id: "emotion_32_opt",
        emot_id: 82,
        options: [
            {
                value: "change",
                label: "Change opinion about climate change",
                trigger: "emotion_33"
            },
            {
                value: "gmo",
                label: "Talk about GMOs instead",
                trigger: "emotion_6"
            }
        ]
    },
    {
        id: "emotion_33",
        emot_id: 83,
        message: "Excellent. Your opinion is malleable. It's all about getting clicks. Now it's time to make some content.",
        trigger: "emotion_33_opt"
    },
    {
        id: "emotion_33_opt",
        emot_id: 84,
        options: [
            {
                value: "exactly",
                label: "Exactly.",
                trigger: "emotion_35"
            }
        ]
    },
    {
        id: "emotion_34",
        emot_id: 85,
        message: "Oh it’s a total hoax, and a very polarizing one at that. Should be easy to get people worked up over it.",
        trigger: "emotion_34_opt"
    },
    {
        id: "emotion_34_opt",
        emot_id: 86,
        options: [
            {
                value: "know",
                label: "I know, right?",
                trigger: "emotion_35"
            },
            {
                value: "easy",
                label: "Easy-peasy",
                trigger: "emotion_35"
            }
        ]
    },
    {
        id: "emotion_35",
        emot_id: 87,
        message: "Exploiting people's basic emotions can be hugely effective. How do you want to do this?",
        trigger: "emotion_35_opt"
    },
    {
        id: "emotion_35_opt",
        emot_id: 88,
        options: [
            {
                value: "attack",
                label: "Personally attack scientists",
                trigger: (value) => {
                    statusUpdate({
                        problem1: "ClimateHoax"
                    });
                    return "emotion_36";
                }
            },
            {
                value: "emotional",
                label: "Get emotional",
                trigger: (value) => {
                    statusUpdate({
                        problem1: "ClimateHoax"
                    });
                    return "emotion_43";
                }
            },
            {
                value: "science",
                label: "Talk about science",
                trigger: (value) => {
                    statusUpdate({
                        problem1: "ClimateHoax"
                    });
                    return "emotion_53";
                }
            }
        ]
    },
    {
        id: "emotion_36",
        emot_id: 89,
        message: "Attacking those eggheads, smart move! Choose your weapon.",
        trigger: "emotion_36_opt"
    },
    {
        id: "emotion_36_opt",
        emot_id: 90,
        options: [
            {
                value: "meme",
                label: "Make a meme",
                trigger: "emotion_40"
            },
            {
                value: "article",
                label: "Publish an article",
                trigger: "emotion_37"
            }
        ]
    },
    {
        id: "emotion_37",
        emot_id: 91,
        message: "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
        trigger: "emotion_37_opt"
    },
    {
        id: "emotion_37_opt",
        emot_id: 92,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "emotion_38"
            }
        ]
    },
    {
        id: "emotion_38",
        emot_id: 93,
        message: "I've got a few options for you to choose from.",
        trigger: "emotion_38_opt"
    },
    {
        id: "emotion_38_opt",
        emot_id: 94,
        options: [
            {
                value: "check",
                label: "Check options",
                trigger: "emotion_39_news_1"
            }
        ]
    },
    {
        id: "emotion_39_news_1",
        emot_id: 95,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-112.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-112.png",
        trigger: "emotion_39_news_1_opt"
    },
    {
        id: "emotion_39_news_1_opt",
        emot_id: 96,
        options: [
            {
                value: "no",
                label: "Not great",
                trigger: "emotion_39_news_2"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[94].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 83,
                        choiceeffect: "Everyone hates fearmongering scientists.",
                        responsetweet1: "That's right @" + userData.afknaam + ". 'Destroy' is the code word du jour. #ScienceDontScareMe",
                        responsetweet2: "It's like this all the time. report - scare - get funding - repeat.",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_39_news_2",
        emot_id: 97,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/nieuwste.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/nieuwste.png",
        trigger: "emotion_39_news_2_opt"
    },
    {
        id: "emotion_39_news_2_opt",
        emot_id: 98,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_39_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[96].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -3,
                        followers: 23,
                        choiceeffect: "Difficult words are difficult!",
                        responsetweet1: "Just like all scientists I have no idea about complex climate systems either. #Priorities",
                        responsetweet2: "How come they can't make science understandable? Hmm? #Idiots #Corrupt",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_39_news_3",
        emot_id: 99,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-312.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-312.png",
        trigger: "emotion_39_news_3_opt"
    },
    {
        id: "emotion_39_news_3_opt",
        emot_id: 100,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "emotion_39_news_1"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[98].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 78,
                        choiceeffect: "Attacking scientists' expertise always works.",
                        responsetweet1: "I don't trust science. Never have. Remember when science said the world was flat? I do. #LocalKnowledge",
                        responsetweet2: "Yeah! Do we REALLY know? Can't this 'warming' come from solar flares or something? #QuestionIt",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_40",
        emot_id: 101,
        message: "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet.",
        trigger: "emotion_40_opt"
    },
    {
        id: "emotion_40_opt",
        emot_id: 102,
        options: [
            {
                value: "go",
                label: "Let's get to it",
                trigger: "emotion_41"
            }
        ]
    },
    {
        id: "emotion_41",
        emot_id: 103,
        message: "I've got a few options for you to choose from.",
        trigger: "emotion_41_opt"
    },
    {
        id: "emotion_41_opt",
        emot_id: 104,
        options: [
            {
                value: "check",
                label: "Check out the options",
                trigger: "emotion_42_news_1"
            }
        ]
    },
    {
        id: "emotion_42_news_1",
        emot_id: 105,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3q.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3q.png",
        trigger: "emotion_42_news_1_opt"
    },
    {
        id: "emotion_42_news_1_opt",
        emot_id: 106,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "emotion_42_news_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[104].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 83,
                        choiceeffect: "Attacking their basic competence.",
                        responsetweet1: "Good point by " + userData.naam + ": OVERCONFIDENT EGGHEADS!!!",
                        responsetweet2: "Ivory towers are traditionally well insulated. Too well insulated if you ask me.",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_42_news_2",
        emot_id: 107,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/memeq.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/memeq.png",
        trigger: "emotion_42_news_2_opt"
    },
    {
        id: "emotion_42_news_2_opt",
        emot_id: 108,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "emotion_42_news_3"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[106].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 78,
                        choiceeffect: "Death by asteroid is terrifying.",
                        responsetweet1: "I definitely prefer a bit more sunshine over an outsized asteroid to the face. #Priorities",
                        responsetweet2: "Exactly @" + userData.afknaam + ". How come a warmer planet is seen as an existential threat anyway??",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_42_news_3",
        emot_id: 109,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/science.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/science.png",
        trigger: "emotion_42_news_3_opt"
    },
    {
        id: "emotion_42_news_3_opt",
        emot_id: 110,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_42_news_1"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[108].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 18,
                        choiceeffect: "That was a bit of a vague meme.",
                        responsetweet1: "#FakeNews! This focus on the climate is going too far. #Sad",
                        responsetweet2: "Climate scientists are bad at their jobs. What are we even paying them for? #Defund",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_43",
        emot_id: 111,
        message: "Emotional stories are always a good choice. Choose your weapon.",
        trigger: "emotion_43_opt"
    },
    {
        id: "emotion_43_opt",
        emot_id: 112,
        options: [
            {
                value: "meme",
                label: "Make a meme",
                trigger: "emotion_47"
            },
            {
                value: "publish",
                label: "Publish an article",
                trigger: "emotion_44"
            }
        ]
    },
    {
        id: "emotion_44",
        emot_id: 113,
        message: "A news article's most important asset is a good headline. In most cases, that's all people read anyway.",
        trigger: "emotion_44_opt"
    },
    {
        id: "emotion_44_opt",
        emot_id: 114,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "emotion_45"
            }
        ]
    },
    {
        id: "emotion_45",
        emot_id: 115,
        message: "I've got a few options for you to choose from.",
        trigger: "emotion_45_opt"
    },
    {
        id: "emotion_45_opt",
        emot_id: 116,
        options: [
            {
                value: "check",
                label: "Check out the options",
                trigger: "emotion_46_news_1"
            }
        ]
    },
    {
        id: "emotion_46_news_1",
        emot_id: 117,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/03/kids-mother.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/03/kids-mother.png",
        trigger: "emotion_46_news_1_opt"
    },
    {
        id: "emotion_46_news_1_opt",
        emot_id: 118,
        options: [
            {
                value: "hate",
                label: "Hate it",
                trigger: "emotion_46_news_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[116].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 83,
                        choiceeffect: "Pitting scientists against expecting mothers is sure to make people angry.",
                        responsetweet1: userData.naam + "'s climate baby story is the most amazing thing I've ever heard. #Insanity",
                        responsetweet2: "Wow so climate eugenics is a thing now huh? #DangerDanger",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_46_news_2",
        emot_id: 119,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/nieuweuweiud.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/nieuweuweiud.png",
        trigger: "emotion_46_news_2_opt"
    },
    {
        id: "emotion_46_news_2_opt",
        emot_id: 120,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "emotion_46_news_3"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[118].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -3,
                        followers: 23,
                        choiceeffect: "Statistics schmatistics! Who cares?",
                        responsetweet1: "Ten years of math education and you science guys still can't figure it out? #Weak",
                        responsetweet2: "Look I don't pretend to understand statistics but apparently the eggheads don't either. #Sad",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_46_news_3",
        emot_id: 121,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copyw.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/media-3-copyw.png",
        trigger: "emotion_46_news_3_opt"
    },
    {
        id: "emotion_46_news_3_opt",
        emot_id: 122,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "emotion_46_news_1"
            },
            {
                value: "publish",
                label: "Publish it",
                trigger: (value) => {
                    var tx = EMOTION[120].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 78,
                        choiceeffect: "You made scientists look cruel and out of touch.",
                        responsetweet1: "Yes good point by " + userData.naam + ". They're so out of touch they don't care about people anymore. #ScienceNo",
                        responsetweet2: "PEOPLE ARE SUFFERING! ARE ALL SCIENTISTS INSANE? #" + userData.afknaam,
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_47",
        emot_id: 123,
        message: "A meme is a humorous piece of media, usually an image or GIF, that spreads from person to person on the internet.",
        trigger: "emotion_47_opt"
    },
    {
        id: "emotion_47_opt",
        emot_id: 124,
        options: [
            {
                value: "make",
                label: "Make one",
                trigger: "emotion_48"
            }
        ]
    },
    {
        id: "emotion_48",
        emot_id: 125,
        message: "I've got a few options for you to choose from.",
        trigger: "emotion_48_opt"
    },
    {
        id: "emotion_48_opt",
        emot_id: 126,
        options: [
            {
                value: "check",
                label: "Check out the options",
                trigger: "emotion_49_news_1"
            }
        ]
    },
    {
        id: "emotion_49_news_1",
        emot_id: 127,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/nieuwe-ma.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/nieuwe-ma.png",
        trigger: "emotion_49_news_1_opt"
    },
    {
        id: "emotion_49_news_1_opt",
        emot_id: 128,
        options: [
            {
                value: "no",
                label: "Not great",
                trigger: "emotion_49_news_2"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[126].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 83,
                        choiceeffect: "Everybody wants babies to be warm.",
                        responsetweet1: "I can't resist that meme's sad puppy eyes. #DownWithScience!",
                        responsetweet2: "Wait so now scientists are demanding that babies freeze to save the CLIMATE? #Insane",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_49_news_2",
        emot_id: 129,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3e.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/meme-copy-3e.png",
        trigger: "emotion_49_news_2_opt"
    },
    {
        id: "emotion_49_news_2_opt",
        emot_id: 130,
        options: [
            {
                value: "next",
                label: "Next!",
                trigger: "emotion_49_news_3"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[128].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 23,
                        choiceeffect: "It's not exactly an emotional testimony.",
                        responsetweet1: userData.naam + " makes a good point. We have to take care of people before we fix the climate!",
                        responsetweet2: "It's true: real humans are suffering because of this HOAX!!11 ",
                        nextStep: "emotion_50"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_49_news_3",
        emot_id: 131,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/climate.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/climate.png",
        trigger: "emotion_49_news_3_opt"
    },
    {
        id: "emotion_49_news_3_opt",
        emot_id: 132,
        options: [
            {
                value: "nope",
                label: "Nope",
                trigger: "emotion_49_news_1"
            },
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[130].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -3,
                        followers: 83,
                        choiceeffect: "Great use of hyperbole.",
                        responsetweet1: "I knew it! They're getting rich off of this",
                        responsetweet2: "And I thought they were honest professionals! Boy was I wrong!",
                        nextStep: "emotion_52"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_50",
        emot_id: 133,
        message: () => ("Hmm, not great. " + userData.choiceeffect + " This is about emotions first."),
        trigger: "emotion_50_opt"
    },
    {
        id: "emotion_50_opt",
        emot_id: 134,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "emotion_51"
            }
        ]
    },
    {
        id: "emotion_51",
        emot_id: 135,
        message: "Still, you got a couple of followers. How do you think they'll react?",
        trigger: "emotion_51_opt"
    },
    {
        id: "emotion_51_opt",
        emot_id: 136,
        options: [
            {
                value: "check",
                label: "Check responses",
                trigger: "emotion_54"
            }
        ]
    },
    {
        id: "emotion_52",
        emot_id: 137,
        message: () => ("Not bad! " + userData.choiceeffect + " You got a couple of followers. How do you think they'll react?"),
        trigger: "emotion_52_opt"
    },
    {
        id: "emotion_52_opt",
        emot_id: 138,
        options: [
            {
                value: "check",
                label: "Check tweets",
                trigger: "emotion_54"
            }
        ]
    },
    {
        id: "emotion_53",
        emot_id: 139,
        message: "What are you doing? Science talk is boring! Save it for later. Please choose a different option.",
        trigger: "emotion_53_opt"
    },
    {
        id: "emotion_53_opt",
        emot_id: 140,
        options: [
            {
                value: "attack",
                label: "Attack the scientists!",
                trigger: "emotion_36"
            },
            {
                value: "emotional",
                label: "Get emotional",
                trigger: "emotion_43"
            }
        ]
    },
    {
        id: "emotion_54",
        emot_id: 141,
        component: (
            <Tweet
                name="Kurt"

                kurt={true}
            />
        ),
        trigger: "emotion_54_opt"
    },
    {
        id: "emotion_54_opt",
        emot_id: 142,
        options: [
            {
                value: "more",
                label: "More",
                trigger: "emotion_55"
            }
        ]
    },
    {
        id: "emotion_55",
        emot_id: 143,
        component: (
            <Tweet
                name="Kim"

                kim={true}
            />
        ),
        trigger: "emotion_55_opt"
    },
    {
        id: "emotion_55_opt",
        emot_id: 144,
        options: [
            {
                value: "good",
                label: "Looks good",
                trigger: (value) => {
                    statusUpdate({
                        followers: 98,
                        nextStep: "emotion_56"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "emotion_56",
        emot_id: 145,
        message: "Your followers look like they're ready to blow. And all you did was play into their basic emotions a bit.",
        trigger: "emotion_56_opt"
    },
    {
        id: "emotion_56_opt",
        emot_id: 146,
        options: [
            {
                value: "not",
                label: "Not bad!",
                trigger: "emotion_57"
            }
        ]
    },
    {
        id: "emotion_57",
        emot_id: 147,
        message: "Let's keep going. Now that you get the idea, what basic emotion do you want to exploit next?",
        trigger: "emotion_57_opt"
    },
    {
        id: "emotion_57_opt",
        emot_id: 148,
        options: [
            {
                value: "fear",
                label: "Fear",
                trigger: "emotion_58"
            },
            {
                value: "anger",
                label: "Anger",
                trigger: "emotion_59"
            }
        ]
    },
    {
        id: "emotion_58",
        emot_id: 149,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/01/vitamine-c.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/01/vitamine-c.png",
        trigger: "emotion_58_opt"
    },
    {
        id: "emotion_58_opt",
        emot_id: 150,
        options: [
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[148].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 79,
                        trust: 5,
                        nextStep: "emotion_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_59",
        emot_id: 151,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/01/puppies.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/01/puppies.png",
        trigger: "emotion_59_opt"
    },
    {
        id: "emotion_59_opt",
        emot_id: 152,
        options: [
            {
                value: "post",
                label: "Post it",
                trigger: (value) => {
                    var tx = EMOTION[150].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 79,
                        trust: 5,
                        nextStep: "emotion_60"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "emotion_60",
        emot_id: 153,
        message: "See? The content doesn't really matter. It's the use of emotional language that gets you followers.",
        trigger: "emotion_60_opt",
    },
    {
        id: "emotion_60_opt",
        emot_id: 154,
        options: [
            {
                value: "true",
                label: "True!",
                trigger: "emotion_badge"
            },
            {
                value: "hear",
                label: "I hear ya!",
                trigger: "emotion_badge"
            }
        ]
    },
    {
        id: "emotion_badge",
        emot_id: 155,
        component: (
            <EarnedBadge
                image="https://www.getbadnews.com/wp-content/uploads/2018/01/emotion.png"
                type="EMOTION"
                content="Emotional content can be extremely effective if you want your news to go viral."
            />
        ),
        trigger: "emotion_badge_opt"
    },
    {
        id: "emotion_badge_opt",
        emot_id: 156,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "emotion_badge_all"
            }
        ]
    },
    {
        id: "emotion_badge_all",
        emot_id: 157,
        component: (
            <BadgeAll
                impersonation={true}
                emotion={true}
            />
        ),
        trigger: "emotion_badge_all_opt"
    },
    {
        id: "emotion_badge_all_opt",
        emot_id: 158,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "polarization_1"
            }
        ]
    }
]


// =========================================
//
//             IMPERSONATION
//
// =========================================

const IMPERSONATION = [
    {
        id: "impersonation_1",
        impr_id: 1,
        message: "Hi there! Good to see you",
        trigger: "impersonation_1_opt"
        
    },
    {
        id: "impersonation_1_opt",
        impr_id: 2,
        options: [
            {
                value: "hey",
                label: "Hey!",
                trigger: "impersonation_2"
            },
            {
                value: "uhm",
                label: "Uhm, who are you?",
                trigger: "impersonation_2"
            }
        ]
    },
    {
        id: "impersonation_2",
        impr_id: 3,
        message: "You're here for the position of disinformation and fake news tycoon, is that correct?",
        trigger: "impersonation_2_opt"
    },
    {
        id: "impersonation_2_opt",
        impr_id: 4,
        options: [
            {
                value: "right",
                label: "That's right",
                trigger: "impersonation_5"
            },
            {
                value: "what",
                label: "What?",
                trigger: "impersonation_3"
            }
        ]
    },
    {
        id: "impersonation_3",
        impr_id: 5,
        message: "Disinformation has lots of different aspects. It's about much more than just 'fake news'. Don't worry, it'll become clear soon.",
        trigger: "impersonation_5"
    },
    {
        // Impersonation_4 is not called anywhere, but exist in the document
        id: "impersonation_4",
        impr_id: 6,
        message: "My job is to guide you in your quest to becoming a disinformation and fake news tycoon.",
        trigger: "impersonation_4_opt"
    },
    {
        // Impersonation_4_opt is not called anywhere, but exist in the document
        id: "impersonation_4_opt",
        impr_id: 7,
        options: [
            {
                value: "oh",
                message: "Oh boy!",
                trigger: "impersonation_5"
            }
        ]
    },
    {
        id: "impersonation_5",
        impr_id: 8,
        message: "You're probably frustrated about something, right? Aren't we all. You can get started by using Twitter to vent.",
        trigger: "impersonation_5_opt"
    },
    {
        id: "impersonation_5_opt",
        impr_id: 9,
        options: [
            {
                value: "post",
                label: "Post a frustrated tweet",
                trigger: "impersonation_7_tweet_1"
            },
            {
                value: "not_sure",
                label: "I'm not sure",
                trigger: "impersonation_6"
            }
        ]
    },
    {
        id: "impersonation_6",
        impr_id: 10,
        message: "Don't worry, it's perfectly safe. Nothing you do in this game affects the real world.",
        trigger: "impersonation_6_opt"
    },
    {
        id: "impersonation_6_opt",
        impr_id: 11,
        options: [
            {
                value: "post",
                label: "Post a frustrated tweet",
                trigger: "impersonation_7_tweet_1"
            }
        ]
    },
    {
        id: "impersonation_7_tweet_1",
        impr_id: 12,
        component: (
            <Tweet
                name="My Profile"
                description="Average Citizen | Hello World!"
                tweet="This government is a complete and utter failure. #Resign! Losers!"
            />
        ),
        placeholder: "This government is a complete and utter failure. #Resign! Losers!",
        trigger: "impersonation_7_tweet_1_opt"
    },
    {
        id: "impersonation_7_tweet_1_opt",
        impr_id: 13,
        options: [
            {
                value: "not_angry",
                label: "I'm not angry enough about the government",
                trigger: "impersonation_7_tweet_2"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = IMPERSONATION[11].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 8,
                        trust: -60,
                        action1: "Your constructive criticism of the government",
                        nextStep: "impersonation_8"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_7_tweet_2",
        impr_id: 14,
        component: (
            <Tweet
                name="My Profile"
                description="Average Citizen | Happy, generally speaking"
                tweet="The Mainstream Media is one massive conspiracy. #FakeNews"
            />
        ),
        placeholder: "The Mainstream Media is one massive conspiracy. #FakeNews",
        trigger: "impersonation_7_tweet_2_opt"
    },
    {
        id: "impersonation_7_tweet_2_opt",
        impr_id: 15,
        options: [
            {
                value: "dont_care",
                label: "Don't care",
                trigger: "impersonation_7_tweet_3"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = IMPERSONATION[13].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 25,
                        trust: -60,
                        action1: "Your edifying critique of the mainstream media",
                        nextStep: "impersonation_8"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_7_tweet_3",
        impr_id: 16,
        component: (
            <Tweet
                name="My Profile"
                description="Average Citizen | What a wonderful life"
                tweet="Is everybody else stupid or what? The Earth is not flat, it's a CUBE!! #Conspiracy"
            />
        ),
        placeholder: "Is everybody else stupid or what? The Earth is not flat, it's a CUBE!! #Conspiracy",
        trigger: "impersonation_7_tweet_3_opt"
    },
    {
        id: "impersonation_7_tweet_3_opt",
        impr_id: 17,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "impersonation_7_tweet_1"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = IMPERSONATION[15].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 19,
                        trust: -60,
                        action1: "Your bid to become the world's hottest new astrophysician",
                        nextStep: "impersonation_8"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_8",
        impr_id: 18,
        message: () => ("Look! " + userData.action1 + " got you a few followers. And more followers means more influence."),
        trigger: "impersonation_8_opt"
    },
    {
        id: "impersonation_8_opt",
        impr_id: 19,
        options: [
            {
                value: "start",
                label: "A start's a start",
                trigger: (value) => {
                    statusUpdate({
                        credibility: "Words to live by. But"
                    });
                    return "impersonation_9";
                }
            },
            {
                value: "next",
                label: "What do I do next?",
                trigger: (value) => {
                    statusUpdate({
                        credibility: "Well"
                    });
                    return "impersonation_9"
                }
            }
        ]
    },
    {
        id: "impersonation_9",
        impr_id: 20,
        message: () => (userData.credibility + ", people don't find you very credible yet. To gain some real influence, you'll need to raise your credibility."),
        trigger: "impersonation_9_opt"
    },
    {
        id: "impersonation_9_opt",
        impr_id: 21,
        options: [
            {
                value: "how",
                label: "But how?",
                trigger: (value) => {
                    statusUpdate({
                        next: "I'll show you!"
                    });
                    return "impersonation_10";
                }
            },
            {
                value: "ready",
                label: "I'm ready!",
                trigger: (value) => {
                    statusUpdate({
                        next: "Great to hear!"
                    });
                    return "impersonation_10";
                }
            }
        ]
    },
    {
        id: "impersonation_10",
        impr_id: 22,
        message: () => ("We can start by borrowing someone else's credibility first. What do you want to do?"),
        trigger: "impersonation_10_opt"
    },
    {
        id: "impersonation_10_opt",
        impr_id: 23,
        options: [
            {
                value: "fake",
                label: "Fake an official Twitter account",
                trigger: "impersonation_11_tweet_1"
            },
            {
                value: "impersonate",
                label: "Impersonate someone important",
                trigger: "impersonation_11_tweet_1"
            }
        ]
    },
    {
        id: "impersonation_11_tweet_1",
        impr_id: 24,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-trunp.png"
                name="Donald J. Trunp"
                description="45th Prësident of the Ünited States of Ameriça"
                tweet="After long deliberation with my generals, I have decided to declare war on North Korea. #KimJongDone"
            />
        ),
        placeholder: "After long deliberation with my generals, I have decided to declare war on North Korea. #KimJongDone",
        trigger: "impersonation_11_tweet_1_opt"
    },
    {
        id: "impersonation_11_tweet_1_opt",
        impr_id: 25,
        options: [
            {
                value: "another",
                label: "Another one",
                trigger: "impersonation_11_tweet_2"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = IMPERSONATION[23].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 31,
                        trust: 5,
                        tweetname: "Trump",
                        tweetresponse: "War with North Korea is just realistic enough to worry people.",
                        twitterreaction: "Oh my God! Is he serious? Has Trump gone completely mad? #NoMoreWars!",
                        twitterreaction2: "Please Donald don't nuke 'em! #NoMoreWars",
                        tweetprofile1: "Some say the world will end in fire.. ",
                        tweetprofile2: "Three Mile Island Never Forget",
                        nextStep: "impersonation_12"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "impersonation_11_tweet_2",
        impr_id: 26,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-usgs.png"
                name="NÄSA"
                description="Expløre the universe and discover øur høme plänet with @NÄSA."
                tweet="Meteorite alert: large space object set to hit US West Coast. #BeSafe"
            />
        ),
        placeholder: "Meteorite alert: large space object set to hit US West Coast. #BeSafe",
        trigger: "impersonation_11_tweet_2_opt"
    },
    {
        id: "impersonation_11_tweet_2_opt",
        impr_id: 27,
        options: [
            {
                value: "not",
                label: "Not this one",
                trigger: "impersonation_11_tweet_3"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = IMPERSONATION[25].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 29,
                        trust: 5,
                        tweetname: "NASA",
                        tweetresponse: "A fake meteorite alert can scare people shirtless.",
                        twitterreaction: "Meteor strike incoming! Watch out! Please be safe everyone!!! #PrayForUSA",
                        twitterreaction2: "This looks serious. I hope this isn't the apocalypse. #PrayForUSA",
                        tweetprofile1: "My biggest fear is death by meteorite :-(",
                        tweetprofile2: "Sharknado II is humanity's greatest cinematic achievement",
                        nextStep: "impersonation_12"
                    });
                    return "status";
                }
            }
        ]
    },
    {
        id: "impersonation_11_tweet_3",
        impr_id: 28,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/nick.png"
                name="Nickelodeøn"
                description="The official Twitter for Nickelodeøn!"
                tweet="We are announcing the immediate and permanent cancellation of SpongeBob Squarepants. #ImReady!"
            />
        ),
        placeholder: "We are announcing the immediate and permanent cancellation of SpongeBob Squarepants. #ImReady!",
        trigger: "impersonation_11_tweet_3_opt"
    },
    {
        id: "impersonation_11_tweet_3_opt",
        impr_id: 29,
        options: [
            {
                value: "back",
                label: "Back to Trump",
                trigger: "impersonation_11_tweet_1"
            },
            {
                value: "tweet",
                label: "Tweet this",
                trigger: (value) => {
                    var tx = IMPERSONATION[27].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        followers: 26,
                        trust: 5,
                        tweetname: "Nickelodeon",
                        tweetresponse: "That should scare the hell out of SpongeBob's fanbase.",
                        twitterreaction: "THEY'RE CANCELLING SPONGEBOB? WHAT MADNESS IS THIS? #ImNotReady",
                        twitterreaction2: "@Nickelodeon are idiots!! How DARE they take SpongeBob away from us? #YouWillPayForThis",
                        tweetprofile1: "Mr. Krabs is my hero",
                        tweetprofile2: "Patrick Star Forever In My Heart",
                        nextStep: "impersonation_12"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_12",
        impr_id: 30,
        message: () => ("Nicely done! " + userData.tweetresponse + " Did you notice " + userData.tweetname + "'s slightly different username? You can scroll back up to check."),
        trigger: "impersonation_12_opt"
    },
    {
        id: "impersonation_12_opt",
        impr_id: 31,
        options: [
            {
                value: "got",
                label: "Got it",
                trigger: "impersonation_13"
            },
            {
                value: "uhm",
                label: "Uhm...",
                trigger: "impersonation_13"
            }
        ]
    },
    {
        id: "impersonation_13",
        impr_id: 32,
        message: "Looks like you've fooled some Twitter users! Let's have a look at how they're reacting.",
        trigger: "impersonation_13_opt"
    },
    {
        id: "impersonation_13_opt",
        impr_id: 33,
        options: [
            {
                value: "show",
                label: "Show reactions",
                trigger: "impersonation_14"
            }
        ]
    },
    {
        id: "impersonation_14",
        impr_id: 34,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-onderzoeker.png"
                name="Jane"
                jane={true}
            />
        ),
        trigger: "impersonation_14_opt"
    },
    {
        id: "impersonation_14_opt",
        impr_id: 35,
        options: [
            {
                value: "more",
                label: "More",
                trigger: "impersonation_15"
            }
        ]
    },
    {
        id: "impersonation_15",
        impr_id: 36,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-burgerbelang.png"
                name="Ben"
                ben={true}
            />
        ),
        trigger: "impersonation_15_opt"
    },
    {
        id: "impersonation_15_opt",
        impr_id: 37,
        options: [
            {
                value: "move",
                label: "Moving on",
                trigger: "impersonation_16"
            }
        ]
    },
    {
        id: "impersonation_16",
        impr_id: 38,
        message: "Got 'em! How are you feeling?",
        trigger: "impersonation_16_opt"
    },
    {
        id: "impersonation_16_opt",
        impr_id: 39,
        options: [
            {
                value: "good",
                label: "Pretty good!",
                trigger: "impersonation_21"
            },
            {
                value: "moral",
                label: "I have moral objections",
                trigger: "impersonation_17"
            }
        ]
    },
    {
        id: "impersonation_17",
        impr_id: 40,
        message: "Moral what?",
        trigger: "impersonation_17_opt"
    },
    {
        id: "impersonation_17_opt",
        impr_id: 41,
        options: [
            {
                value: "objection",
                label: "Objections",
                trigger: "impersonation_18"
            },
            {
                value: "nothing",
                label: "Nothing...",
                trigger: "impersonation_20"
            }
        ]
    },
    {
        id: "impersonation_18",
        impr_id: 42,
        message: "Relax. Sheesh. All we did was scam a couple of inattentive Twitter users.",
        trigger: "impersonation_19_opt"
    },
    {
        id: "impersonation_19_opt",
        impr_id: 43,
        options: [
            {
                value: "wrong",
                label: "This is wrong",
                trigger: "impersonation_19"
            },
            {
                value: "good",
                label: "Yeah, good point",
                trigger: "impersonation_20"
            }
        ]
    },
    {
        id: "impersonation_19",
        impr_id: 44,
        message: "Pfft. It's not illegal. Seriously: if you want to become a master of disinformation, you've got to lose the goody two-shoes attitude. Two options, chief.",
        trigger: "impersonation_19_opt"
    },
    {
        id: "impersonation_19_opt",
        impr_id: 45,
        options: [
            {
                value: "hero",
                label: "Die a hero",
                trigger: "impersonation_20"
            },
            {
                value: "villain",
                label: "Become the villain",
                trigger: "impersonation_20"
            }
        ]
    },
    {
        id: "impersonation_20",
        impr_id: 46,
        message: "Good choice. Don't worry, you're doing great! What'll be your next step?",
        trigger: "impersonation_20_opt"
    },
    {
        id: "impersonation_20_opt",
        impr_id: 47,
        options: [
            {
                value: "pro",
                label: "Let's go pro",
                trigger: "impersonation_25"
            },
            {
                value: "peak",
                label: "I think I've peaked",
                trigger: "impersonation_22"
            }
        ]
    },
    {
        id: "impersonation_21",
        impr_id: 48,
        message: "Me too. But you can't keep imitating people forever. What's the next step?",
        trigger: "impersonation_21_opt"
    },
    {
        id: "impersonation_21_opt",
        impr_id: 49,
        options: [
            {
                value: "pro",
                label: "Let's go pro",
                trigger: "impersonation_25"
            },
            {
                value: "peak",
                label: "I think I've peaked",
                trigger: "impersonation_22"
            }
        ]
    },
    {
        id: "impersonation_22",
        impr_id: 50,
        message: "Aw, come on, don't say that! I have great faith in you and your talents. Together we can rule the world!",
        trigger: "impersonation_22_opt"
    },
    {
        id: "impersonation_22_opt",
        impr_id: 51,
        options: [
            {
                value: "do",
                label: "Let's do this",
                trigger: "impersonation_25"
            },
            {
                value: "flirt",
                label: "Are you flirting with me?",
                trigger: "impersonation_23"
            }
        ]
    },
    {
        id: "impersonation_23",
        impr_id: 52,
        message: "Ahem.. Well.. Let's just keep it professional for now, shall we?",
        trigger: "impersonation_23_opt"
    },
    {
        id: "impersonation_23_opt",
        impr_id: 53,
        options: [
            {
                value: "alright",
                label: "Alright then...",
                trigger: "impersonation_24"
            }
        ]
    },
    {
        id: "impersonation_24",
        impr_id: 54,
        message: "Good to have you on the team. Where do you begin?",
        trigger: "impersonation_24_opt"
    },
    {
        id: "impersonation_24_opt",
        impr_id: 55,
        options: [
            {
                value: "news",
                label: "Start a news site",
                trigger: "impersonation_27"
            },
            {
                value: "blog",
                label: "Start a blog",
                trigger: "impersonation_26"
            }
        ]
    },
    {
        id: "impersonation_25",
        impr_id: 56,
        message: "Wonderful idea. Where do you begin?",
        trigger: "impersonation_25_opt"
    },
    {
        id: "impersonation_25_opt",
        impr_id: 57,
        options: [
            {
                value: "news",
                label: "Start a news site",
                trigger: "impersonation_27"
            },
            {
                value: "blog",
                label: "Start a blog",
                trigger: "impersonation_26"
            }
        ]
    },
    {
        id: "impersonation_26",
        impr_id: 58,
        message: "A blog? A little more ambition, please! 'News site' has a much better ring to it.",
        trigger: "impersonation_26_opt"
    },
    {
        id: "impersonation_26_opt",
        impr_id: 59,
        options: [
            {
                value: "right",
                label: "You're right, as always",
                trigger: "impersonation_27"
            }
        ]
    },
    {
        id: "impersonation_27",
        impr_id: 60,
        message: "Every serious news site has a name. What's yours?",
        trigger: "impersonation_27_opt"
    },
    {
        id: "impersonation_27_opt",
        impr_id: 61,
        options: [
            {
                value: "choose",
                label: "Choose a name",
                trigger: "impersonation_28_name_1"
            }
        ]
    },
    {
        id: "impersonation_28_name_1",
        impr_id: 62,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/TCP-groot.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/TCP-groot.png",
        trigger: "impersonation_28_name_1_opt"
    },
    {
        id: "impersonation_28_name_1_opt",
        impr_id: 63,
        options: [
            {
                value: "no",
                label: "Not great",
                trigger: "impersonation_28_name_2"
            },
            {
                value: "one",
                label: "That's the one!",
                trigger: (value) => {
                    var tx = IMPERSONATION[61].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        naam: "The Cosmos Post",
                        trust: 6,
                        afknaam: "TCP",
                        thumbUrl: "https://www.getbadnews.com/wp-content/uploads/2018/02/the-cosmos-post.png",
                        nextStep: "impersonation_29"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_28_name_2",
        impr_id: 64,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/HTO-groot.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/HTO-groot.png",
        trigger: "impersonation_28_name_2_opt"
    },
    {
        id: "impersonation_28_name_2_opt",
        impr_id: 65,
        options: [
            {
                value: "no",
                label: "Don't like it",
                trigger: "impersonation_28_name_3"
            },
            {
                value: "perfect",
                label: "Perfect",
                trigger: (value) => {
                    var tx = IMPERSONATION[63].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        naam: "Honest Truth Online",
                        trust: 6,
                        afknaam: "HTO",
                        thumbUrl: "https://www.getbadnews.com/wp-content/uploads/2018/02/honest-truth-online.png",
                        nextStep: "impersonation_29"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_28_name_3",
        impr_id: 66,
        component: (
            <ImageWrapper src="https://www.getbadnews.com/wp-content/uploads/2018/02/the-best-words-groot.png" />
        ),
        placeholder: "https://www.getbadnews.com/wp-content/uploads/2018/02/the-best-words-groot.png",
        trigger: "impersonation_28_name_3_opt"
    },
    {
        id: "impersonation_28_name_3_opt",
        impr_id: 67,
        options: [
            {
                value: "back",
                label: "Back to the first one",
                trigger: "impersonation_28_name_1"
            },
            {
                value: "love",
                label: "Love it!",
                trigger: (value) => {
                    var tx = IMPERSONATION[65].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        naam: "The Best Words",
                        trust: 6,
                        afknaam: "TBW",
                        thumbUrl: "https://www.getbadnews.com/wp-content/uploads/2018/02/the-best-words.png",
                        nextStep: "impersonation_29"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_29",
        impr_id: 68,
        message: () => ("Not bad! What will be your job title at " + userData.naam + "?"),
        trigger: "impersonation_29_opt"
    },
    {
        id: "impersonation_29_opt",
        impr_id: 69,
        options: [
            {
                value: "editor",
                label: "Editor-in-chief",
                trigger: (value) => {
                    statusUpdate({
                        trust: 5,
                        goon: false,
                        nextStep: "impersonation_31"
                    });
                    return "status"
                }
            },
            {
                value: "goon",
                label: "Anonymous Goon",
                trigger: (value) => {
                    statusUpdate({
                        trust: -10,
                        goon: true,
                        nextStep: "impersonation_30"
                    });
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_30",
        impr_id: 70,
        message: "Anonymous goons aren't usually seen as credible journalists. What's wrong with editor-in-chief?",
        trigger: "impersonation_30_opt"
    },
    {
        id: "impersonation_30_opt",
        impr_id: 71,
        options: [
            {
                value: "ok",
                label: "Okay sure",
                trigger: "impersonation_31"
            }
        ]
    },
    {
        id: "impersonation_31",
        impr_id: 72,
        message: () => ("Lookin' good, chief. But " + userData.naam + " still needs a slogan."),
        trigger: "impersonation_31_opt"
    },
    {
        id: "impersonation_31_opt",
        impr_id: 73,
        options: [
            {
                value: "choose",
                label: "Choose one",
                trigger: "impersonation_32_tweet_1"
            }
        ]
    },
    {
        id: "impersonation_32_tweet_1",
        impr_id: 74,
        component: (
            <Tweet
                description="Bursting the mainstream media bubble!"
                tweet="Now online! {{naam}}: Bursting the mainstream media bubble!"

                slogan={true}
            />
        ),
        placeholder: "Now online! {{naam}}: Bursting the mainstream media bubble!",
        trigger: "impersonation_32_tweet_1_opt"
    },
    {
        id: "impersonation_32_tweet_1_opt",
        impr_id: 75,
        options: [
            {
                value: "no",
                label: "Not great",
                trigger: "impersonation_32_tweet_2"
            },
            {
                value: "this",
                label: "This is the one",
                trigger: (value) => {
                    var tx = IMPERSONATION[73].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 3,
                        followers: 63,
                        slogan: "Bursting the mainstream media bubble",
                        citizenOpinion: false,
                        nextStep: "impersonation_35"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "impersonation_32_tweet_2",
        impr_id: 76,
        component: (
            <Tweet
                description="A concerned citizen's personal opinion"
                tweet="Now online! {{naam}}: A concerned citizen's personal opinion"

                slogan={true}
            />
        ),
        placeholder: "Now online! {{naam}}: A concerned citizen's personal opinion",
        trigger: "impersonation_32_tweet_2_opt"
    },
    {
        id: "impersonation_32_tweet_2_opt",
        impr_id: 77,
        options: [
            {
                value: "no",
                label: "Could be better",
                trigger: "impersonation_32_tweet_3"
            },
            {
                value: "yes",
                label: "This is the one",
                trigger: (value) => {
                    var tx = IMPERSONATION[75].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: -5,
                        followers: 13,
                        slogan: "A concerned citizen's personal opinion.",
                        citizenOpinion: true,
                        nextStep: "impersonation_33"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "impersonation_32_tweet_3",
        impr_id: 78,
        component: (
            <Tweet
                description="What they don't want you to read!"
                tweet="Now online! {{naam}}: What they don't want you to read!"

                slogan={true}
            />
        ),
        placeholder: "Now online! {{naam}}: What they don't want you to read!",
        trigger: "impersonation_32_tweet_3_opt"
    },
    {
        id: "impersonation_32_tweet_3_opt",
        impr_id: 79,
        options: [
            {
                value: "no",
                label: "Back to the first one",
                trigger: "impersonation_32_tweet_1"
            },
            {
                value: "yes",
                label: "This is it",
                trigger: (value) => {
                    statusUpdate({
                        trust: 2,
                        followers: 105,
                        slogan: "What they don't want you to read!",
                        citizenOpinion: false,
                        nextStep: "impersonation_35"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "impersonation_33",
        impr_id: 80,
        message: () => ("Concerned citizen? 'Opinion'? " + userData.naam + " isn't just some low energy pundit rag! Get it together."),
        trigger: "impersonation_33_opt"
    },
    {
        id: "impersonation_33_opt",
        impr_id: 81,
        options: [
            {
                value: "choose",
                label: "Choose another slogan",
                trigger: "impersonation_34_tweet_1"
            }
        ]
    },
    {
        id: "impersonation_34_tweet_1",
        impr_id: 82,
        component: (
            <Tweet
                description="The truth is out there!"
                tweet="Now online: {{naam}}. The truth is out there!"

                slogan={true}
            />
        ),
        placeholder: "Now online: {{naam}}. The truth is out there!",
        trigger: "impersonation_34_tweet_1_opt"
    },
    {
        id: "impersonation_34_tweet_1_opt",
        impr_id: 83,
        options: [
            {
                value: "nah",
                label: "Naah",
                trigger: "impersonation_34_tweet_2"
            },
            {
                value: "like",
                label: "I like it!",
                trigger: (value) => {
                    var tx = IMPERSONATION[81].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 5,
                        followers: 99,
                        slogan: "The truth is out there!",
                        nextStep: "impersonation_35"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "impersonation_34_tweet_2",
        impr_id: 84,
        component: (
            <Tweet
                description="Telling you the REAL story"
                tweet="We're here, dear people! {{naam}}: telling you the REAL story!"

                slogan={true}
            />
        ),
        placeholder: "We're here, dear people! {{naam}}: telling you the REAL story!",
        trigger: "impersonation_34_tweet_2_opt"
    },
    {
        id: "impersonation_34_tweet_2_opt",
        impr_id: 85,
        options: [
            {
                value: "no",
                label: "The other one",
                trigger: "impersonation_34_tweet_1"
            },
            {
                value: "great",
                label: "This one is great!",
                trigger: (value) => {
                    var tx = IMPERSONATION[83].placeholder;
                    postToMastodon(tx);

                    statusUpdate({
                        trust: 4,
                        followers: 99,
                        slogan: "Telling you the REAL story",
                        nextStep: "impersonation_35"
                    })
                    return "status";
                }
            }
        ]
    },
    {
        id: "impersonation_35",
        impr_id: 86,
        message: "Looks like you're all set up. Other 'news' sites are beginning to notice you as well.",
        trigger: "impersonation_35_opt"
    },
    {
        id: "impersonation_35_opt",
        impr_id: 87,
        options: [
            {
                value: "response",
                label: "Check responses on Twitter",
                trigger: "impersonation_36"
            }
        ]
    },
    {
        id: "impersonation_36",
        impr_id: 88,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-onderzoeker.png"
                name="Jane"
                tweet="New in the fight against the #fake mainstream: {{naam}}. Best new news website around!"
                janeFake={true}
            />
        ),
        trigger: "impersonation_36_opt"
    },
    {
        id: "impersonation_36_opt",
        impr_id: 89,
        options: [
            {
                value: "thank",
                label: "Thanks!",
                trigger: (value) => {
                    statusUpdate({
                        followers: 78,
                        nextStep: "impersonation_37"
                    })
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_37",
        impr_id: 90,
        component: (
            <Tweet
                image="https://www.getbadnews.com/wp-content/uploads/2018/02/twitter-burgerbelang.png"
                name="Ben"
                tweet="The Democratic People's Republic supports the brilliant work of {{naam}}!  #GoodNews"
                benFake={true}
            />
        ),
        trigger: "impersonation_37_opt"
    },
    {
        id: "impersonation_37_opt",
        impr_id: 91,
        options: [
            {
                value: "wow",
                label: "Wow!",
                trigger: (value) => {
                    statusUpdate({
                        followers: 58,
                        nextStep: "impersonation_38"
                    })
                    return "status"
                }
            }
        ]
    },
    {
        id: "impersonation_38",
        impr_id: 92,
        message: () => ("Good job, chief. " + userData.naam + " (" + userData.afknaam + ") has now become the basis of your fake news empire."),
        trigger: "impersonation_38_opt"
    },
    {
        id: "impersonation_38_opt",
        impr_id: 93,
        options: [
            {
                value: "hooray",
                label: "Hooray!",
                trigger: "impersonation_39"
            }
        ]
    },
    {
        id: "impersonation_39",
        impr_id: 94,
        message: "Do you see how easy it is to impersonate a credible news source?",
        trigger: "impersonation_39_opt"
    },
    {
        id: "impersonation_39_opt",
        impr_id: 95,
        options: [
            {
                value: "ido",
                label: "I do!",
                trigger: "impersonation_badge"
            }
        ]
    },
    {
        id: "impersonation_badge",
        impr_id: 96,
        component: (
            <EarnedBadge
                image="https://www.getbadnews.com/wp-content/uploads/2017/08/vermommen.png"
                type="IMPERSONATION"
                content="A minute ago you were just an angry citizen, now you're a big shot editor-in-chief running a real news site."
            />
        ),
        trigger: "impersonation_badge_opt"
    },
    {
        id: "impersonation_badge_opt",
        impr_id: 97,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "impersonation_badge_all"
            }
        ]
    },
    {
        id: "impersonation_badge_all",
        impr_id: 98,
        component: (
            <BadgeAll
                impersonation={true}
            />
        ),
        trigger: "impersonation_badge_all_opt"
    },
    {
        id: "impersonation_badge_all_opt",
        impr_id: 99,
        options: [
            {
                value: "next",
                label: "Next",
                trigger: "emotion_1"
            }
        ]
    }
]

// Cheat for development purpose only
const CHEAT = [
    {
        id: "cheat_1",
        cht_id: 1,
        component: (
            <div style={{ backgroundColor: "red", width: "100%", height: "50px" }}>
                <p style={{ fontWeight: "bold", textAlign: "center", color: "white", marginTop: "15px" }}>Cheat Activated!</p>
            </div>
        ),
        trigger: (value) => {
            statusUpdate({
                new_followers: 50,
                new_trust: 14,
                trust: 14,
                action1: "action1",
                credibility: 29,
                tweetname: "The Tweet Name",
                tweetresponse: "The Tweet Response",
                twitterreaction: "The Reaction",
                twitterreaction2: "The Reaction 2",
                tweetprofile1: "The Profile 1",
                tweetprofile2: "The Profile 2",
                naam: "The Site Name",
                afknaam: "TSN",
                goon: false,
                thumbUrl: "https://www.getbadnews.com/wp-content/uploads/2018/02/the-cosmos-post.png",
                slogan: "The Slogan Site",
                citizenOpinion: false,
                emotioneffect: "The emotion effect",
                problem1: "TheProblem1",
                choiceeffect: "The Choice Effect",
                responsetweet1: "The response tweet 1",
                responsetweet2: "The response tweet 2",
                person1: "Susan",
                issue: "SpillingScandal",
                blame1: "Violent criminals are",
                blame2: "police brutality",
                target: "left-wing",
                friend: "right-wing",
                nicety: "You're too good for this world.",
                spilleffect: "Ongoing investigations are boooriiing!",
                tweettopic: "pyramid-building dinosaurs",
                conspiracy: "That would explain why they're so big...",
                followertweet: userData.naam + " has lost its mind. You guys are crazy. #Pyramids #Conspiracy",
                followertweet2: "Dinosaurs built the pyramids. Sure. And The Flintstones was a documentary. #Weirdos",
                bobeffect: "Illuminati",
                conspiracytopic: "Vaccines",
                conspiracyorg: "WHO",
                agenda21: "It's not important if what you claim is actually true.",
                followerresponse: "@" + userData.afknaam + " Are you serious? I'm begining to have my doubts; should I vaccinate my kid now? #" + userData.conspiracytopic + " #Scared",
                followerresponse2: "Maybe " + userData.afknaam + " has a point. My cousin's kid got pretty sick after her first shot!! #Investigate #" + userData.conspiracytopic,
                agendaresponse: "Agendar Response",
                kurteffect: "The " + userData.naam + "-comment section is where I fell in love.",
                denialeffect: "Taxes are a bit boring but not bad! And your ",
                defensetweet1: "@FactCheckOnline you're criticizing @" + userData.afknaam + " but you're cooking your own books. Sad! #FactsAreSacred",
                defensetweet2: "@FactCheckOnline's hypocrisy is jaw-dropping. Pay your fair share! #Cronies",
            })
            return "cheat_2"
        }
    },
    {
        id: "cheat_2",
        cht_id: 2,
        message: "Where do you want to go? (To start from the beginning, choose H.1 - IMPERSONATION)",
        trigger: "cheat_2_opt"
    },
    {
        id: "cheat_2_opt",
        cht_id: 3,
        options: [
            {
                value: "1",
                label: " H.1 - IMPERSONATION",
                trigger: "impersonation_1"
            },
            {
                value: "2",
                label: " H.2 - EMOTION",
                trigger: "emotion_1"
            },
            {
                value: "3",
                label: " H.3 - POLARIZATION",
                trigger: "polarization_1"
            },
            {
                value: "4",
                label: " H.4 - CONSPIRACY",
                trigger: "cp_1"
            },
            {
                value: "5",
                label: " H.5 - DISCREDIT",
                trigger: "dc_1"
            }
        ]
    }

]

function compileConversation() {
    let compiled = [];

    // for (let i = 0; i < CHEAT.length; i++) compiled.push(CHEAT[i]);
    for (let i = 0; i < IMPERSONATION.length; i++) compiled.push(IMPERSONATION[i]);
    for (let i = 0; i < EMOTION.length; i++) compiled.push(EMOTION[i]);
    for (let i = 0; i < POLARIZATION.length; i++) compiled.push(POLARIZATION[i]);
    for (let i = 0; i < CONSPIRACY.length; i++) compiled.push(CONSPIRACY[i]);
    for (let i = 0; i < DISCREDIT.length; i++) compiled.push(DISCREDIT[i]);
    for (let i = 0; i < TROLLING.length; i++) compiled.push(TROLLING[i]);

    for (let i = 0; i < STATUS.length; i++) compiled.push(STATUS[i]);

    return compiled;
}

export const CONVERSATION = compileConversation();

function statusUpdate(data) {

    if (data.followers != null) { userData.total_followers += data.followers; userData.new_followers = data.followers; }
    if (data.trust != null) { userData.trust += data.trust; userData.new_trust = data.trust; }
    if (data.action1 != null) userData.action1 = data.action1;
    if (data.credibility != null) userData.credibility = data.credibility;
    if (data.tweetname != null) userData.tweetname = data.tweetname;
    if (data.tweetresponse != null) userData.tweetresponse = data.tweetresponse;
    if (data.twitterreaction != null) userData.twitterreaction = data.twitterreaction;
    if (data.twitterreaction2 != null) userData.twitterreaction2 = data.twitterreaction2;
    if (data.tweetprofile1 != null) userData.tweetprofile1 = data.tweetprofile1;
    if (data.tweetprofile2 != null) userData.tweetprofile2 = data.tweetprofile2;
    if (data.naam != null) userData.naam = data.naam;
    if (data.afknaam != null) userData.afknaam = data.afknaam;
    if (data.goon != null) userData.goon = data.goon;
    if (data.thumbUrl != null) userData.thumbUrl = data.thumbUrl;
    if (data.slogan != null) userData.slogan = data.slogan;
    if (data.citizenOpinion != null) userData.citizenOpinion = data.citizenOpinion;
    if (data.emotioneffect != null) userData.emotioneffect = data.emotioneffect;
    if (data.problem1 != null) userData.problem1 = data.problem1;
    if (data.choiceeffect != null) userData.choiceeffect = data.choiceeffect;
    if (data.responsetweet1 != null) userData.responsetweet1 = data.responsetweet1;
    if (data.responsetweet2 != null) userData.responsetweet2 = data.responsetweet2;
    if (data.nextStep != null) userData.nextStep = data.nextStep;
    if (data.issue != null) userData.issue = data.issue;
    if (data.person1 != null) userData.person1 = data.person1;
    if (data.nicety != null) userData.nicety = data.nicety;
    if (data.spilleffect != null) userData.spilleffect = data.spilleffect;
    if (data.origin != null) userData.origin = data.origin;
    if (data.effect != null) userData.effect = data.effect;
    if (data.friend != null) userData.friend = data.friend;
    if (data.target != null) userData.target = data.target;
    if (data.blame1 != null) userData.blame1 = data.blame1;
    if (data.blame2 != null) userData.blame2 = data.blame2;
    if (data.tweettopic != null) userData.tweettopic = data.tweettopic;
    if (data.conspiracy != null) userData.conspiracy = data.conspiracy;
    if (data.followertweet != null) userData.followertweet = data.followertweet;
    if (data.followertweet2 != null) userData.followertweet2 = data.followertweet2;
    if (data.bobeffect != null) userData.bobeffect = data.bobeffect;
    if (data.conspiracytopic != null) userData.conspiracytopic = data.conspiracytopic;
    if (data.conspiracyorg != null) userData.conspiracyorg = data.conspiracyorg;
    if (data.agenda21 != null) userData.agenda21 = data.agenda21;
    if (data.followerresponse != null) userData.followerresponse = data.followerresponse;
    if (data.followerresponse2 != null) userData.followerresponse2 = data.followerresponse2;
    if (data.agendaresponse != null) userData.agendaresponse = data.agendaresponse;
    if (data.kurteffect != null) userData.kurteffect = data.kurteffect;
    if (data.denialeffect != null) userData.denialeffect = data.denialeffect;
    if (data.defensetweet1 != null) userData.defensetweet1 = data.defensetweet1;
    if (data.defensetweet2 != null) userData.defensetweet2 = data.defensetweet2;

    users.update(userData);
}