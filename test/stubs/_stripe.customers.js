const sinon = require("sinon")

module.exports = () => ({
  customers: {
    create({ email }) {
      return Promise.resolve({
        id: "cus_ClfSlfACLDjib2",
        object: "customer",
        email
      })
    },
    listCards(customerId) {
      return Promise.resolve({
        object: "list",
        url: "/v1/customers/cus_ClOPUSnueMks9A/sources",
        has_more: false,
        data: [
          {
            id: "card_1CLrcwIacGIwwFOIAfrKTKHu",
            object: "card",
            address_city: null,
            address_country: null,
            address_line1: null,
            address_line1_check: null,
            address_line2: null,
            address_state: null,
            address_zip: null,
            address_zip_check: null,
            brand: "Visa",
            country: "US",
            customer: customerId,
            cvc_check: null,
            dynamic_last4: null,
            exp_month: 8,
            exp_year: 2019,
            fingerprint: "61RsRe9SJC3hjgTW",
            funding: "credit",
            last4: "4242",
            metadata: {},
            name: null,
            tokenization_method: null
          },
          {
            id: "card_1CLrcwIacGIwwFOIAfrKTKHv",
            object: "card",
            address_city: null,
            address_country: null,
            address_line1: null,
            address_line1_check: null,
            address_line2: null,
            address_state: null,
            address_zip: null,
            address_zip_check: null,
            brand: "Visa",
            country: "US",
            customer: customerId,
            cvc_check: null,
            dynamic_last4: null,
            exp_month: 8,
            exp_year: 2019,
            fingerprint: "61RsRe9SJC3hjgTY",
            funding: "credit",
            last4: "4242",
            metadata: {},
            name: null,
            tokenization_method: null
          },
          {
            id: "card_1CLrcwIacGIwwFOIAfrKTKHw",
            object: "card",
            address_city: null,
            address_country: null,
            address_line1: null,
            address_line1_check: null,
            address_line2: null,
            address_state: null,
            address_zip: null,
            address_zip_check: null,
            brand: "Visa",
            country: "US",
            customer: customerId,
            cvc_check: null,
            dynamic_last4: null,
            exp_month: 8,
            exp_year: 2019,
            fingerprint: "61RsRe9SJC3hjgTZ",
            funding: "credit",
            last4: "4242",
            metadata: {},
            name: null,
            tokenization_method: null
          }
        ]
      });
    }
  }
})
