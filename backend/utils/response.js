export const successResponse = (res, data, message = '', status = 200) => {
  res.status(status).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (res, message, status = 400, errors = []) => {
  res.status(status).json({
    success: false,
    message,
    errors
  });
};