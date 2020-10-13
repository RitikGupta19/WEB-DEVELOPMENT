import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { addLikes, deletePosts, removeLikes } from '../../actions/post';

const PostItem = ({ deletePosts, addLikes, removeLikes ,auth, post: { _id, text, name, avatar, user, likes, comments, date }, showActions}) => {
  console.log(showActions)
  return (
    <div class="posts">
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img
              class="round-img"
              src={avatar}
              alt=""
            />
            <h4>{name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{text}</p>
          <p class="post-date">
            Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
          </p>
          {showActions && <Fragment>
            <button type="button" class="btn btn-light" onClick={(e) => addLikes(_id)}>
            <i class="fas fa-thumbs-up"></i>{' '}
            {likes.length > 0 && (<span>{likes.length}</span>)}          
          </button>
          <button type="button" class="btn btn-light" onClick={(e) => removeLikes(_id)} >
            <i class="fas fa-thumbs-down"></i>
          </button>
          <Link  to={`/posts/${_id}`} class="btn btn-primary">{' '}
            Discussion {comments.length > 0 && (<span class='comment-count'>{comments.length}</span>)}
          </Link>
          {!auth.loading && user === auth.user.user._id && (
            <button
            type="button"
            class="btn btn-danger"
            onClick={(e) => deletePosts(_id)}
          >
          <i class="fas fa-times"></i>
          </button>
          )}
            </Fragment>}
        </div>
      </div>
    </div>
  );
}
PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeLikes: PropTypes.func.isRequired,
  deletePosts: PropTypes.func.isRequired,
  showActions: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {addLikes, removeLikes, deletePosts})(PostItem);
