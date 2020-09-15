import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

import './style.css';
import { CONVERSATION } from './conversation';

const theme = {
    background: '#fff',
    // fontFamily: 'GT-Pressura-Mono,Helvetica,Arial,sans-serif',
    headerBgColor: '#000',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#EFEFEF',
    botFontColor: '#000',
    userBubbleColor: '#127FFE',
    userFontColor: '#fff',
};

class Chatbot extends React.Component {

    render() {
        return (
            <div className="chatbot-wrapper">
                <ThemeProvider theme={theme}>
                    <ChatBot
                        headerTitle="Bad News"
                        steps={CONVERSATION}
                        floating={true}
                        opened={true}
                        hideBotAvatar={true}
                        hideUserAvatar={true}
                        style={{
                            // width: "100%"
                        }}
                    />
                </ThemeProvider>
            </div>
        );
    }
}

export default Chatbot;