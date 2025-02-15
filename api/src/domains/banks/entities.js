const Joi = require("joi");
const Entity = require("../../core/entity.js");

const dbBank = Joi.object({
  owner: Joi.string().required(),
  name: Joi.string().trim().required(),
});

module.exports = class Bank extends Entity {
  static validator = dbBank;
  constructor({ owner, name }) {
    super();
    (this.owner = owner), (this.name = name), (this.isDeleted = false);
    this.isArchived = false;
    this.questions = [];
  }

  static toWeb(data) {
    return {
      id: data._id,
      owner: data.owner,
      name: data.name,
      isDeleted: data.isDeleted,
      isArchived: data.isArchived,
      questions: data.questions,
    };
  }
};
