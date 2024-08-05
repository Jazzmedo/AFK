import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Platforms from './Components/platform/Platforms';
import Trending from './Components/trending/Trending';
import Genres from './Components/genres/Genres';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Game from './Components/game/Game';

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Trending />
      },
      {
        path: "",
        element: <Trending />
      },
      {
        path: "/game/:gid",
        element: <Game />
      },
      {
        path: "/platform/:pid",
        element: <Platforms />
      },
      {
        path: "/genre/:gid",
        element: <Genres />
      },
    ],
  },
])


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
