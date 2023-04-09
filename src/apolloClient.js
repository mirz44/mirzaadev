import { ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "https://api-ap-southeast-2.hygraph.com/v2/clg8qqt6u1xbz01t35deq4gj9/master",
    cache: new InMemoryCache(),
})

export default client