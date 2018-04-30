const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { customAccountCreate } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof customAccountCreate, "function")
})

test("Should return a custom account from stripe without email", async (t) => {
  const {
    id, email, object, country
  } = await customAccountCreate()
  t.true(id.startsWith("acct"))
  t.is(object, "account")
  t.is(country, "US")
  t.falsy(email)
})

test("Should return a custom account from stripe with email", async (t) => {
  const {
    id, email, object, country
  } = await customAccountCreate("foo@bar.com")
  t.true(id.startsWith("acct"))
  t.is(object, "account")
  t.is(country, "US")
  t.is(email, "foo@bar.com")
})
