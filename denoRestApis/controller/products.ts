import { Product } from "../types.ts";
import { v4 } from 'https://deno.land/std/uuid/mod.ts'

let products: Product[] = [
  {
    id: "1",
    name: "pro 1",
    description: "This is prod",
    price: 12,
  },
  {
    id: "2",
    name: "pro 2",
    description: "This is prod 2",
    price: 32,
  },
  {
    id: "3",
    name: "pro 3",
    description: "This is prod 3",
    price: 43,
  },
  {
    id: "4",
    name: "pro 4",
    description: "This is prod 4",
    price: 53,
  },
];

//@des   get all Products
//@rout  GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

//@des   get single Product
//@rout  GET /api/v1/products/:id
const getProduct = ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  if (product) {
    response.status = 200;
    response.body = {
      success: true,
      data: product,
    };
  } else {
    response.status = 404;

    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};


// @desc    Add product
// @route   Post /api/v1/products
const addProduct = async ({ request, response }: { request: any, response: any }) => {    
    console.log('dev: addProduct -> body', request)

    const body = await request.body()

    if (!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No data'
        }
    } else {
        const product: Product = body.value
        console.log('dev: addProduct -> product', product)
        product.id = v4.generate()
        products.push(product)
        response.status = 201
        response.body = {
            success: true,
            data: product
        }
    }
}

//@des   update Product
//@rout  PUT /api/v1/products/:id
const updateProduct = async ({
  params,
  request,
  response,
}: {
  params: { id: string };
  request: any;
  response: any;
}) => {
  const product: Product | undefined = products.find((p) => p.id === params.id);
  console.log("dev: product", product);

  if (product) {
    console.log("I rannn");

    const body = await request.body();
    console.log("dev: body", body);
    const updateData: { name?: string; description?: string; price?: number } =
      body.value;
    console.log("dev: updateData", updateData);

    products = products.map((p) =>
      p.id === params.id ? { ...p, ...updateData } : p
    );

    response.status = 200;
    response.body = {
      success: true,
      data: products,
    };
  } else {
    response.status = 404;
    response.body = {
      success: false,
      msg: "No product found",
    };
  }
};

//@des   delete Product
//@rout  DELETE /api/v1/products/:id
const deleteProduct = async ({
  params,
  response,
}: {
  params: { id: string };
  response: any;
}) => {
  products = products.filter((p) => p.id !== params.id);
  console.log("dev: deleteProduct -> products", products);
  response.status = 200;
  response.body = {
    success: true,
    msg: "product removed",
  };
};

export { getProducts, getProduct, addProduct, updateProduct, deleteProduct };
