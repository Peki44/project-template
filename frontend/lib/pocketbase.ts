import PocketBase from "pocketbase";

function getPocketBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_PB_URL) {
    return process.env.NEXT_PUBLIC_PB_URL;
  }

  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return "http://localhost:8090";
}

export const pb = new PocketBase(getPocketBaseUrl());

export default pb;
