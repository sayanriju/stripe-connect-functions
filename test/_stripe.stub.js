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

    update(acctId, {
      external_account = {},
      business_profile = {},
      tos_acceptance = {},
      individual = {}
    }) {
      return Promise.resolve({
        id: acctId,
        object: "account",
        business_profile: {
          mcc: business_profile.mcc || null,
          name: null,
          product_description: null,
          support_address: null,
          support_email: null,
          support_phone: null,
          support_url: null,
          url: business_profile.url || null
        },
        business_type: "individual",
        capabilities: {
          transfers: "active"
        },
        charges_enabled: true,
        country: "US",
        created: 1582800920,
        default_currency: "usd",
        details_submitted: true,
        email: "indrajit@logic-square.com",
        external_accounts: {
          object: "list",
          data: [
            {
              id: "ba_1GGk1VL1F8SCaTrVwklLM6H5",
              object: "bank_account",
              account: acctId,
              account_holder_name: external_account.account_holder_name || null,
              account_holder_type: null,
              bank_name: "STRIPE TEST BANK",
              country: external_account.country || null,
              currency: external_account.currency || null,
              default_for_currency: true,
              fingerprint: "0cXClcKtgVTOE0iW",
              last4: external_account.account_number ? external_account.account_number.substr(-4) : null,
              metadata: {},
              routing_number: external_account.routing_number || null,
              status: "new"
            }
          ],
          has_more: false,
          total_count: 1,
          url: "/v1/accounts/acct_1GGk1UL1F8SCaTrV/external_accounts"
        },
        individual: {
          id: "person_GoMlL8zwfPV0UZ",
          object: "person",
          account: "acct_1GGk1UL1F8SCaTrV",
          address: {
            city: individual.address && individual.address.city ? individual.address.city : null,
            country: individual.address && individual.address.country ? individual.address.country : null,
            line1: individual.address && individual.address.line1 ? individual.address.line1 : null,
            line2: individual.address && individual.address.line2 ? individual.address.line2 : null,
            postal_code: individual.address && individual.address.postal_code ? individual.address.postal_code : null,
            state: individual.address && individual.address.state ? individual.address.state : null
          },
          created: 1582800923,
          dob: {
            day: individual.dob && individual.dob.day ? individual.dob.day : null,
            month: individual.dob && individual.dob.month ? individual.dob.month : null,
            year: individual.dob && individual.dob.year ? individual.dob.year : null
          },
          email: individual.email || null,
          first_name: individual.first_name || null,
          id_number_provided: !!individual.id_number,
          last_name: individual.last_name || null,
          metadata: {},
          phone: individual.phone || null,
          relationship: {
            director: false,
            executive: false,
            owner: false,
            percent_ownership: null,
            representative: true,
            title: null
          },
          requirements: {
            currently_due: [],
            eventually_due: [],
            past_due: [],
            pending_verification: []
          },
          ssn_last_4_provided: !!individual.ssn_last_4,
          verification: {
            additional_document: {
              back: null,
              details: null,
              details_code: null,
              front: null
            },
            details: null,
            details_code: null,
            document: {
              back: null,
              details: null,
              details_code: null,
              front: null
            },
            status: "pending"
          }
        },
        metadata: {},
        payouts_enabled: true,
        requirements: {
          current_deadline: null,
          currently_due: [],
          disabled_reason: null,
          eventually_due: [],
          past_due: [],
          pending_verification: []
        },
        settings: {
          branding: {
            icon: null,
            logo: null,
            primary_color: null
          },
          card_payments: {
            decline_on: {
              avs_failure: false,
              cvc_failure: false
            },
            statement_descriptor_prefix: null
          },
          dashboard: {
            display_name: "Example",
            timezone: "Etc/UTC"
          },
          payments: {
            statement_descriptor: "WWW.EXAMPLE.COM",
            statement_descriptor_kana: null,
            statement_descriptor_kanji: null
          },
          payouts: {
            debit_negative_balances: false,
            schedule: {
              delay_days: 2,
              interval: "daily"
            },
            statement_descriptor: null
          }
        },
        tos_acceptance: {
          date: tos_acceptance.date || null,
          ip: tos_acceptance.ip || null,
          user_agent: tos_acceptance.user_agent || null
        },
        type: "custom"
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
    listSources() {
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
    deleteSource(stripeCustomerId, cardId) {
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
  },

  refunds: {
    create({ charge, amount, reason = null }) {
      return Promise.resolve({
        id: "re_1COhlaIacGIwwFOIPsf6AkGh",
        object: "refund",
        amount: amount / 100,
        currency: "usd",
        charge,
        reason,
        created: 1525593526,
        status: "succeeded"
      })
    }
  }
})
