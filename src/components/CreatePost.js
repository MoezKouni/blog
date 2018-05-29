import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const post = gql`
  mutation post($postContent: String!) {
    post(postContent: $postContent) {
      postContent,
    }
  }
`;

class CreatePost extends Component {
  state = {
    postContent: ''
  };

  _createPost = async () => {
    console.log(this.state)
    await this.props.post({
      variables: {
        postContent: this.state
      }
  });
  this.props.history.push('/')
  };

  render() {
    return (
      <div>
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            value={this.state.postContent}
            onChange={e => this.setState({ postContent: e.target.value })}
            type="text"
            placeholder="Write your post here"
          />
        </div>
        <button onClick={() => this._createPost()}>Submit</button>
      </div>
    );
  }
}

export default graphql(post, { 
  name: 'post' 
})(CreatePost);