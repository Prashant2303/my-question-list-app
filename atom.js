import { atom } from "recoil"

export const stateUser = atom({
    key: 'stateUser',
    default: {}
})

export const stateQuestions = atom({
    key: 'stateQuestions',
    default: []
})

export const stateShouldFetch = atom({
    key: 'stateShouldFetch',
    default: true
})