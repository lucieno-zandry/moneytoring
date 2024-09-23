import React from "react";
import { getWstoken } from "../api/actions";
// import useToasts from "../minitiatures/Toast/hooks/useToasts";
import useAuth from "./useAuth";
import { NOTIFICATION_WS_URL } from "../config/constants/constants";

const BASE_URL = NOTIFICATION_WS_URL;
const DEFAULT_STATE = {
    token: '',
    connection: null as WebSocket | null,
}
const TENTATIVES_LIMIT = 10;
let tentatives = 0;

export default function (actions: {
    refreshUnreadNotifications: Function,
    refreshAllNotifications: Function,
}) {
    // const toasts = useToasts();
    const { user } = useAuth();
    const [state, setState] = React.useState(DEFAULT_STATE);

    const getWebsocketInstance = React.useCallback(() => state.token ?
        new WebSocket(`${BASE_URL}/${state.token}`) :
        null, [state.token]);

    const handleClose = React.useCallback(() => {
        console.log('notification connection closed');
        if (user) {
            const connection = getWebsocketInstance();
            if (connection && tentatives < TENTATIVES_LIMIT) {
                initConnection(connection);
                console.log('notification connection refreshed');
            };
        }
    }, [user]);

    const handleMessage = React.useCallback((e: MessageEvent<string>) => {
        // const { title, line } = JSON.parse(e.data);
        e;
        actions.refreshUnreadNotifications();
        actions.refreshAllNotifications();

        // toasts.push({
        //     title,
        //     content: line,
        //     type: "default",
        // })
    }, [
        // toasts.push,
        actions]);

    const handleOpen = React.useCallback((e: Event) => {
        e;
        console.log('notification connection established');
    }, []);

    const handleError = React.useCallback((e: Event) => {
        console.log('notification connection error', e);
    }, []);

    function initConnection(connection: WebSocket) {
        connection.onopen = handleOpen;
        connection.onmessage = handleMessage;
        connection.onclose = handleClose;
        connection.onerror = handleError;

        tentatives++;
        setState(s => ({ ...s, connection }));
    }

    React.useEffect(() => {
        if (user && !state.token) {
            getWstoken()
                .then(response => {
                    setState(s => ({ ...s, token: response.data.token }));
                })
        }
    }, [state.token, user]);

    React.useEffect(() => {
        if (state.token && !state.connection) {
            const connection = getWebsocketInstance();
            connection && initConnection(connection);
        }

        return () => {
            if (state.connection) {
                state.connection.close();
                setState(DEFAULT_STATE)
            };
        }
    }, [state.token, state.connection]);
}