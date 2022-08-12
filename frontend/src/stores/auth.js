import { Store } from "pullstate";

const AuthStore = new Store({ isAuth: false, username: null });

export default AuthStore;
