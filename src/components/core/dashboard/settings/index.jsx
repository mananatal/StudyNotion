import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import ProfileInformation from './ProfileInformation'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

function Settings() {
  return (
    <>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
        </h1>
        <ChangeProfilePicture/>
        <ProfileInformation/>
        <ChangePassword/>
        <DeleteAccount/>
    </>
  )
}

export default Settings