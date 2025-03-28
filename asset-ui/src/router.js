import CreateAsset from "./pages/asset/createAsset";
import EditAsset from "./pages/asset/editAsset";
import ShowAsset from "./pages/asset/showAsset";
import CreateAccount from "./pages/account/createAccount";
import Login from "./pages/login/login";
import Home from "./pages/home/home";
import ShowAccount from "./pages/account/showAccount";
import BorrowRequest from "./pages/borrow/request";
import ManageAccount from "./pages/account/ManageAccount";
import CreateMaintenance from "./pages/maintenance/createMaintenance";


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
    path: "/manage-account",
    Component: ManageAccount,
  },
  {
    path: "/borrow-asset",
    Component: BorrowRequest,
  },
  {
    path: "/create-maintenance",
    Component: CreateMaintenance,
  },
];
