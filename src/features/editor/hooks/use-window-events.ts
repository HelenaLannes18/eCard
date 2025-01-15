import { useEvent } from "react-use";

export const useWindowEvents = () => {
  useEvent("beforeunload", (event) => {
    (event || window.event).returnValue = "Você tem certeza de que deseja sair?";
  });
};
