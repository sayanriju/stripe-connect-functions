module.exports = () => ({
  accounts: {
    create({ email }) {
      return Promise.resolve({
        id: "acct_1CK10nIacGIwwFOI",
        object: "account",
        country: "US",
        email
      })
    },

    del(stripeAccountId) {
      return Promise.resolve({
        deleted: true,
        id: stripeAccountId
      })
    },

    update(acctId, { external_account = {}, legal_entity = {}, tos_acceptance = {} }) {
      return Promise.resolve({
        id: acctId,
        object: "account",
        type: "custom",
        country: "US",
        default_currency: "usd",
        email: "sayan@logic-square.com",
        external_accounts: {
          object: "list",
          data: [
            {
              object: "bank_account",
              country: "US",
              currency: "usd",
              account_number: external_account.account_number || null,
              routing_number: external_account.routing_number || null,
            }
          ],
          has_more: false,
          total_count: 0,
          url: "/v1/accounts/acct_1CK10nIacGIwwFOI/external_accounts"
        },
        legal_entity: {
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
          ssn_last_4_provided: !!legal_entity.ssn_last_4,
          ssn_last_4: legal_entity.ssn_last_4 || null,
          type: null,
        },
        tos_acceptance: {
          date: tos_acceptance.date || null,
          ip: tos_acceptance.ip || null,
          user_agent: tos_acceptance.user_agent || null
        }
      })
    }
  },

  charges: {
    create({
      customer,
      destination = {},
      amount, // inputs in cents
      currency,
      receipt_email,
      description,
      statement_descriptor,
      capture
    }) {
      return Promise.resolve({
        id: "ch_1CLPR9IacGIwwFOIwaEdKU16",
        object: "charge",
        amount: amount / 100, // outputs in dollars
        captured: capture,
        currency,
        customer,
        description,
        destination: destination.account,
        receipt_email,
        statement_descriptor,
        status: "succeeded",
      })
    },

    capture(transactionId, { statement_descriptor = null, destination = { } }) {
      return Promise.resolve({
        id: transactionId,
        object: "charge",
        amount: (destination.amount) ? 420 - (destination.amount / 100) : 420,
        amount_refunded: 0,
        receipt_email: "foo@bar.com",
        statement_descriptor
      })
    }
  },

  customers: {
    create({ email }) {
      return Promise.resolve({
        id: "cus_ClfSlfACLDjib2",
        object: "customer",
        default_source: "card_1CLrcwIacGIwwFOIAfrKTKHu",
        email
      })
    },
    del(stripeCustomerId) {
      return Promise.resolve({
        deleted: true,
        id: stripeCustomerId
      })
    },
    listCards() {
      return Promise.resolve({
        object: "list",
        url: "/v1/customers/cus_ClOPUSnueMks9A/sources",
        has_more: false,
        data: [
          {
            id: "card_1CLrcwIacGIwwFOIAfrKTKHu",
            object: "card",
            brand: "Visa",
            country: "US",
            customer: "cus_ClfSlfACLDjib2",
            cvc_check: null,
            dynamic_last4: null,
            exp_month: 8,
            exp_year: 2019,
            fingerprint: "61RsRe9SJC3hjgTW",
            funding: "credit",
            last4: "4242",
          },
          {
            id: "card_1CLrcwIacGIwwFOIAfrKTKHv",
            object: "card",
            brand: "Visa",
            country: "US",
            customer: "cus_ClfSlfACLDjib2",
            cvc_check: null,
            dynamic_last4: null,
            exp_month: 8,
            exp_year: 2019,
            fingerprint: "61RsRe9SJC3hjgTY",
            funding: "credit",
            last4: "4242",
          },
          {
            id: "card_1CLrcwIacGIwwFOIAfrKTKHw",
            object: "card",
            brand: "Visa",
            country: "US",
            customer: "cus_ClfSlfACLDjib2",
            cvc_check: null,
            dynamic_last4: null,
            exp_month: 8,
            exp_year: 2019,
            fingerprint: "61RsRe9SJC3hjgTZ",
            funding: "credit",
            last4: "4242",
          }
        ]
      })
    },
    retrieve() {
      return Promise.resolve({
        id: "cus_ClfSlfACLDjib2",
        object: "customer",
        email: "foo@bar.com",
        default_source: "card_1CLrcwIacGIwwFOIAfrKTKHu"
      })
    },
    createSource() {
      return Promise.resolve({
        id: "card_1CLrcwIacGIwwFOIAfrKTKHu",
        object: "card",
        country: "US",
        currency: "usd",
        fingerprint: "AhBp6wMc4VW1dL3r",
        status: "new",
        customer: "cus_ClfSlfACLDjib2"
      })
    },
    deleteCard(stripeCustomerId, cardId) {
      return Promise.resolve({
        deleted: true,
        id: cardId
      })
    },
    update() {
      return Promise.resolve({
        id: "cus_ClfSlfACLDjib2",
        object: "customer",
        default_source: "card_1CLrcwIacGIwwFOIAfrKTKHv",
        email: "changed@bar.com"
      })
    }
  }
})
