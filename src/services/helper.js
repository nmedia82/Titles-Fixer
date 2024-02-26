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

export function ValidateURL(url) {
  const urlRegex =
    /^(http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gi;
  return urlRegex.test(url);
}

export function RegisterPageTitle(transaction) {
  if (transaction.date) {
    return "You Made It";
  }
  return "SEO, AI Optimized Titles";
}

export function RegisterPageSubtitle(transaction) {
  if (transaction.date) {
    return "Please fill this to complete transaction.";
  }
  return "Create best titles for your products and increase sales.";
}
