//1. import module schema
//2. mendefinisikan tipe data javascript
//3. mendefinisikan tipe data typescript
//4. membuat resolvers (CRUD)
//5. export schema agar bisa digunakan di modul main.ts

// import modul schema
import { makeExecutableSchema } from "@graphql-tools/schema";

// mendefinisikan tipe data (javascript)
const typeDefinitions = `
    type Query {
        products: [Product]!
        product(id: Int!): Product
    }

    type Mutation {
        createProduct(product: InputProduct!): Product
        deleteProduct(id: Int!): Product
        updateProduct(id: Int!, product: InputProduct!): Product
    }

    type Product {
        id: Int!
        title: String!
        body: String!
        image: String!
        userId: Int!
    }

    input InputProduct {
        title: String!
        body: String!
        image: String!
        userId: Int!
    }

    input UpdateProduct {
        id: Int!
        title: String!
        body: String!
        image: String!
        userId: Int!
    }
`;

// mendefinisikan tipe data (Typescript)
type Product = {
    id: number;
    title: string;
    body: string;
    image: string;
    userId: number;
}

type InputProduct = {
    title: string;
    body: string;
    image: string;
    userId: number;
}

type UpdateProduct = {
    id: number;
    title: string;
    body: string;
    image: string;
    userId: number;
}

const products: Product[] = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        body: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday.",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        userId: 10,
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        body: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
        image:
          "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        userId: 20,
      },
]

// membuat resolvers (CRUD)
const resolvers = {
    // Query sama dengan method GET di RESTAPI, dia cuma minta data aja.
    Query: {
        products: () => products,
        product: (_parent: unknown, args: {id: number}) => products.find((product) => product.id === args.id),
    },
    
    // Mutation sama dengan method POST,PUT,DELETE dan PATCH di RESTAPI, dialah yang gunanya untuk mengubah-ubah data.
    Mutation: {
        // POST
        createProduct: (_parent: unknown, args: { product: InputProduct}) =>{
            const lastId = products[products.length - 1].id;
            
            const newProduct: Product = {
                id: lastId + 1,
                title: args.product.title,
                body: args.product.body,
                image: args.product.image,
                userId: args.product.userId,
            };
            products.push(newProduct);

            return newProduct
        },
        
        // DELETE
        deleteProduct: (_parent: unknown, args: { id: number }) => {
            const productIndex = products.findIndex((product) => product.id === args.id);
            if (productIndex === -1){
                throw new Error("Product Not Found!")
            }
            const product = products[productIndex];
            products.splice(productIndex, 1);
            return product            
        },
        
        // PUT/PATCH
        updateProduct: (_parent: unknown, args: {id: number, product: InputProduct} ): Product => {
            const productIndex = products.findIndex((product: Product) => product.id === args.id)
            
            if(productIndex === -1){
                throw new Error('Product Not Found!')
            }

            const updatedProduct = {
                id: args.id,
                title: args.product.title,
                body: args.product.body,
                image: args.product.image,
                userId: args.product.userId,
            }

            products[productIndex] = updatedProduct;
            return updatedProduct;
            
        }   
    },
    
    
};

export const schema = makeExecutableSchema({
    resolvers: [resolvers],
    typeDefs: [typeDefinitions],
});
