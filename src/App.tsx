import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Shows from "./pages/Shows";
import Anime from "./pages/Anime";
import PageNotFound from "./pages/PageNotFound";
import Layout from "./components/Layout";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SingleMedia } from "./components/Media/SingleMedia";

function App() {
  return (
    <BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Navigate replace={true} to="/home" />}></Route>
          <Route path="/media/:mediaId" element={<SingleMedia />} />
          <Route path="home" element={<Home />}></Route>
          <Route path="movies" element={<Movies />}></Route>
          <Route path="shows" element={<Shows />}></Route>
          <Route path="anime" element={<Anime />}></Route>
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
