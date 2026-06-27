import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { ShortcutHelpOverlay } from "./ShortcutHelpOverlay";

vi.mock("../hooks/useBodyScrollLock", () => ({
  useBodyScrollLock: vi.fn(),
}));

vi.mock("../hooks/useInertBackdrop", () => ({
  useInertBackdrop: vi.fn(),
}));

describe("ShortcutHelpOverlay", () => {
  it("renders grouped shortcuts and a settings link", async () => {
    render(
      <MemoryRouter>
        <ShortcutHelpOverlay isOpen={true} onClose={() => undefined} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Global" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Wallet" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Wizard" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /settings and shortcut notes/i }),
    ).toHaveAttribute("href", "/help#shortcuts");

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /close keyboard shortcut help/i }),
      ).toHaveFocus();
    });
  });

  it("closes on Escape", () => {
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <ShortcutHelpOverlay isOpen={true} onClose={onClose} />
      </MemoryRouter>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
