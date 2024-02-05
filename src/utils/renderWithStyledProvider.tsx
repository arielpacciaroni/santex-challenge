import { render } from "@testing-library/react";
import { ReactNode } from "react"
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

export function renderWithStyledProvider(element: ReactNode) {
  return render(
    <ThemeProvider theme={theme}>
      {element}
    </ThemeProvider>
  )
}