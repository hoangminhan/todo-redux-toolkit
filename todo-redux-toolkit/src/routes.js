import ProductAction from "./component/feature/Product/ProductAction";
import NotFound from "./component/NotFound/NotFound";
import HomePage from "./page/HomePage/HomePage";
import ProductPage from "./page/ProductPage/ProductPage";

const routes = [
  {
    path: "/",
    exact: true,
    component: () => <HomePage />,
  },
  {
    path: "/products",
    exact: true,
    component: () => <ProductPage />,
  },
  {
    path: "/products/add",
    exact: false,
    component: () => <ProductAction />,
  },
  {
    path: "/products/:id/update",
    exact: false,
    component: () => <ProductAction />,
  },
  {
    path: "",
    exact: false,
    component: () => <NotFound />,
  },
];
export default routes;
