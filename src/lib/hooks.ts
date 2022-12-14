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

export function useProjects() {
  const { data, error } = useSWR(`/projects`, fetcher);

  return {
    projects: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useCities() {
  const { data, error } = useSWR("/cities", fetcher);

  return {
    cities: data,
    isLoading: !error && !data,
    isError: error,
  };
}
