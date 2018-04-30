const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { customerCreate } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof customerCreate, "function")
})

test("Should return a customer from stripe without email", async (t) => {
  const { id, email, object } = await customerCreate()
  t.true(id.startsWith("cus"))
  t.is(object, "customer")
  t.falsy(email)
})

test("Should return a customer from stripe with email", async (t) => {
  const { id, email, object } = await customerCreate("foo@bar.com")
  t.true(id.startsWith("cus"))
  t.is(object, "customer")
  t.is(email, "foo@bar.com")
})

