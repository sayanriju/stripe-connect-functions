const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { capturePayment } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof capturePayment, "function")
})

test("Should return the captured charge from stripe", async (t) => {
  const {
    id, amount, object, statement_descriptor // eslint-disable-line camelcase
  } = await capturePayment("ch_foo")
  t.is(id, "ch_foo")
  t.is(object, "charge")
  t.is(statement_descriptor, null)
  t.is(amount, 420)
})

test("Should return the captured charge from stripe with vendor amount", async (t) => {
  const {
    id, amount, object, statement_descriptor // eslint-disable-line camelcase
  } = await capturePayment("ch_foo", 100)
  t.true(id.startsWith("ch_"))
  t.is(object, "charge")
  t.is(statement_descriptor, null)
  t.is(amount, 320)
})

test("Should return the captured charge from stripe with statement descriptor", async (t) => {
  const {
    id, amount, object, statement_descriptor // eslint-disable-line camelcase
  } = await capturePayment("ch_foo", 0, "bar")
  t.true(id.startsWith("ch_"))
  t.is(object, "charge")
  t.is(statement_descriptor, "bar")
  t.is(amount, 420)
})
