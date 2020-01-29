import * as React from "react";
import { render } from "@testing-library/react"
import App from "./app";

it("renders the app", () => {
    const { queryByText } = render(<App />);
    expect(queryByText("Minify")).toBeTruthy();
});