/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import ErrorBoundary from "./views/components/ErrorBoundary/ErrorBoundary";
import Routes from "./views/routes/Routes";
import Spinner from "./views/components/Spinner/Spinner";

function App() {
  return (
    <ErrorBoundary>
      <div className="app-root">
        <Router>
          <div className="app-content">
            <Suspense fallback={<Spinner />}>
              <Routes />
            </Suspense>
          </div>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
