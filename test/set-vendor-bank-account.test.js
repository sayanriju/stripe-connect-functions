const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { setVendorBankAccount } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof setVendorBankAccount, "function")
})

test("Should update a Vendor's Bank A/c details with A/c holder name", async (t) => {
  const { id, external_accounts } = await setVendorBankAccount("acct_1CK10nIacGIwwFOI", { accountNo: "12346789", routingNo: "4567", accountHolderName: "Foo Bar" })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.is(external_accounts.object, "list")
  t.true(Array.isArray(external_accounts.data))
  t.not(external_accounts.data.length, 0)
  t.is(external_accounts.data[0].routing_number, "4567")
  t.is(external_accounts.data[0].country, "US")
  t.is(external_accounts.data[0].currency, "usd")
  t.is(external_accounts.data[0].last4, "6789")
  t.is(external_accounts.data[0].account_holder_name, "Foo Bar")
})
test("Should update a Vendor's Bank A/c details w/o A/c holder name", async (t) => {
  const { id, external_accounts } = await setVendorBankAccount("acct_1CK10nIacGIwwFOI", { accountNo: "12346789", routingNo: "4567" })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.is(external_accounts.object, "list")
  t.true(Array.isArray(external_accounts.data))
  t.not(external_accounts.data.length, 0)
  t.is(external_accounts.data[0].routing_number, "4567")
  t.is(external_accounts.data[0].country, "US")
  t.is(external_accounts.data[0].currency, "usd")
  t.is(external_accounts.data[0].last4, "6789")
})
