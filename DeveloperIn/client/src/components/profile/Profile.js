import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getProfileById } from '../../actions/profile'
import Spinner from '../layout/Spinner'
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop'

const Profile = ({ getProfileById, profile: { profile, loading }, auth, match }) => {

  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById])
  return (
    <Fragment>
      {profile === null && loading === false ? <Spinner /> : (<Fragment>
        <Link to="/profiles" className="btn btn-light">Back To Profiles</Link>
        {auth.isAuthenticated && auth.loading === false && auth.user.user._id === profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)}
        <div class="profile-grid my-1">
          <ProfileTop profile={profile} />
        </div>
      </Fragment>)}
    </Fragment>
  )
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
})

export default connect(mapStateToProps, { getProfileById })(Profile)
