import { createYoga } from "graphql-yoga";
import { createServer } from "http";
import { schema } from './schema';

function main (){
    const yoga = createYoga({schema})
    const server = createServer(yoga)
    const port = process.env.PORT || 4000

    server.listen(port, () => {
        console.log('Server is running on port:' + port)
    })
}

main()