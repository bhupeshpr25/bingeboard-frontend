import React, { createContext, useState, ReactNode } from "react";

type MediaContextType = {
  currentMediaId: string | undefined;
  setCurrentMediaId: (mediaId: string | undefined) => void;
};

export const MediaContext = createContext<MediaContextType | undefined>(
  undefined
);

type MediaContextProviderProps = {
  children: ReactNode;
};

export const MediaContextProvider = ({
  children,
}: MediaContextProviderProps) => {
  const [currentMediaId, setCurrentMediaId] = useState<string | undefined>(
    undefined
  );

  const setMediaId = (mediaId: string | undefined) => {
    setCurrentMediaId(mediaId);
  };

  return (
    <MediaContext.Provider
      value={{ currentMediaId, setCurrentMediaId: setMediaId }}
    >
      {children}
    </MediaContext.Provider>
  );
};
