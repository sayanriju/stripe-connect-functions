const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { vendorDelete } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof vendorDelete, "function")
})

test("Should delete a Vendor by id", async (t) => {
  const {
    id, deleted
  } = await vendorDelete("acct_1234")
  t.is(id, "acct_1234")
  t.true(deleted)
})
