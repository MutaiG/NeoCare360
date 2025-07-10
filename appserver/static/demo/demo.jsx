import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { getThemeOptions } from "@splunk/splunk-utils/themes";

import NeoCare360App from "../src/main/webapp/pages/start/NeoCare360App";
import ErrorBoundary from "./ErrorBoundary";

// Prevent [object Event] logging by filtering console methods early
(() => {
  const originalConsoleLog = console.log;
  const originalConsoleWarn = console.warn;
  const originalConsoleError = console.error;

  const isEventObject = (arg) => {
    if (typeof arg === "object" && arg !== null) {
      const objString = Object.prototype.toString.call(arg);
      return (
        objString.includes("Event]") ||
        (arg.constructor &&
          arg.constructor.name &&
          arg.constructor.name.includes("Event"))
      );
    }
    return false;
  };

  const filterArgs = (args) => {
    return args.filter((arg) => !isEventObject(arg));
  };

  console.log = (...args) => {
    const filtered = filterArgs(args);
    if (filtered.length > 0) {
      originalConsoleLog.apply(console, filtered);
    }
  };

  console.warn = (...args) => {
    const filtered = filterArgs(args);
    if (filtered.length > 0) {
      originalConsoleWarn.apply(console, filtered);
    }
  };

  console.error = (...args) => {
    const filtered = filterArgs(args);
    if (filtered.length > 0) {
      originalConsoleError.apply(console, filtered);
    }
  };
})();

// Enhanced error handling with third-party filtering
const thirdPartyErrorPatterns = [
  "mobx.array",
  "getCookie",
  "BuilderContent",
  "HubSpot",
  "Wootric",
  "Firestore",
  "SecurityError",
  "allow-same-origin",
  "ERR_QUIC_PROTOCOL_ERROR",
  "hstc.utils",
  "tracking.Tracker",
];

const isThirdPartyError = (error) => {
  const errorStr = error.toString();
  return thirdPartyErrorPatterns.some((pattern) => errorStr.includes(pattern));
};

window.addEventListener("error", (event) => {
  if (isThirdPartyError(event.error)) {
    // Silently suppress third-party errors
    event.preventDefault();
    return;
  }
  // Log error details without logging the event object itself
  if (event.error) {
    console.error(
      "Application error caught:",
      event.error.message || event.error
    );
  } else {
    console.error(
      "Application error caught:",
      event.message || "Unknown error"
    );
  }
  // Don't prevent default for application errors
});

window.addEventListener("unhandledrejection", (event) => {
  if (isThirdPartyError(event.reason)) {
    // Silently suppress third-party promise rejections
    event.preventDefault();
    return;
  }
  // Log rejection reason without logging the event object itself
  console.error("Unhandled promise rejection:", event.reason);
  // Don't prevent default for application promise rejections
});

const theme = getThemeOptions("enterprise");

const App = () => (
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <NeoCare360App />
    </ThemeProvider>
  </ErrorBoundary>
);

const container = document.getElementById("root");
const root = createRoot(container);

try {
  root.render(<App />);
} catch (error) {
  console.error("Error rendering app:", error);
  container.innerHTML = `
        <div style="padding: 20px; color: red;">
            <h2>Failed to load NeoCare360</h2>
            <p>Please check the console for details and refresh the page.</p>
            <button onclick="window.location.reload()">Reload</button>
        </div>
    `;
}
