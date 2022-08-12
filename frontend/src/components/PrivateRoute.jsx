import AuthStore from "../stores/auth";

export default function PrivateRoute({ children }) {
  const isAuth = AuthStore.useState((s) => s.isAuth);

  if (!isAuth) {
    return (
      <div className="w-full text-center">
        <p>you are not authenticated</p>
      </div>
    );
  }

  return children;
}
