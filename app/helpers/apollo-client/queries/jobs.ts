
import gql from 'graphql-tag';


const QUERIES_JOB_MUTATION = gql`
  mutation ($book: String, $client_id: String, $transaction_id: String) {
    insert_jobs(
      objects: [{
        book: $book
        client_id: $client_id,
        transaction_id: $transaction_id
      }]
    ) {
        returning {
          book
          client_id
          transaction_id
      }
    }
  }
`;

/* const QUERIES_JOB_MUTATION_PROVIDER_ACCEPT_BOOKING = gql`
  mutation ($id: String, $provider_id: String, $transaction_id: String) {
    update_jobs_by_pk(
      pk_columns: {
        id: $id
      }
    ) {
        status: "PROVIDER_ACCEPTED_BOOKING",
        provider_id: $provider_id,

        returning {
          book
          client_id
          transaction_id
      }
    }
  }
`; */

const QUERIES_JOB_SUBSCRIPTION = gql`
  subscription ($status: String) {
    jobs(
        where: {
            status: {
                _eq: $status
            }
        }) {
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
  }`;

const QUERIES_JOB_SUBSCRIPTION_BY_MENDER_ID_AND_STATUS = gql`
  subscription ($mender_id: String, $status: String) {
    jobs(
        where: {
            mender_id: {
              _eq: $mender_id
            },
            status: {
                _neq: $status
            }
        }) {
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
  }`;

const QUERIES_JOB_SUBSCRIPTION_BY_MENDER_ID_AND_NEQ_STATUS = gql`
  subscription ($mender_id: String, $status: String) {
    jobs(
        where: {
            mender_id: {
              _eq: $mender_id
            },
            status: {
                _neq: $status
            }
        }) {
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
  }`;

const QUERIES_JOB_QUERY_ALL_BY_BUSINESS_ID_AND_STATUS = gql`query ($business_id: String, $status: String) {
  jobs(
    where: {
      business_id: {
        _eq: $business_id,
      },
      status: {
        _eq: $status
      }
    }
  ) {
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
}`

const QUERIES_JOB_QUERY_ALL_BY_MENDER_ID = gql`query ($mender_id: String) {
  jobs(
    where: {
      mender_id: {
        _eq: $mender_id,
      }
    },
    order_by: {
      created_at: desc
    }
  ) {
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
}`;

const QUERIES_JOB_SUBSCRIPTION_ALL_BY_BUSINESS_ID_AND_STATUS = gql`subscription ($business_id: String, $status: String) {
  jobs(
    where: {
      business_id: {
        _eq: $business_id,
      },
      status: {
        _eq: $status
      }
    }
  ) {
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
}`

const QUERIES_JOB_QUERY_GET_BY_ID = gql`

query ($id: uuid!) {
  jobs_by_pk(id: $id) {
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
}`

const QUERIES_JOB_SUBSCRIPTION_GET_BY_ID = gql`

subscription ($id: uuid!) {
  jobs_by_pk(id: $id) {
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
}`

const QUERIES_JOB_MUTATE_UPDATE_STATUS_BY_ID = gql`
    mutation ($id: uuid!, $status: String) {
        update_jobs_by_pk(
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

const QUERIES_JOB_MUTATE_UPDATE_PAYMENT_MODE_BY_ID = gql`
    mutation ($id: uuid!, $payment_mode: String) {
        update_jobs_by_pk(
            pk_columns: {
                id: $id
            },
            _set: {
              payment_mode: $payment_mode
            }
        )
        {
            id
        }
    }`;

const QUERIES_JOB_MUTATE_UPDATE_CURRENT_BY_ID = gql`
    mutation ($id: uuid!, $current: jsonb) {
        update_jobs_by_pk(
            pk_columns: {
                id: $id
            },
            _set: {
                current: $current
            }
        )
        {
            id
        }
    }`;

const QUERIES_JOB_QUERY_ALL_BY_CLIENT_ID = gql`query ($client_id: String) {
      jobs(
        where: {
          client_id: {
            _eq: $client_id,
          }
        },
        order_by: {
          created_at: desc
        }
      ) {
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
        payment,
        payment_status,
        payment_mode
      }
    }`;

const QUERIES_JOB_SUBSCRIPTION_BY_CLIENT_ID_AND_NEQ_STATUS = gql`
    subscription ($client_id: String, $status: String) {
      jobs(
          where: {
              client_id: {
                _eq: $client_id
              },
              status: {
                  _neq: $status
              }
          }) {
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
    }`;


export {
  QUERIES_JOB_MUTATION,
  QUERIES_JOB_SUBSCRIPTION,
  QUERIES_JOB_QUERY_ALL_BY_BUSINESS_ID_AND_STATUS,
  QUERIES_JOB_SUBSCRIPTION_ALL_BY_BUSINESS_ID_AND_STATUS,
  QUERIES_JOB_QUERY_GET_BY_ID,
  QUERIES_JOB_SUBSCRIPTION_GET_BY_ID,
  QUERIES_JOB_QUERY_ALL_BY_MENDER_ID,
  QUERIES_JOB_SUBSCRIPTION_BY_MENDER_ID_AND_STATUS,
  QUERIES_JOB_MUTATE_UPDATE_STATUS_BY_ID,
  QUERIES_JOB_MUTATE_UPDATE_CURRENT_BY_ID,
  QUERIES_JOB_SUBSCRIPTION_BY_MENDER_ID_AND_NEQ_STATUS,
  QUERIES_JOB_QUERY_ALL_BY_CLIENT_ID,
  QUERIES_JOB_SUBSCRIPTION_BY_CLIENT_ID_AND_NEQ_STATUS,
  QUERIES_JOB_MUTATE_UPDATE_PAYMENT_MODE_BY_ID
}