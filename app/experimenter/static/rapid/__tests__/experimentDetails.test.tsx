import { cleanup, fireEvent, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import React from "react";

import {
  renderWithRouter,
  wrapInExperimentProvider,
} from "experimenter-rapid/__tests__/utils";
import ExperimentDetails from "experimenter-rapid/components/experiments/ExperimentDetails";

afterEach(async () => {
  await cleanup();
  fetchMock.resetMocks();
});

describe("<ExperimentDetails />", () => {
  it("renders without issues", async () => {
    const { getByDisplayValue } = renderWithRouter(
      wrapInExperimentProvider(<ExperimentDetails />, {
        initialState: {
          slug: "test-slug",
          name: "Test Name",
          objectives: "Test objectives",
          owner: "test@owner.com",
        },
      }),
    );

    await waitFor(() => {
      return expect(getByDisplayValue("test@owner.com")).toBeInTheDocument();
    });

    expect(getByDisplayValue("Test Name")).toBeInTheDocument();
    expect(getByDisplayValue("Test objectives")).toBeInTheDocument();
  });

  it("sends you to the edit page when the 'Back' button is clicked", async () => {
    const { getByText, history } = renderWithRouter(
      wrapInExperimentProvider(<ExperimentDetails />, {
        initialState: {
          slug: "test-slug",
          name: "Test Name",
          objectives: "Test objectives",
          owner: "test@owner.com",
        },
      }),
    );

    const historyPush = jest.spyOn(history, "push");

    const backButton = getByText("Back");
    fireEvent.click(backButton);

    await waitFor(() => expect(historyPush).toHaveBeenCalledTimes(1));
    const lastEntry = history.entries.pop() || { pathname: "" };
    expect(lastEntry.pathname).toBe("/test-slug/edit/");
  });
});