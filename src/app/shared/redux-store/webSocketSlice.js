import { LoginIcon } from "@heroicons/react/solid";
import { createSlice } from "@reduxjs/toolkit";
import { accountLogin } from "../services/accountServices";



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
    customers: [],
    notifications: notifications(),
    totalNotification: totNotifications(),
    totPrivateChats: totNotifications()
}
export const webSocketSlice = createSlice({

    name: 'webSocket',
    initialState: initialState,
    reducers: {
        initWS(state) {


        },
        isOpenNotificationStore(state) {
            state.isOpenNotification = !state.isOpenNotification
        },
        deleteNotificationStore(state, { payload }) {
            var newState = []
            var id = +(state.notifications.length - (payload + 1))
            var notif = state.notifications[id]
            if (notif.idorder !== undefined && notif.idorder !== null && notif.idorder !== 0) {
                newState = state.notifications.filter(not => not.idorder !== notif.idorder)
                state.notifications = newState
            }
            else {
                newState = state.notifications.splice(id, 1)
            }
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
                const localStore = notifications();
                var test = localStore.some(element => {
                    if (element.date === payload.payload.date) {
                        return true;
                    }
                })

                if (test === false) {
                    state.notifications.push(payload.payload);
                }
            }



            localStorage.setItem("notification", JSON.stringify(state.notifications))


        }

        , onPrivateMessageStore(state, payload) {
            if (payload.payload.status === "MESSAGE" && payload.payload.message.senderName !== accountLogin()) {
                state.privateChats.push(payload.payload);
                state.privateChats.push(payload.payload);
                if (!(state.customers.indexOf(payload.payload.chat) > -1)
               && payload.payload.chat!==accountLogin() ) {
                    state.customers.push(payload.payload.chat)
                }
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
export const selectCustomers = (state) => state.webSocket.customers
export const selectPrivateChats = (state) => state.webSocket.privateChats

export default webSocketSlice.reducer