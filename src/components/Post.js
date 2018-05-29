import React, { Component } from 'react';

class Post extends Component {
    render() {
        return (
            <div>
                <div>
                    {this.props.post.postContent}
                </div>
            </div>
        )
    }    
        _likeForPost = async () => {
        
        }
}

export default Post