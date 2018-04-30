const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { deleteCustomerCard } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof deleteCustomerCard, "function")
})

test("Should delete a customer card", async (t) => {
  const {
    id, deleted
  } = await deleteCustomerCard("cus_1234", "card_4567")
  t.true(id.startsWith("card_"))
  t.is(id, "card_4567")
  t.true(deleted)
})
