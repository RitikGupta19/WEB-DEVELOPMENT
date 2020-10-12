import React from 'react';
import { connect } from 'react-redux';

const PostItem = () => {
  return (
    <div>
      Items Post
    </div>
  );
}

PostItem.propTypes = {

}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(PostItem);
