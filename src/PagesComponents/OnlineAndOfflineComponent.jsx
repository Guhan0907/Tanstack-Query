import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const OnlineAndOfflineComponent = () => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      const res = await axios.get("https://dummyjson.com/carts");
      return res.data;
    },
    refetchOnMount: false,
    refetchOnReconnect: true,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
        <h2>Cart Items</h2>
      {data?.carts?.map((cartItem) => {
          return <div>{cartItem.products?.[0]?.title}</div>;
        })}
    </div>
  );
};

export default OnlineAndOfflineComponent;
