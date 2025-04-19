import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps2 {
  children: ReactNode;
  allowedRoles: string[]; 
}

interface DecodedToken {
  id: string;
  role: string;
}

const ProtectedRouteGenral = ({ children, allowedRoles }: ProtectedRouteProps2) => {
  const token = localStorage.getItem("token"); 

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token); // Decode the token
    const userRole = decodedToken.role; // Extract role from the decoded token

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />; // Redirect if role is not allowed
    }

    return children; // Allow access if role is authorized
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" replace />; // Redirect to login if token decoding fails
  }
};

export default ProtectedRouteGenral;
