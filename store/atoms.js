import { atom } from "recoil"

export const stateUser = atom({
    key: 'stateUserKey',
    default: null
})

export const statePrivateLists = atom({
    key: 'statePrivateLists',
    default: null
})

export const stateSelectedList = atom({
    key: 'stateSelectedList',
    default: null
})

export const stateQuestions = atom({
    key: 'stateQuestionsKey',
    default: []
})

export const stateFilter = atom({
    key: 'stateFilter',
    default: {
        filter: false,
        filteredQuestions: [],
    }
})