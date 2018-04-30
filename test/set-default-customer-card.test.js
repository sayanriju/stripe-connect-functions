const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { setDefaultCustomerCard } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof setDefaultCustomerCard, "function")
})

test("Should set & return the default card for a customer from stripe", async (t) => {
  const default_source = await setDefaultCustomerCard("cus_ClfSlfACLDjib2", "card_1CLrcwIacGIwwFOIAfrKTKHv")
  t.is(default_source, "card_1CLrcwIacGIwwFOIAfrKTKHv")
})
