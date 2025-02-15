const { ValidationError } = require("./errors");

module.exports = class Entity {
  static validator = null;

  constructor(data) {}

  static toDb(data) {
    const validate = this.validator.validate(data);

    if (validate.error) {
      throw new ValidationError(validate.error);
    } else {
      return validate.value;
    }
  }

  static toWeb(data) {}
};
