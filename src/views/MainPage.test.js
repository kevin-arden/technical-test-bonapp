import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";

test("first test add button available", () => {
  render(<MainPage />);

  screen.debut();
});
