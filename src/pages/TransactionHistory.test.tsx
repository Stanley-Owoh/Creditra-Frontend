import { fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { TransactionHistory } from "./TransactionHistory";

const renderTransactionHistory = (initialEntries: string[] = ["/transactions"]) => {
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <TransactionHistory />
    </MemoryRouter>,
  );
};

describe("TransactionHistory", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-02-20T12:00:00Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders type and date filter chips as labeled pressed toggle groups", () => {
    renderTransactionHistory();

    const typeGroup = screen.getByRole("group", { name: /type/i });
    const dateGroup = screen.getByRole("group", { name: /date range/i });

    expect(
      within(typeGroup).getByRole("button", { name: "All" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      within(typeGroup).getByRole("button", { name: "Draw" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      within(typeGroup).getByRole("button", { name: "Repay" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      within(typeGroup).getByRole("button", { name: "Fee" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      within(typeGroup).getByRole("button", { name: "Interest" }),
    ).toHaveAttribute("aria-pressed", "false");

    expect(
      within(dateGroup).getByRole("button", { name: "Today" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      within(dateGroup).getByRole("button", { name: "7d" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      within(dateGroup).getByRole("button", { name: "30d" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      within(dateGroup).getByRole("button", { name: "90d" }),
    ).toHaveAttribute("aria-pressed", "false");
    expect(
      within(dateGroup).getByRole("button", { name: "Custom" }),
    ).toHaveAttribute("aria-pressed", "true");
  });

  it("updates the polite result count when filters change", () => {
    renderTransactionHistory();

    // Check initial result count
    const resultCountBefore = screen.getByText("28 transactions shown");
    expect(resultCountBefore).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "7d" }));

    // Verify the 7d filter is active
    expect(
      screen.getByRole("button", { name: "7d" }).getAttribute("aria-pressed"),
    ).toBe("true");

    // Check updated result count after filtering
    const resultCountAfter = screen.getByText("3 transactions shown");
    expect(resultCountAfter).toBeTruthy();
  });

  it("shows a no-results state with a clear filters action", () => {
    renderTransactionHistory();

    fireEvent.click(screen.getByRole("button", { name: "Fee" }));
    fireEvent.click(screen.getByRole("button", { name: "Today" }));

    // Check no-results state appears
    const noResultsHeading = screen.getByRole("heading", {
      name: /no transactions match these filters/i,
    });
    expect(noResultsHeading).toBeTruthy();

    // Check "no transactions yet" message is NOT present
    const noTransactionsMsg = screen.queryByText(/no transactions yet/i);
    expect(noTransactionsMsg).toBeFalsy();

    fireEvent.click(screen.getByRole("button", { name: /clear filters/i }));

    // No-results state should disappear
    const noResultsAfterClear = screen.queryByRole("heading", {
      name: /no transactions match these filters/i,
    });
    expect(noResultsAfterClear).toBeFalsy();

    // Result count should be restored
    const resultCount = screen.getByText("28 transactions shown");
    expect(resultCount).toBeTruthy();

    // First "All" button (type filter) should be active
    const allButtons = screen.getAllByRole("button", { name: "All" });
    expect(allButtons[0].getAttribute("aria-pressed")).toBe("true");
  });

  it("opens custom date inputs when Custom is selected", () => {
    renderTransactionHistory();

    fireEvent.click(screen.getByRole("button", { name: "Custom" }));

    expect(screen.getByLabelText("Start date")).toBeInTheDocument();
    expect(screen.getByLabelText("End date")).toBeInTheDocument();
  });

  it("activates preset chips from the URL and keeps them in sync", () => {
    renderTransactionHistory(["/transactions?range=this-month"]);

    expect(screen.getByRole("button", { name: "This Month" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByText(/7 transactions shown/i)).toBeInTheDocument();
  });

  it("deselects the active preset when a custom date is edited", () => {
    renderTransactionHistory(["/transactions?range=this-week"]);

    const startInput = screen.getByLabelText("Start date");
    fireEvent.change(startInput, { target: { value: "2025-02-01" } });

    expect(screen.getByRole("button", { name: "This Week" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.getByRole("button", { name: "Custom" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });

  it("clears the preset URL param and the active filters from the empty state", () => {
    renderTransactionHistory(["/transactions?range=this-week"]);

    fireEvent.click(screen.getByRole("button", { name: "Fee" }));
    fireEvent.click(screen.getByRole("button", { name: "Today" }));

    const clearButton = screen.getByRole("button", { name: /clear filters/i });
    fireEvent.click(clearButton);

    expect(screen.getByRole("button", { name: "This Week" })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    expect(screen.queryByText(/no transactions match these filters/i)).not.toBeInTheDocument();
  });
});
