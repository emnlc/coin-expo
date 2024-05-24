import React from "react";
import { useQuery } from "@tanstack/react-query";

interface Todo {
  id: number;
}

const Home = () => {
  const { data, isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todo"],
  });

  // console.log(data);

  if (isLoading) return <h1>Loading..</h1>;
  if (isError) return <h1>error</h1>;
  if (!data) return <></>;

  return (
    <>
      {data.map((todo) => (
        <div key={todo.id}>ID: {todo.id}</div>
      ))}
    </>
  );
};

export default Home;
