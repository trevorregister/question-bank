const builder = require("../../../db-seed/builder.js");
const request = require("../setup.js");
const { faker } = builder;
const jwt = require("jsonwebtoken");

describe("Get my banks", () => {
  it("returns array of user banks and 200", async () => {
    const user = await builder.user.teacher();
    const token = builder.token(user);
    const bankA = await builder.bank({ owner: user._id });
    const bankB = await builder.bank({ owner: user._id });
    const bankC = await builder.bank({ owner: builder.randomId() });

    const res = await request.banks.get(`/owner/${user._id}`, token);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);
    res.body.forEach((b) => {
      const { owner } = b;
      expect(owner).toBe(user._id.toHexString());
    });
  });
});
