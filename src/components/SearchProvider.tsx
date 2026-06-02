"use client";

import { createContext, useContext, useState } from "react";

const SearchContext = createContext<{ query: string; setQuery: (v: string) => void }>({
  query: "",
  setQuery: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

export default function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");
  return (
    <SearchContext.Provider value={{ query, setQuery }}>
      {children}
    </SearchContext.Provider>
  );
}
