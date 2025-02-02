const {
  ContactError,
  IdError,
  UserError,
  MulterError,
  ImageError,
} = require("./errors");

const errorHandlerWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

const errorHandler = (error, req, res, next) => {
  const { type, message } = error;
  switch (type) {
    case ContactError.TYPE.CONTACT_NOT_FOUND:
    case ContactError.TYPE.NOT_FOUND:
    case UserError.TYPE.NOT_FOUND:
      return res.status(404).json({ message });
    case ContactError.TYPE.MISSING_REQ:
    case ContactError.TYPE.MISSING:
    case ContactError.TYPE.MISSING_FAV:
    case ContactError.TYPE.VALIDATION:
    case UserError.TYPE.VALIDATION:
    case MulterError.TYPE.NO_FILE:
    case ImageError.TYPE.NOT_IMAGE:
    case UserError.TYPE.TOKEN_TYPE:
    case UserError.TYPE.VERIFICATION:
    case UserError.TYPE.NOT_VERIFIED:
    case IdError.TYPE.WRONG_ID:
      return res.status(400).json({ message });
    case UserError.TYPE.AUTH:
    case UserError.TYPE.UNAUTHORIZED:
      return res.status(401).json({ message });
    case UserError.TYPE.REGISTRATION:
      return res.status(409).json({ message });
    case UserError.TYPE.EMAIL_ERROR:
      return res.status(500).json({ message });
    default:
      return res.status(500).json({ message });
  }
};

module.exports = {
  errorHandlerWrapper,
  errorHandler,
};
