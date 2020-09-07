import { INotificationData } from '../../redux/interfaces/notification';

interface INotificationAvatarProps {
    notification: INotificationData
}

const notificationAvatar = ({ notification }: INotificationAvatarProps) => {

    const { job, sender_reference_type } = notification;

    let avatar = "";

    const notificationFromClient = sender_reference_type === "client" && job;
    const notificationFromMender = sender_reference_type === "mender" && job;

    if (notificationFromClient) {
        avatar = job?.client.picture_url
    }

    if (notificationFromMender) {
        avatar = job?.mender.picture_url
    }
    return avatar
};

export default notificationAvatar