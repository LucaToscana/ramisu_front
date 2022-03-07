import { createSlice } from "@reduxjs/toolkit";



const totNotifications = () => {
    try { return JSON.parse(localStorage.getItem('notification')).length }
    catch { return 0 }
}
const notifications = () => {
    try { return JSON.parse(localStorage.getItem('notification')) }
    catch {
        localStorage.setItem('notification', [])
        return []
    }
}
const totPrivateChats = () => {
    try { return JSON.parse(localStorage.getItem('messages')).length }
    catch { return 0 }
}
const privateChats = () => {
    try { return JSON.parse(localStorage.getItem('messages')) }
    catch { return [] }
}

const initialState = {
    isOpenNotification: false,
    privateChats: [],
    notifications: notifications(),
    totalNotification: totNotifications(),
    totPrivateChats: totNotifications()
}
export const webSocketSlice = createSlice({

    name: 'webSocket',
    initialState: initialState,
    reducers: {
        initFilter(state) {


        },
        isOpenNotificationStore(state) {
            state.isOpenNotification = !state.isOpenNotification
        },
        deleteNotificationStore(state, payload) {
            state.notifications.splice(payload, 1)
            localStorage.setItem("notification", JSON.stringify(state.notifications))
            if (totNotifications() === 0) {
                state.isOpenNotification = false
                state.totalNotification = 0
            }
        }
        ,
        setTotalNotification(state) {
            try {
                state.totalNotification = JSON.parse(localStorage.getItem('notification').length)
            }
            catch { state.totalNotification = 0 }

        }, onPrivateNotificationStore(state, payload) {
            if (payload.payload.status === "NOTIFICATION") {
                state.notifications.push(payload.payload);
                localStorage.setItem("notification", JSON.stringify(state.notifications))
            }
        }

        , onPrivateMessageStore(state, payload) {
            if (payload.payload.status === "MESSAGE") {
                state.privateChats.push(payload.payload);
                localStorage.setItem("messages", JSON.stringify(state.privateChats))
            }

        }

    }
})

export const { initFilter, setTotalNotification, onPrivateNotificationStore,
    onPrivateMessageStore, isOpenNotificationStore, deleteNotificationStore } = webSocketSlice.actions

export const selectTotalNotifications = (state) => state.webSocket.totalNotification
export const selectNotifications = (state) => state.webSocket.notifications
export const isOpenNotification = (state) => state.webSocket.isOpenNotification

export default webSocketSlice.reducer