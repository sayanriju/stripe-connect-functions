const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { customerDelete } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof customerDelete, "function")
})

test("Should delete a Customer by id", async (t) => {
  const {
    id, deleted
  } = await customerDelete("cus_1234")
  t.is(id, "cus_1234")
  t.true(deleted)
})
