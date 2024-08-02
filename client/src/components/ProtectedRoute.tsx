import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

interface Props {
  children: JSX.Element;
}

const ProtectedRoute = (props: Props) => {
  const { user } = useUser()

  if (!user) {
    return <Navigate to={"/account/login"} />;
  }

  return props.children;
};

export default ProtectedRoute;
