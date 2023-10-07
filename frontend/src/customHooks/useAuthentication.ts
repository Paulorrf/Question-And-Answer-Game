import axios from "@/axios";
import { useEffect, useState } from "react";

export function useAuthentication() {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const sessionCookie = document.cookie.replace(
          /(?:(?:^|.*;\s*)userData\s*\=\s*([^;]*).*$)|^.*$/,
          "$1"
        );

        if (sessionCookie === "") {
          return false;
        }

        const response = await axios({
          method: "post",
          url: "authentication/check-auth",
          withCredentials: true,
          data: JSON.stringify(sessionCookie),
        });

        if (response.data) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error("Authentication check failed", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    return null;
  }

  return loggedIn;
}
