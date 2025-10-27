import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const PayLoadDifferenceComponent = ({ id }) => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["single-product", id],
    queryFn: async () => {
      const res = await axios.get(`https://dummyjson.com/products/${id}`);
      return res.data;
    },
    enabled: !!id,
    refetchOnMount: false,
  });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;
  return (
    <div>
      <h2>
        Product name: {data ? data.title : "product not selected"} & id:{" "}
        {data ? data.id : "product not selected"}
      </h2>
    </div>
  );
};

export default PayLoadDifferenceComponent;
