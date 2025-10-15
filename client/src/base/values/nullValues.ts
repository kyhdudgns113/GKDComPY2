import * as ST from '@shareType'
import * as T from '@type'
import {AUTH_NORMAL} from '@secret'

export const NULL_AUTH_BODY = () => {
  const ret: T.AuthBodyType = {
    jwtFromServer: '',
    commAuth: AUTH_NORMAL,
    commOId: '',
    userId: '',
    userOId: ''
  }
  return ret
}

export const NULL_CARD = (posIdx: number = 0) => {
  const ret: ST.CardType = {
    memOId: '',
    cardName: null,
    posIdx: posIdx,
    skillIdxs: [0, 1, 2],
    skillLevels: [0, 0, 0]
  }
  return ret
}

export const NULL_CLUB = () => {
  const ret: ST.ClubType = {
    chatRoomOId: '',
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

export const NULL_MEMBER = () => {
  const ret: ST.MemberType = {
    batterPower: 0,
    clubOId: '',
    commOId: '',
    deck: Array.from({length: 25}, (_, i) => NULL_CARD(i)),
    lastRecorded: null,
    memberComment: '',
    memOId: '',
    memName: '',
    position: 0,
    pitcherPower: 0
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
