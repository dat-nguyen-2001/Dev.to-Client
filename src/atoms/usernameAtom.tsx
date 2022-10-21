import { atom } from 'recoil';

const username = sessionStorage.getItem('username')

export const usernameState = atom<string>({
    key: 'userState',
    default: username ? username : ''
})

