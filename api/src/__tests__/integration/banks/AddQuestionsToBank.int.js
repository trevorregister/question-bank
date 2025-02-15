const builder = require("../../../db-seed/builder.js");
const request = require("../setup.js");
const { faker } = builder;

describe("Add questions to bank", () => {
    it("returns bank with updated question array and 200", async () => {
        const user = await builder.user.teacher();
        const token = builder.token(user);
        const questionA = await builder.question({ owner: user._id });
        const questionB = await builder.question({ owner: user._id });
        const bank = await builder.bank({
            owner: user._id,
        });
        const questionIds = {questionIdArray: [questionA._id, questionB._id]};
        const res = await request.banks.patch(`/${bank._id}/questions`, questionIds, token);
        expect(res.status).toBe(200);
        expect(res.body.questions[0]).toBe(questionA._id.toHexString())
        expect(res.body.questions[1]).toBe(questionB._id.toHexString());
    });
    it("request from non-owner returns 403", async () => {
        const user = await builder.user.teacher();
        const token = builder.token(user);
        const bank = await builder.bank({
            owner: builder.randomId(),
        });
        const res = await request.banks.patch(`/${bank._id}/questions`, {questionIdArray: []}, token);
        expect(res.status).toBe(403);
    });
});
