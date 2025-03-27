"use client";

import { Container } from "inversify";
import { ReactNode, createContext, useContext } from "react";
import container from "../di/container";

const DiContext = createContext<Container>(new Container());

type Props = { children: ReactNode };

export const DiProvider = ({ children }: Props) => {
  return <DiContext.Provider value={container}>{children}</DiContext.Provider>;
};

export const useDi = () => {
  return useContext(DiContext);
};
