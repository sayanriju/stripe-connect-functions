const test = require("ava")
const proxyquire = require("proxyquire")
const stripe = require("./_stripe.stub") // stubbed

const { vendorKyc } = proxyquire("../index.js", {
  stripe
})("dummy_stripe_token")

test("Should be a function.", (t) => {
  t.is(typeof vendorKyc, "function")
})

test("Should update a Vendors KYC (with Personal ID Number and SSN)", async (t) => {
  const { id, individual } = await vendorKyc("acct_1CK10nIacGIwwFOI", { personalIdNumber: "abcd1234", ssnLastFour: "1234" })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.is(individual.ssn_last_4_provided, true)
  t.is(individual.id_number_provided, true)
})

test("Should update a Vendors KYC (without SSN)", async (t) => {
  const { id, individual } = await vendorKyc("acct_1CK10nIacGIwwFOI", {
    address: {
      city: "Brockton",
      line1: "700 Oak Street",
      line2: "",
      postal_code: "2301",
      state: "MA",
      country: "US"
    },
    dob: {
      day: "6",
      month: "1",
      year: "1975"
    },
    name: {
      first: "Indrajit",
      last: "Roy"
    }
  })
  t.is(id, "acct_1CK10nIacGIwwFOI")
  t.is(individual.first_name, "Indrajit")
  t.is(individual.last_name, "Roy")
  t.deepEqual(individual.address, {
    city: "Brockton",
    line1: "700 Oak Street",
    line2: null,
    postal_code: "2301",
    state: "MA",
    country: "US"
  })
  t.deepEqual(individual.dob, {
    day: "6",
    month: "1",
    year: "1975"
  })
})
