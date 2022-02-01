import { useEffect, useContext } from "react";
import { Store } from "../utils/Store";

export default function ManageNotification({ children }) {
  const { state, dispatch } = useContext(Store);
  const { error } = state;

  // Resets the error message
  useEffect(() => {
    if (error.active) {
      setTimeout(() => {
        dispatch({ type: "HIDE_ERROR" });
      }, 1200);
    }
  }, [error, dispatch]);

  return <>{children}</>;
}
