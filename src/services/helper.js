import { getCurrentUser } from "./auth";

export function IsAllowedToAddWebsite(websites) {
  const current_user = getCurrentUser();
  if (!current_user) {
    // If the user is not logged in, they are allowed to set one website only
    return websites.length === 0;
  }

  return current_user.website_credits > 0;
}
