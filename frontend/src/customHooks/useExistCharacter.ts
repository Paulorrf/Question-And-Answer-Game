import axios from "@/axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

/**
 * Custom hook to check if a character exists.
 *
 * @returns {boolean|null} Returns `true` if a character exists, `false` if not, and `null` during loading.
 */
export function useExistCharacter() {
  const [loading, setLoading] = useState(true);
  const [characterExists, setCharacterExists] = useState<boolean | null>(null); // Initialize as undefined

  const [cookies] = useCookies(["userData"]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (cookies.userData === "") {
          setCharacterExists(false); // No user data, character does not exist
          setLoading(false);
          return;
        }

        const response = await axios({
          method: "get",
          url: `races/characterExist/${cookies.userData}`,
          withCredentials: true,
        });

        setCharacterExists(response.data); // Set the characterExists state based on the response
      } catch (error) {
        console.error("Authentication check failed", error);
        setCharacterExists(false); // Handle errors, character does not exist
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, [cookies.userData]);

  if (loading) {
    return null; // Render nothing until loading is done
  }

  return characterExists;
}
