import React from 'react';
import PropTypes from 'prop-types';
import Likes from './Likes';
import Timestamp from './Timestamp';
import AddComment from './AddComment';
import Comments from './Comments';
import styled from 'styled-components';

const CommentSectionDiv = styled.div`
    padding: 15px;
    font-family: 'Roboto', sans-serif;
    width: 100%;
`;

class CommentSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments,
            likes: props.likes,
            newComment: "",
            timestamp: props.timestamp
        }
    }

    changeHandler = (event) => {
        this.setState({ newComment: event.target.value });
    }

    addNewComment = (event) => {
        event.preventDefault();
        if(this.state.newComment !== ""){
            this.setState({
                comments: [
                    ...this.state.comments,
                    {
                        username: window.localStorage.getItem('username'),
                        text: this.state.newComment
                    }
                ],
                newComment: ""
            });
        }
    }

    likeClicked = (event) => {
        let likesHolder = this.state.likes;

        if(event.target.classList.contains("liked")) {
            this.setState({
                likes: --likesHolder
            });
            event.target.classList.remove("liked");
        } else {
            this.setState({
                likes: ++likesHolder
            })
            event.target.classList.add("liked");
        }
    }

    render() {
        return (
            <CommentSectionDiv>
                <Likes likes={this.state.likes} likeClicked={this.likeClicked} />
                <Comments comments={this.state.comments} />
                <Timestamp timestamp={this.state.timestamp} />
                <AddComment
                    addNewComment={this.addNewComment}
                    changeHandler={this.changeHandler}
                    comments={this.state.comments}
                    newComment={this.state.newComment}
                />
            </CommentSectionDiv>
        );
    }
}

CommentSection.propTypes = {
    comments: PropTypes.arrayOf(
        PropTypes.shape({
            username: PropTypes.string,
            text: PropTypes.string
        })),
    likes: PropTypes.number,
    timestamp: PropTypes.string
}

export default CommentSection;