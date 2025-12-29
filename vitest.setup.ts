import "@testing-library/jest-dom/vitest";
import React from "react";
import { vi } from "vitest";

/**
 * We have to mock next/image as it relies on Next internals
 * and will fail in a test environment.
 */
vi.mock("next/image", () => ({
  default: (props: React.Attributes) => {
    return React.createElement("img", props);
  },
}));
