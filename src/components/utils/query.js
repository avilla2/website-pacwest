import React from "react";
import { useQuery } from "@apollo/client";
import LoadingSVG from "./loading";

const Query = ({ children, query, slug }) => {
  const { data, loading, error } = useQuery(query, {
    fetchPolicy: "cache-first",
  });

  if (loading) return <LoadingSVG />
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return children({ data });
};

export default Query;