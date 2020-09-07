import React from 'react';

import { WebSocketLink } from 'apollo-link-ws';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Create a WebSocket link:
const link = new WebSocketLink({
    uri: `ws://ec2-18-136-208-122.ap-southeast-1.compute.amazonaws.com:8080/v1/graphql`,
    options: {
        reconnect: true,
        connectionParams: {
            headers: {
                "x-hasura-admin-secret": ""
            },
        },
    },
});

const cache = new InMemoryCache();
const client = new ApolloClient({
    link,
    cache
});


const ApolloClientHOC = ({ children }: any) => {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
};

export default ApolloClientHOC;
