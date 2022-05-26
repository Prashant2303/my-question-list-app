import { atom } from "recoil"

export const stateUser = atom({
    key: 'stateUser',
    default: {}
})

export const stateQuestions = atom({
    key: 'stateQuestions',
    default: []
})

export const stateLoggedIn = atom({
    key: 'stateLoggedIn',
    default: false
})