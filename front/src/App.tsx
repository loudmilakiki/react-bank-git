import React from "react";
import { createContext, useContext, useState, useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WellcomePage from "./page/wellcome-page"
import SignupPage from "./page/signup-page";

// function initSession(session) {
//   session = loadSession(session);
//   if (session) {
//     return session;
//   } else {
//     return {};
//   }
// }



function App() {

  const AuthContext = createContext({});



  // const { state } = useAuth();

  // const reducer (state, action) {
  //   switch (action.type) {
  //     case "login":
  //       return saveSession(action.data);
  //     case "logout":
  //       return endSession();
  //     default:
  //       return { ...state };
  //   }
  // }



  return (
    // <AuthContext.Provider value={authContextData}>
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={
            // <AuthRoute>
            <WellcomePage />
            // </AuthRoute>
          }
        />
        <Route
          path="/signup"
          element={
            //<AuthRoute>
            <SignupPage />
            //</AuthRoute>
          }
        />
        {/* {// <Route
          //   path="/signup-confirm"
          //   element={
          //     <PrivateRoute>
          //       <SignupConfirmPage />
          //     </PrivateRoute>
          //   }
          // />
          // <Route
          //   path="/signin"
          //   element={
          //     <AuthRoute>
          //       <SigninPage />
          //     </AuthRoute>
          //   }
          // />
          // <Route
          //   path="/recovery"
          //   element={
          //     <AuthRoute>
          //       <RecoveryPage />
          //     </AuthRoute>
          //   }
          // />
          // <Route
          //   path="/recovery-confirm"
          //   element={
          //     <AuthRoute>
          //       <RecoveryConfirmPage />
          //     </AuthRoute>
          //   }
          // />
          // <Route
          //   path="/balance"
          //   element={
          //     <PrivateRoute>
          //       <BalancePage />
          //     </PrivateRoute>
          //   }
          // />
          // <Route
          //   path="/notifications"
          //   element={
          //     <PrivateRoute>
          //       <NotificationsPage />
          //     </PrivateRoute>
          //   }
          // />
          // <Route
          //   path="/settings"
          //   element={
          //     <PrivateRoute>
          //       <SettingsPage />
          //     </PrivateRoute>
          //   }
          // />
          // <Route
          //   path="/recive"
          //   element={
          //     <PrivateRoute>
          //       <RecivePage />
          //     </PrivateRoute>
          //   }
          // />
          // <Route
          //   path="/send"
          //   element={
          //     <PrivateRoute>
          //       <SendPage />
          //     </PrivateRoute>
          //   }
          // />
          // <Route
          //   path="/transaction/:transactionId"
          //   element={
          //     <PrivateRoute>
          //       <TransactionPage />
          //     </PrivateRoute>
          //   }
          // />
          // <Route path="*" Component={Error} /> */}
      </Routes>
    </BrowserRouter>
    // </AuthContext.Provider >
  );
  // }
}

export default App;
