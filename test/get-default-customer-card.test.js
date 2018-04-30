const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { getDefaultCustomerCard } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof getDefaultCustomerCard, "function")
})

test("Should return a customer's default card'", async (t) => {
  t.is(await getDefaultCustomerCard("cus_ClfSlfACLDjib2"), "card_1CLrcwIacGIwwFOIAfrKTKHu")
})
