import React, { Component } from 'react';

class ImageWrapper extends Component {
    render() {
        return (
            <div>
                <img src={this.props.src} alt="" style={{ width: "95%" }} />
            </div>
        );
    }
}

export default ImageWrapper;