export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map(word => word[0]?.toUpperCase())
    .join("")
    .slice(0, 2)
