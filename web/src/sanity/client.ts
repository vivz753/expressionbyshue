import { createClient as makeClient } from "next-sanity";
export const client = makeClient({
  projectId: "lpnrji1s",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});