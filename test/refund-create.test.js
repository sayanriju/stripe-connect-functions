const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { refund } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof refund, "function")
})

test("Should return a stripe refund object (no reason)", async (t) => {
  const {
    id, amount, object, charge, currency, reason, status
  } = await refund("ch_1CLPR9IacGIwwFOIwaEdKU16", 100)
  t.true(id.startsWith("re_"))
  t.is(object, "refund")
  t.is(amount, 100)
  t.is(currency, "usd")
  t.is(charge, "ch_1CLPR9IacGIwwFOIwaEdKU16")
  t.is(status, "succeeded")
  t.is(reason, null)
})

test("Should return a stripe refund object (with reason)", async (t) => {
  const {
    id, amount, object, charge, currency, reason, status
  } = await refund("ch_1CLPR9IacGIwwFOIwaEdKU16", 100, "A Reason")
  t.true(id.startsWith("re_"))
  t.is(object, "refund")
  t.is(amount, 100)
  t.is(currency, "usd")
  t.is(charge, "ch_1CLPR9IacGIwwFOIwaEdKU16")
  t.is(status, "succeeded")
  t.is(reason, "A Reason")
})
