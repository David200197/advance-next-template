"use client";

import { Container } from "inversify";
import { ReactNode, createContext, useContext } from "react";
import container from "../di/container";

const ContainerContext = createContext<Container>(new Container());

type Props = { children: ReactNode };

export const ContainerProvider = ({ children }: Props) => {
  return (
    <ContainerContext.Provider value={container}>
      {children}
    </ContainerContext.Provider>
  );
};

export const useContainer = () => {
  return useContext(ContainerContext);
};
