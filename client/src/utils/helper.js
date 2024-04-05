export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const truncateText = (str, maxLength) => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const dateStringToMilliseconds = (dateString) => {
  if (!dateString) return;
  return new Date(dateString).getTime();
};

export const capitalizeFirstLetter = (str) => {
  if (!str) return;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const displayRating = (number) => {
  if (!number) return;

  switch (number) {
    case 1:
      return "⭐";
    case 2:
      return "⭐⭐";
    case 3:
      return "⭐⭐⭐";
    case 4:
      return "⭐⭐⭐⭐";
    case 5:
      return "⭐⭐⭐⭐⭐";
    default:
      return "";
  }
};

export const displayTextColor = (color) => {
  if (!color) return;

  switch (color) {
    case "blue":
      return "text-blue-600";
    case "red":
      return "text-red-600";
    case "green":
      return "text-green-600";
    case "amber":
      return "text-amber-600";
    case "teal":
      return "text-teal-600";
    default:
      return "";
  }
};
