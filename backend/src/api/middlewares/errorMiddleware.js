const errors = {
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  notAcceptable: 406,
  conflict: 409,
};

const errorMidlleware = (err, _res, res, _next) => {
  const { name, message } = err;

  const code = errors[name];

  if (!code) return res.sendStatus(500);
  return res.status(code).json({ message });
};

module.exports = errorMidlleware;
