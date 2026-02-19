/* eslint-disable import/first */

/* ---------- MOCK ROUTER PARAMS ---------- */
const mockParams = { page: "about" };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => mockParams
}));

/* ---------- IMPORTS ---------- */
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import GenericInfoPage from "../pages/GenericInfoPage/GenericInfoPage";

/* ---------- HELPER ---------- */
function renderPage() {
  return render(
    <BrowserRouter>
      <GenericInfoPage />
    </BrowserRouter>
  );
}

/* ===================================================== */

test("renders About page correctly", () => {
  mockParams.page = "about";

  renderPage();

  expect(screen.getByText("About OS")).toBeInTheDocument();
  expect(screen.getByText(/best shopping experience/i)).toBeInTheDocument();
});

/* ===================================================== */

test("renders Careers page correctly", () => {
  mockParams.page = "careers";

  renderPage();

  expect(screen.getByText("Careers")).toBeInTheDocument();
  expect(screen.getByText(/join the os team/i)).toBeInTheDocument();
});

/* ===================================================== */

test("renders fallback page if route invalid", () => {
  mockParams.page = "unknownpage";

  renderPage();

  expect(screen.getByText("Page Not Found")).toBeInTheDocument();
  expect(screen.getByText(/does not exist/i)).toBeInTheDocument();
});

/* ===================================================== */

test("back to home link exists", () => {
  mockParams.page = "about";

  renderPage();

  const link = screen.getByRole("link", { name: /back to home/i });
  expect(link).toHaveAttribute("href", "/");
});
