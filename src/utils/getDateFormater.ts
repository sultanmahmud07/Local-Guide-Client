import { format } from "date-fns";

export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  try {
    return format(new Date(dateString), "PPPpp"); 
    // Example: Aug 5, 2025 at 9:34 PM
  } catch {
    return "Invalid Date";
  }
};
