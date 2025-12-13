import axios from "axios";

//create a fetcher with axios and useSwr common hook
export const axiosFetcher = (url: string) =>
  axios.get(url).then((res) => res.data);
