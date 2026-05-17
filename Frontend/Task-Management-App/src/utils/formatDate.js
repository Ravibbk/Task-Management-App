const formatDate = (date) => {
  if (!date) return "No Date";
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
};
export default formatDate;