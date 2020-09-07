import gql from 'graphql-tag';

const QUERIES_NOTIFICATION_SUBSCRIPTION_RECEIVER_REFERENCE_ID = gql`
  subscription ($receiverReferenceId: String) {
    notifications(
        where: {
            receiver_reference_id: {
                _eq: $receiverReferenceId
            }
        }) {
            id
            job_id
            job {
                id,
                client_id,
                client,
                status,
                book,
                start,
                business,
                business_id,
                mender,
                mender_id,
                provider,
                provider_id,
            }
            status
            sender_reference_id
            sender_reference_type
            receiver_reference_id
            receiver_reference_type
      }
  }`;

const QUERIES_NOTIFICATION_SUBSCRIPTION_GET_BY_ID = gql`
    subscription ($id: uuid!) {
        notifications_by_pk(id: $id) {
            id
            job_id
            job {
                id,
                client_id,
                client,
                status,
                book,
                start,
                business,
                business_id,
                mender,
                mender_id,
                provider,
                provider_id,
            }
            status
            sender_reference_id
            sender_reference_type
            receiver_reference_id
            receiver_reference_type
        }
    }`


const QUERIES_NOTIFICATION_MUTATE_UPDATE_STATUS_BY_ID = gql`
    mutation ($id: uuid!, $status: String) {
        update_notifications_by_pk(
            pk_columns: {
                id: $id
            },
            _set: {
                status: $status
            }
        )
        {
            id
        }
    }`;

export {
    QUERIES_NOTIFICATION_SUBSCRIPTION_RECEIVER_REFERENCE_ID,
    QUERIES_NOTIFICATION_SUBSCRIPTION_GET_BY_ID,
    QUERIES_NOTIFICATION_MUTATE_UPDATE_STATUS_BY_ID
}