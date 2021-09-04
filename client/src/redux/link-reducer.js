import {linkAPI} from "../api/api";
import {deleteMessage, setMessage} from "./auth-reducer";

const SET_LINK = 'SET_LINK'
const SET_LINKS = 'SET_LINKS'
const SET_LOADING = 'SET_LOADING'
const SET_PROCESSING = 'SET_PROCESSING'
const SET_CREATED = 'SET_CREATED'
const SET_CHECK = 'SET_CHECK'
const SET_CONFIRM = 'SET_CONFIRM'
const CHANGE_TEXTARIA = 'CHANGE_TEXTARIA'
const SET_MESSAGE_SAVE = 'SET_MESSAGE_SAVE'
const DELETE_MESSAGE_SAVE = 'DELETE_MESSAGE_SAVE'


const storageName = 'userData'

let initialState = {
    link: "",
    links: [],
    messageSave: [],
    loading: false,
    isTruePassword: false,
    check: {},


    activeCreateNote: true,
    activeProcesing: false,
    activeCreated: false,


};


export const linkReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LINK:
            return {
                ...state, link: action.link,
                isTruePassword: true
            }
        case SET_LINKS:
            return {
                ...state, links: action.links
            }
        case SET_LOADING:
            return {
                ...state, loading: action.bool
            }

        case SET_PROCESSING:
            return {
                ...state,
                activeCreateNote: false,
                activeProcesing: true,
                activeCreated: false
            }
        case SET_CREATED:
            return {
                ...state,
                activeCreateNote: false,
                activeProcesing: false,
                activeCreated: true
            }


        case SET_CHECK:
            return {
                ...state, check: action.data
            }
        case SET_CONFIRM:
            return {
                ...state, check: {...state.check, confirm: false}
            }
        case SET_MESSAGE_SAVE:
            return {
                ...state,
                messageSave: { message: action.message, status: action.status },
            };
        case DELETE_MESSAGE_SAVE:
            return {
                ...state, messageSave: {message: null, status: null}
            }
        case CHANGE_TEXTARIA:
            return {
                ...state, links: state.links.map(link => {

                    if (link.short === action.short) {
                        return {...link, text: action.text}
                    }

                    return link
                })
            }


        default:
            return state;
    }
}


export const setLinkActions = (link) => ({type: SET_LINK, link})
export const changeTextAria = (short, text) => ({type: CHANGE_TEXTARIA, short, text})
export const setLinksActions = (links) => ({type: SET_LINKS, links})

export const setMessageSave = (message, status) => ({type: SET_MESSAGE_SAVE, message, status})
export const deleteMessageSave = () => ({type: DELETE_MESSAGE_SAVE})
export const setLoading = (bool) => ({type: SET_LOADING, bool})
export const setProcesing = () => ({type: SET_PROCESSING})
export const setCreated = () => ({type: SET_CREATED})
export const setConfirm = () => ({type: SET_CONFIRM})
export const setCheck = (data) => ({type: SET_CHECK, data})


// создание ссылки устройств
export const createLinks = (form, link) => async (dispatch) => {
    dispatch(deleteMessage());
    try {
        dispatch(setProcesing())
        const data = await linkAPI.create(form, link)
        dispatch(setLinkActions(data))
        dispatch(setCreated())

    } catch (e) {
        dispatch(setLoading(false))
        dispatch(setMessage(e.message, 'error'));
    }

}

// получение ссылок
export const getLinks = () => async (dispatch) => {

    dispatch(deleteMessage());
    try {
        dispatch(setLoading(true))

        const data = await linkAPI.get()
        dispatch(setLinksActions(data))
        dispatch(setLoading(false))


    } catch (e) {
        dispatch(setLoading(false))
        dispatch(setMessage(e.message, 'error'));

    }

}
export const saveText = (id, text) => async (dispatch) => {

    dispatch(deleteMessageSave);
    try {
        dispatch(setLoading(true))

        const data = await linkAPI.saveText(id, text, localStorage.getItem(storageName))

        dispatch(setLinksActions(data.links))
        dispatch(setLoading(false))
        dispatch(setMessageSave(data.message, 'success'));

    } catch (e) {
        dispatch(setLoading(false))
        dispatch(setMessageSave(e.message, 'error'));

    }

}

export const getLink = (id, password) => async (dispatch) => {
    dispatch(deleteMessage());
    try {
        dispatch(setLoading(true))

        const data = await linkAPI.getLink(id, password)
        dispatch(setLinkActions(data))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
        dispatch(setMessage(e.message, 'error'));
    }

}

export const deleteLink = (id) => async (dispatch) => {

    dispatch(deleteMessage());
    try {
        dispatch(setLoading(true))

        const data = await linkAPI.deleteLink(id)
        dispatch(setLinkActions(data))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
        dispatch(setMessage(e.message, 'error'));
    }

}

export const checkLink = (id) => async (dispatch) => {
    dispatch(deleteMessage());
    try {
        dispatch(setLoading(true))

        const data = await linkAPI.checkLink(id)
        dispatch(setCheck(data))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
        dispatch(setMessage(e.message, 'error'));
    }

}
export const deleteBD = () => async (dispatch) => {
    dispatch(deleteMessage());
    try {
        dispatch(setLoading(true))

        const data = await linkAPI.deleteBd(localStorage.getItem(storageName))
        dispatch(setLinksActions(data))
        dispatch(setLoading(false))
    } catch (e) {
        dispatch(setLoading(false))
        dispatch(setMessage(e.message, 'error'));
    }

}




