import { useCookies } from "react-cookie";

export function useSessionId(): string | null {
  const [cookies] = useCookies(["userData"]);
  return cookies.userData ?? null;
}
