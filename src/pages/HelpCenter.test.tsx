import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import HelpCenter from "./HelpCenter";

describe("HelpCenter", () => {
  beforeEach(() => {
    Object.defineProperty(Element.prototype, "scrollIntoView", {
      configurable: true,
      value: vi.fn(),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders wallet deep-link target and FAQ video button", () => {
    render(
      <MemoryRouter initialEntries={["/help#wallet"]}>
        <HelpCenter />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Wallet" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /how do i connect a wallet\?/i }),
    ).toBeInTheDocument();
  });
});
