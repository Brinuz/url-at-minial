import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react"
import Minify from "./index";
import ApiService from "../../services/api-service";

describe("initial renders", () => {
    it("renders all the required fields", () => {
        const { queryByPlaceholderText, queryByText } = render(<Minify />);
        expect(queryByPlaceholderText("URL")).toHaveProperty("type", "text");
        expect(queryByText("Minify")).toHaveProperty("type", "button");
        expect(queryByText("Couldn't minify url")).toBeNull();
    });
});

describe("on clicking \"minify\"", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        cleanup();
    });

    describe("on valid response", () => {
        it("renders minified url", async () => {
            const testUrl = "http://www.google.com";
            const spy = jest.spyOn(ApiService, "minify").mockResolvedValue(
                {
                    status: 204,
                    data: { URL: "randomhash" },
                },
            );
            const { getByPlaceholderText, findByText, getByText } = render(<Minify />)

            fireEvent.change(getByPlaceholderText("URL"), { target: { value: testUrl } });
            fireEvent.click(getByText("Minify"))

            expect(spy).toHaveBeenCalledTimes(1);
            expect(spy).toHaveBeenCalledWith(testUrl);
            expect(await findByText("urldo.me/randomhash")).toHaveProperty("href", "https://urldo.me/randomhash");
        });

    });

    describe("on invalid response", () => {
        it("renders error", async () => {
            const spy = jest.spyOn(ApiService, "minify").mockRejectedValue();
            const { findByText, getByText } = render(<Minify />)

            fireEvent.click(getByText("Minify"))

            expect(spy).toHaveBeenCalledTimes(1);
            expect(await findByText("Couldn't minify url")).toBeTruthy();
        });
    });
});
