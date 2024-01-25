import { getCurrentUser } from "./auth";

export function IsAllowedToAddWebsite(websites) {
  const current_user = getCurrentUser();
  if (!current_user) {
    // If the user is not logged in, they are allowed to set one website only
    return websites.length === 0;
  }

  return current_user.website_credits > 0;
}

export function ClearAddressHistory() {
  // Get the current URL
  const currentURL = window.location.href;

  // Create a new URL without any parameters
  const newURL = currentURL.split("?")[0];

  // Replace the current URL with the new URL without parameters
  window.history.replaceState({}, document.title, newURL);
}
