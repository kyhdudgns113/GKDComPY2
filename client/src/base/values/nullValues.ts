import * as ST from '@shareType'
import * as T from '@type'
import {AUTH_NORMAL} from '@secret'

export const NULL_AUTH_BODY = () => {
  const ret: T.AuthBodyType = {
    jwtFromServer: '',
    commAuth: AUTH_NORMAL,
    userId: '',
    userOId: ''
  }
  return ret
}

export const NULL_CLUB = () => {
  const ret: ST.ClubType = {
    clubName: '',
    clubOId: '',
    commOId: ''
  }
  return ret
}

export const NULL_COMMUNITY = () => {
  const ret: ST.CommunityType = {
    commName: '',
    commOId: '',
    maxUsers: 0,
    maxClubs: 0,
    banClubOId: '',
    subClubOId: ''
  }
  return ret
}

export const NULL_USER = () => {
  const ret: ST.UserType = {
    commAuth: AUTH_NORMAL,
    commOId: '',
    userOId: '',
    userId: ''
  }
  return ret
}
