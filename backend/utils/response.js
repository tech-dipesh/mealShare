export const ok = (res, data) =>
  res.status(200).json(data);

export const badRequest = (res, message) =>
  res.status(400).json({ error: message });

export const notFound = (res, message) =>
  res.status(404).json({ error: message });

export const unauthorized = (res, message) =>
  res.status(401).json({ error: message });
