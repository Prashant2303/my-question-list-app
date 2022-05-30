import { atom } from "recoil"

export const stateUser = atom({
    key: 'stateUserKey',
    default: {}
})

export const stateQuestions = atom({
    key: 'stateQuestionsKey',
    default: []
})

export const stateShouldFetch = atom({
    key: 'stateShouldFetchKey',
    default: true
})