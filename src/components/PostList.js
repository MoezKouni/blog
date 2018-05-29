import React, { Component } from 'react';
import Post from './Post';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class PostList extends Component {
    render() {
        if (this.props.feedQuery && this.props.feedQuery.loading) {
            return <div>Loading...</div>
        }

        if (this.props.feedQuery && this.props.feedQuery.error) {
            return <div>ERROR</div>
        }

        const postsToRender = this.props.feedQuery.feed.posts
        return(

            <div>
                {postsToRender.map(post => <Post key={post.id} post={post}/> )}
            </div>
        )
    }
}

const FEED_QUERY = gql`
    query FeedQuery {
        feed {
            posts {
                id,
                postContent,
                createdAt,
            }
        }
    }
`
export default graphql(FEED_QUERY, { name: 'feedQuery' }) (PostList)