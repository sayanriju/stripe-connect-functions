const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { vendorKyc } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof vendorKyc, "function")
})

test("Should update a Vendors KYC (with Personal ID Number)", async (t) => {
  const { id, legal_entity } = await vendorKyc("acct_1CK10nIacGIwwFOI", { personalIdNumber: "abcd1234" })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.deepEqual(legal_entity, {
    address: {
      city: "New York",
      country: "US",
      line1: "Add Line 1",
      line2: "Add Line 2",
      postal_code: "700001",
      state: "NY"
    },
    dob: {
      day: "13",
      month: "05",
      year: "1990"
    },
    first_name: "Foo",
    last_name: "Bar",
    ssn_last_4_provided: false,
    ssn_last_4: null,
    personal_id_number_provided: true,
    personal_id_number: "abcd1234",
    type: null,
  })
})

test("Should update a Vendors KYC (without SSN)", async (t) => {
  const { id, legal_entity } = await vendorKyc("acct_1CK10nIacGIwwFOI", {})
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.deepEqual(legal_entity, {
    address: {
      city: "New York",
      country: "US",
      line1: "Add Line 1",
      line2: "Add Line 2",
      postal_code: "700001",
      state: "NY"
    },
    dob: {
      day: "13",
      month: "05",
      year: "1990"
    },
    first_name: "Foo",
    last_name: "Bar",
    ssn_last_4_provided: false,
    ssn_last_4: null,
    personal_id_number_provided: false,
    personal_id_number: null,
    type: null,
  })
})
test("Should update a Vendors KYC (with SSN)", async (t) => {
  const { id, legal_entity } = await vendorKyc("acct_1CK10nIacGIwwFOI", { ssnLastFour: "9876", fullSsn: "123456789876" })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.deepEqual(legal_entity, {
    address: {
      city: "New York",
      country: "US",
      line1: "Add Line 1",
      line2: "Add Line 2",
      postal_code: "700001",
      state: "NY"
    },
    dob: {
      day: "13",
      month: "05",
      year: "1990"
    },
    first_name: "Foo",
    last_name: "Bar",
    ssn_last_4_provided: true,
    ssn_last_4: "9876",
    personal_id_number_provided: false,
    personal_id_number: null,
    type: null,
  })
})
