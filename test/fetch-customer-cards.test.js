const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { fetchCustomerCards } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof fetchCustomerCards, "function")
})

test("Should fetch Cards associated with a customer, with a default card set", async (t) => {
  const cards = await fetchCustomerCards()
  t.true(Array.isArray(cards))
  t.true(cards.every(c => c.id.startsWith("card_")))
  t.true(cards.every(c => c.object === "card"))
  t.true(cards.every(c => c.customer === "cus_ClfSlfACLDjib2"))
  t.true(cards.every(c => c.country === "US"))
  t.true(cards.every(c => c.fingerprint))
  t.true(cards.find(c => c.id === "card_1CLrcwIacGIwwFOIAfrKTKHu").isDefault)
})
