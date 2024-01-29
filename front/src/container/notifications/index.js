import "./index.css";
import Page from "../../component/page";
import Status from "../../component/status";
import Back from "../../component/back-button";

const notificationsData = [
  {
    type: "reward",
    message: "New reward system",
    time: "10 min. ago",
    category: "Announcement",
  },
  {
    type: "login",
    message: "New login",
    time: "10 min. ago",
    category: "Announcement",
  },
];

const NotificationsPage = () => {
  return (
    <Page>
      <Status />
      <Back />
      <h1 className="notifications-title">Notifications</h1>
      <div className="notification-content">
        {notificationsData.map((notification, index) => (
          <div className="notification" key={index}>
            <div className="notification-pic">
              <img
                src={
                  notification.type === "reward"
                    ? "/img/bell-ringing.png"
                    : "/img/danger.png"
                }
                alt={notification.type}
              />
            </div>
            <div className="notification-info">
              <div className="notification-system">{notification.message}</div>
              <div className="notification-detail">{`${notification.time} - ${notification.category}`}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="indicator-notification">
        <img src="/img/indicator.png" alt="Indicator" />
      </div>
    </Page>
  );
};

export default NotificationsPage;
