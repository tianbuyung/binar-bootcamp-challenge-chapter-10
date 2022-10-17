export interface ProductProps {
    id: string;
    name: string;
    price: string;
    CategoryId: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    Category: CategoryProductProps
}

export interface CategoryProductProps {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null;
}
// "product": {
//     "id": 22,
//     "name": "Sleek Frozen Mouse",
//     "price": "624.00",
//     "CategoryId": 4,
//     "imageUrl": null,
//     "createdAt": "2022-09-19T12:22:13.914Z",
//     "updatedAt": "2022-09-19T12:22:13.914Z",
//     "deletedAt": null,
//     "Category": {
//       "id": 4,
//       "name": "Computers",
//       "createdAt": "2022-09-19T12:16:50.545Z",
//       "updatedAt": "2022-09-19T12:16:50.545Z",
//       "deletedAt": null
//     }
//   }

export interface ProductsProps {
    id: string;
    name: string;
    price: string;
    CategoryId: string;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    Category: any;
    loading: boolean;
}
