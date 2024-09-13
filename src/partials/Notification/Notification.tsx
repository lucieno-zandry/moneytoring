import React from "react";
import { Dropdown } from "react-bootstrap";
import NotificationItem, { NotificationItemPlaceHolder } from "./NotificationItem/NotificationItem";
import EmptyNotification from "./EmptyNotification/EmptyNotification";
import generateArray from "../../core/helpers/generateArray";
import * as Models from "../../core/config/types/models";
// import useNotificationWs from "../../core/hooks/useNotificationWs";
import useAuth from "../../core/hooks/useAuth";
import { allNotifications, unreadNotifications } from "../../core/api/actions";

const DEFAULT_ACTIONS = {
    refreshUnreadNotifications: () => { },
    refreshAllNotifications: () => { },
};

const NotificationContext = React.createContext({
    actions: DEFAULT_ACTIONS,
});

export const useNotification = () => {
    return React.useContext(NotificationContext);
}

const Notification = React.memo(() => {
    const { user } = useAuth();

    const [notifications, setNotifications] = React.useState({
        all: null as Models.Notification[] | null,
        unread: null as Models.Notification[] | null,
    });

    const { all, unread } = notifications;

    const refreshUnreadNotifications = React.useCallback(() => {
        unreadNotifications()
            .then(response => {
                setNotifications(notifications => ({
                    ...notifications, unread: response.data.notifications
                }));
            })
    }, []);

    const refreshAllNotifications = React.useCallback(() => {
        allNotifications()
            .then(response => {
                setNotifications(notifications => ({
                    ...notifications, all: response.data.notifications
                }));
            })
    }, []);

    // React.useEffect(() => {
    //     if (!user) {
    //         return;
    //     }

    //     if (!unread) {
    //         refreshUnreadNotifications();
    //     } else if (!all) {
    //         refreshAllNotifications();
    //     }
    // }, [
    //     unread,
    //     all,
    //     user,
    //     refreshAllNotifications,
    //     refreshUnreadNotifications
    // ]);

    const contextValue = React.useMemo(() => ({
        actions: {
            refreshUnreadNotifications,
            refreshAllNotifications,
        }
    }), [refreshAllNotifications, refreshUnreadNotifications]);

    // useNotificationWs({
    //     refreshUnreadNotifications,
    //     refreshAllNotifications
    // });

    if (user) {
        return <NotificationContext.Provider value={contextValue}>
            <Dropdown className="actions-dropdown notification-dropdown nav-item">
                <Dropdown.Toggle variant=''>
                    <i className="fa fa-bell"></i> {Boolean(unread?.length) && <small className="count">
                        {unread?.length}
                    </small>}
                </Dropdown.Toggle>
                <Dropdown.Menu align='end' className="mt-2">
                    {Boolean(all?.length)
                        && all?.map((notification, key) => <NotificationItem
                            notification={notification}
                            key={key}
                        />)}

                    {!all && generateArray(3).map((value, key) => {
                        value;
                        return <NotificationItemPlaceHolder key={key} />;
                    })}

                    {Boolean(all && all.length === 0) && <EmptyNotification />}
                </Dropdown.Menu>
            </Dropdown>
        </NotificationContext.Provider>
    }
});

export default Notification;