import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';

const Post = ({getPost, post: {post, loading}, match}) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [])

  return loading || post === null ? <Spinner /> : <Fragment>
  <Link to="/posts" className="btn">Back To Posts</Link>
   <PostItem showActions={false} post={post} />
   <CommentForm postId={post._id} />
  </Fragment>;
}

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  post: state.post,
})

export default connect(mapStateToProps, {getPost})(Post);
