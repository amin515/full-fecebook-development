import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Authentication from "./Pages/Authentication/Authentication";
import Forgot from "./Pages/Forgot/Forgot";
import FindAccount from "./Pages/FindAccount/FindAccount";
import Password from "./Pages/Password/Password";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_END } from "./redux/top-loader/loaderType";
import { useEffect } from "react";
import { tokenUser } from "./redux/auth/authAction";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import Friends from "./Pages/Friends/Friends";
import { LogedInRoute } from "./PrivateRoute/LogedInRoute";
import { LoggedOutRoute } from "./PrivateRoute/LoggedOutRoute";

function App() {
  // use selector
  const loader = useSelector((state) => state.loader);
  const loaderDispatch = useDispatch();
  const tokenDispatch = useDispatch();

  useEffect(() => {
    tokenDispatch(tokenUser());
  }, [tokenDispatch]);

  return (
    <>
      <LoadingBar
        progress={loader}
        color="#2376F2"
        onLoaderFinished={() => loaderDispatch({ type: LOADER_END })}
      />
      <ToastContainer
        style={{ zIndex: 99999999999999999 }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        closeOnClick
        newestOnTop={true}
      />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<LoggedOutRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<LogedInRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/friends" element={<Friends />} />
        </Route>

        <Route path="/authentic/:type" element={<Authentication />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/change-password" element={<Password />} />
      </Routes>
    </>
  );
}

export default App;
