import useSWR from "swr";
import fetcher from "./fetcher";

export function useUser() {
  const { data, error } = useSWR("/api/user", fetcher);

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useProjects(city) {
  const { data, error } = useSWR(`/projects/${city}`, fetcher);

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
  };
}
