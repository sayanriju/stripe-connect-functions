const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { addCustomerCard } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof addCustomerCard, "function")
})

test("Should return a card", async (t) => {
  const {
    id, object, country, currency, customer, status
  } = await addCustomerCard()
  t.true(id.startsWith("card"))
  t.is(object, "card")
  t.is(country, "US")
  t.is(currency, "usd")
  t.is(status, "new")
  t.is(customer, "cus_ClfSlfACLDjib2")
})
