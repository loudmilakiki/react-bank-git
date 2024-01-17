import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // const login = (token, user) => {
  //   dispatch({ type: "LOGIN", payload: { token, user } });
  // };

  // const logout = () => {
  //   dispatch({ type: "LOGOUT" });
  // };

  // const authContextData = {
  //   state,
  //   login,
  //   logout,
  // };

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };
