// // import { Route, Navigate } from "react-router-dom";
// // import { useAuth } from "../AuthContext";

// // const AuthRoute = ({ element, ...rest }) => {
// //   const { authState } = useAuth();

// //   return authState.token ? (
// //     element
// //   ) : (
// //     <Navigate to="/balance" replace state={{ from: rest.location }} />
// //   );
// // };

// // export default AuthRoute;

// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../AuthContext";

// const AuthRoute = ({ element }) => {
//   const auth = useAuth();
//   const { authContextData } = auth || {};
//   const { state } = authContextData || {};

//   return state && state.token ? <Navigate to="/balance" /> : element;
// };

// export default AuthRoute;
