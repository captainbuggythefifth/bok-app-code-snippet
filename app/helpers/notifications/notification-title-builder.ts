import { INotificationData } from '../../redux/interfaces/notification';

interface INotificationTitleBuilderProps {
    notification: INotificationData
}

const notificationTitleBuilder = ({ notification }: INotificationTitleBuilderProps) => {

    const { job, sender_reference_type } = notification;

    let noti = "";

    const notificationFromClient = sender_reference_type === "client" && job;
    const notificationFromMender = sender_reference_type === "mender" && job;

    if (notificationFromClient) {
        const clientFullName = job?.client?.full_name || `${job?.client.first_name} ${job?.client.last_name}`;

        noti = `${clientFullName} has booked.`
    }

    if (notificationFromMender) {
        const menderFullName = job?.mender?.full_name || `${job?.mender.first_name} ${job?.mender.last_name}`;

        noti = `${menderFullName} has accepted your request to deliver.`
    }
    return noti
};

export default notificationTitleBuilder