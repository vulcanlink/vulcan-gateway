import { ApolloServer } from 'apollo-server'
import { ApolloGateway } from "@apollo/gateway";

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

// The ApolloGateway stitches multiple GraphQL services as one
// This enables us to query the native Chainlink data structure
// and our custom metadata on one endpoint while keeping them isolated.
const gateway = new ApolloGateway({
    serviceList: [
        { name: 'chainlink', url: process.env.CHAINLINK_SERVICE },
        { name: 'vulcan', url: process.env.VULCAN_SERVICE },
    ]
});

const server = new ApolloServer({ gateway, subscriptions: false });

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});