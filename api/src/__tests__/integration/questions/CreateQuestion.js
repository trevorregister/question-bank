const builder = require("../../../db-seed/builder.js");
const generateId = require("../../../domains/utils/generateId.js");
const request = require("../setup.js");
const { faker } = builder;
const { QUESTION_TYPES } = require("../../../core/enums.js");

describe("Create Question", () => {
  it("given valid inputs, returns new question and 201", async () => {
    const user = await builder.user.teacher();
    const token = builder.token(user);

    const questionOwner = generateId();
    const questionProps = {
      prompt: faker.lorem.sentence(10),
      pointValue: faker.number.int({ min: 10, max: 50 }),
      type: QUESTION_TYPES.Numerical,
    };
    const res = await request.questions.post("/", questionProps, token);

    expect(res.status).toBe(201);
    const { id, prompt, variables, conditions, pointValue, owner, type } =
      res.body;
    expect({
      id,
      prompt,
      variables,
      conditions,
      pointValue,
      owner,
      type,
    }).toEqual({
      id: id,
      prompt: prompt,
      variables: variables,
      conditions: conditions,
      pointValue: pointValue,
      owner: owner,
      type: type,
    });
  });

  it("given invalid inputs, returns 422", async () => {
    const user = await builder.user.teacher();
    const token = builder.token(user);

    const questionProps = {
      prompt: faker.lorem.sentence(10),
      pointValue: faker.number.int({ min: 10, max: 50 }),
      type: "asdf",
    };
    const res = await request.questions.post("/", questionProps, token);
    expect(res.status).toBe(422);
  });

  it("given valid inputs and student user returns 403", async () => {
    const user = await builder.user.student();
    const token = builder.token(user);

    const questionOwner = generateId();
    const questionProps = {
      prompt: faker.lorem.sentence(10),
      pointValue: faker.number.int({ min: 10, max: 50 }),
      type: QUESTION_TYPES.Numerical,
      owner: questionOwner,
    };
    const res = await request.questions.post("/", questionProps, token);

    expect(res.status).toBe(403);
  });
});
