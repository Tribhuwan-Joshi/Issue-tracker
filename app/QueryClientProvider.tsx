"use client";
import {
  QueryClient,
  QueryClientProvider as ReactClientProvider,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  return (
    <ReactClientProvider client={queryClient}>{children}</ReactClientProvider>
  );
};
export default QueryClientProvider;
