const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { vendorAcceptTos } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof vendorAcceptTos, "function")
})

test("Should update a Vendors TOC acceptance (with UA)", async (t) => {
  const { id, tos_acceptance } = await vendorAcceptTos("acct_1CK10nIacGIwwFOI", {
    tosAcceptanceDate: "1525112092",
    tosAcceptanceIp: "127.0.0.1",
    tosUserAgent: "Mozilla"
  })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.deepEqual(tos_acceptance, {
    date: "1525112092",
    ip: "127.0.0.1",
    user_agent: "Mozilla"
  })
})

test("Should update a Vendors TOC acceptance (w/o UA)", async (t) => {
  const { id, tos_acceptance } = await vendorAcceptTos("acct_1CK10nIacGIwwFOI", {
    tosAcceptanceDate: "1525112092",
    tosAcceptanceIp: "127.0.0.1"
  })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.deepEqual(tos_acceptance, {
    date: "1525112092",
    ip: "127.0.0.1",
    user_agent: null
  })
})

