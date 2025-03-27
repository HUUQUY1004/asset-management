import Home from "./pages/home/home";
import ShowAccount from "./pages/account/showAccount";
import ManageAccount from "./pages/account/ManageAccount";

export const routes = [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/create-asset",
    Component: CreateAsset,
  },
  {
    path: "/create-account",
    Component: CreateAccount,
  },
  {
    path: "/show-asset",
    Component: ShowAsset,
  },
  {
    path: "/edit-asset",
    Component: EditAsset,
  },
  {
    path: "/show-account",
    Component: ShowAccount,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/ManageAccount",
    Component: ManageAccount,
  }
];
