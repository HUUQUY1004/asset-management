import CreateAsset from "./pages/asset/createAsset";
import EditAsset from "./pages/asset/editAsset";
import ShowAsset from "./pages/asset/showAsset";
import CreateAccount from "./pages/account/createAccount";
import Home from "./pages/home/home";
import ShowAccount from "./pages/account/showAccount";

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
];
