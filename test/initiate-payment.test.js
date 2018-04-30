const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { initiatePayment } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof initiatePayment, "function")
})

test("Should initiate a payment (charge) to be captured later", async (t) => {
  const charge = await initiatePayment({
    customer: "cus_Ckc6NCwnBdzDCb",
    vendor: "acct_1CK10nIacGIwwFOI",
    amount: 420,
    vendorAmount: 100,
    currency: "usd"
  })
  t.true(charge.id.startsWith("ch_"))
  t.is(charge.object, "charge")
  t.is(charge.customer, "cus_Ckc6NCwnBdzDCb")
  t.is(charge.destination, "acct_1CK10nIacGIwwFOI")
  t.is(charge.amount, 420)
  t.is(charge.currency, "usd")
  t.is(charge.receipt_email, null)
  t.is(charge.description, null)
  t.is(charge.statement_descriptor, null)
  t.is(charge.status, "succeeded")
  t.false(charge.captured)
})

test("Should initiate a payment (charge) to be captured immediately", async (t) => {
  const charge = await initiatePayment({
    customer: "cus_Ckc6NCwnBdzDCb",
    vendor: "acct_1CK10nIacGIwwFOI",
    amount: 420,
    vendorAmount: 100,
    currency: "usd",
    capture: true
  })
  t.true(charge.id.startsWith("ch_"))
  t.is(charge.object, "charge")
  t.is(charge.customer, "cus_Ckc6NCwnBdzDCb")
  t.is(charge.destination, "acct_1CK10nIacGIwwFOI")
  t.is(charge.amount, 420)
  t.is(charge.currency, "usd")
  t.is(charge.receipt_email, null)
  t.is(charge.description, null)
  t.is(charge.statement_descriptor, null)
  t.is(charge.status, "succeeded")
  t.true(charge.captured)
})

test("Should initiate a payment (charge) to be captured later with description, etc set", async (t) => {
  const charge = await initiatePayment({
    customer: "cus_Ckc6NCwnBdzDCb",
    vendor: "acct_1CK10nIacGIwwFOI",
    amount: 420,
    vendorAmount: 100,
    currency: "usd",
    receiptEmail: "receipient@abc.com",
    description: "Test",
    statementDescriptor: "Test2",
    capture: false
  })
  t.true(charge.id.startsWith("ch_"))
  t.is(charge.object, "charge")
  t.is(charge.customer, "cus_Ckc6NCwnBdzDCb")
  t.is(charge.destination, "acct_1CK10nIacGIwwFOI")
  t.is(charge.amount, 420)
  t.is(charge.currency, "usd")
  t.is(charge.receipt_email, "receipient@abc.com")
  t.is(charge.description, "Test")
  t.is(charge.statement_descriptor, "Test2")
  t.is(charge.status, "succeeded")
  t.false(charge.captured)
})
