import { getCurrentUser } from "./auth";

export function IsAllowedToAddWebsite(websites) {
  const current_user = getCurrentUser();
  if (websites.length > 0 && !current_user) {
    return false;
  }
  return true;
}
