import { ApolloServer } from 'apollo-server'
import { ApolloGateway } from "@apollo/gateway";

if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

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