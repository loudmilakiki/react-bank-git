import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import WellcomePage from "./page/wellcome-page";
import SignupPage from "./page/signup-page";
import SigninPage from "./page/signin-page";
import SignupConfirmPage from "./container/signup-confirm";
import BalancePage from "./container/balance";
import SettingsPage from "./container/settings";
import ReceivePage from "./container/receive";
import SendPage from "./container/send";
import RecoveryPage from "./container/recovery";
import RecoveryConfirmPage from "./container/recovery-confirm";
import NotificationsPage from "./container/notifications";
import TransactionPage from "./container/transaction";
//import AuthRoute from "./utils/AuthRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/wellcome"
            element={
              //<AuthRoute>
              <WellcomePage />
              //</AuthRoute>
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
          <Route
            path="/signup-confirm"
            element={
              //     <PrivateRoute>
              <SignupConfirmPage />
              //     </PrivateRoute>
            }
          />
          <Route
            path="/signin"
            element={
              //<AuthRoute>
              <SigninPage />
              //</AuthRoute>
            }
          />
          <Route
            path="/signin/recovery"
            element={
              //     <AuthRoute>
              <RecoveryPage />
              //     </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              //     <AuthRoute>
              <RecoveryConfirmPage />
              //     </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              //     <PrivateRoute>
              <BalancePage />
              //     </PrivateRoute>
            }
          />
          <Route
            path="/balance/notifications"
            element={
              //     <PrivateRoute>
              <NotificationsPage />
              //     </PrivateRoute>
            }
          />
          <Route
            path="/balance/settings"
            element={
              //     <PrivateRoute>
              <SettingsPage />
              //     </PrivateRoute>
            }
          />
          <Route
            path="/balance/receive"
            element={
              //     <PrivateRoute>
              <ReceivePage />
              //     </PrivateRoute>
            }
          />
          <Route
            path="/balance/send"
            element={
              //     <PrivateRoute>
              <SendPage />
              //     </PrivateRoute>
            }
          />
          <Route
            path="/balance/:transactionId"
            element={
              //     <PrivateRoute>
              <TransactionPage />
              //     </PrivateRoute>
            }
          />
          <Route path="*" Component={Error} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
  // }
}

export default App;
