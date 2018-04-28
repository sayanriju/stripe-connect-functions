const Stripe = require("stripe")

module.exports = (stripeSecretKey) => {
  const stripe = Stripe(stripeSecretKey)
  return {
    async customerCreate(email = null) {
      try {
        return await stripe.customers.create({
          email
        })
      } catch (err) {
        throw err
      }
    },

    async customAccountCreate(email = null) {
      try {
        return await stripe.accounts.create({
          country: "US",
          type: "custom",
          email: email || "s26c.sayan+driver@gmail.com",
        })
      } catch (err) {
        throw err
      }
    },

    async fetchCustomerCards(stripeCustomerId) {
      try {
        const {
          data
        } = await stripe.customers.listCards(stripeCustomerId)
        return Promise.resolve(data)
      } catch (err) {
        throw err
      }
    },

    async addCustomerCard(stripeCustomerId, stripeToken) {
      try {
        return await stripe.customers.createSource(stripeCustomerId, {
          source: stripeToken
        })
      } catch (err) {
        throw err
      }
    },

    async deleteCustomerCard(stripeCustomerId, cardId) {
      try {
        const response = await stripe
          .customers
          .deleteCard(stripeCustomerId, cardId)
        return Promise.resolve(response)
      } catch (err) {
        throw err
      }
    },

    async getDefaultCustomerCard(stripeCustomerId) {
      try {
        const {
          default_source // eslint-disable-line camelcase
        } = await stripe.customers.retrieve(stripeCustomerId) // eslint-disable-line camelcase
        return Promise.resolve(default_source)
      } catch (err) {
        throw err
      }
    },

    async setDefaultCustomerCard(stripeCustomerId, stripeCardId) {
      try {
        const {
          default_source // eslint-disable-line camelcase
        } = await stripe.customers.update(stripeCustomerId, { // eslint-disable-line camelcase
          default_source: stripeCardId
        })
        return Promise.resolve(default_source)
      } catch (err) {
        throw err
      }
    },

    async setVendorBankAccount(stripeAccountId, {
      routingNo,
      accountNo,
      accountHolderName
    }) {
      try {
        return await stripe.accounts.update(stripeAccountId, {
          external_account: {
            object: "bank_account",
            country: "US",
            currency: "usd",
            account_number: accountNo,
            routing_number: routingNo,
            account_holder_name: accountHolderName || "",
          }
        })
      } catch (err) {
        throw err
      }
    },

    async vendorKyc(stripeAccountId, {
      address = {},
      dob = {},
      name = {},
      ssnLastFour = null,
      fullSsn = null
    }) {
      try {
        const kycObj = {
          address,
          dob,
          first_name: name.first,
          last_name: name.last,
          type: "individual"
        }
        if (ssnLastFour !== null) kycObj.ssn_last_4 = ssnLastFour
        if (fullSsn !== null) kycObj.personal_id_number = fullSsn
        return await stripe.accounts.update(stripeAccountId, {
          legal_entity: kycObj
        })
      } catch (err) {
        throw err
      }
    },

    async vendorAcceptToc(stripeAccountId, {
      tocAcceptanceDate,
      tocAcceptanceIp,
      tocUserAgent = null
    }) {
      try {
        const tocObj = {
          date: tocAcceptanceDate,
          ip: tocAcceptanceIp,
        }
        if (tocUserAgent !== null) tocObj.user_agent = tocUserAgent
        return await stripe.accounts.update(stripeAccountId, {
          tos_acceptance: tocObj
        })
      } catch (err) {
        throw err
      }
    },

    async initiatePayment({
      customer,
      vendor,
      amount,
      vendorAmount,
      currency,
      receiptEmail = null,
      description = null,
      capture = false
    }) {
      try {
        const chargeObj = {
          capture,
          customer,
          amount: amount * 100, // convert to cents from dollar
          currency,
          destination: {
            amount: vendorAmount,
            account: vendor,
          }
        }
        if (receiptEmail !== null) chargeObj.receipt_email = receiptEmail
        if (description !== null) chargeObj.description = description
        return await stripe.charges.create(chargeObj)
      } catch (err) {
        throw err
      }
    },

    async capturePayment(
      transactionId,
      vendorAmount = null,
      description = null
    ) {
      try {
        const objToCapture = {}
        if (description !== null) {
          objToCapture.statement_descriptor = description
        }
        if (vendorAmount !== null) { // Update amount payable to Vendor; otherwise send the initiated amount
          objToCapture.destination = {
            amount: vendorAmount * 100, // convert to cents from dollar
          }
        }
        return await stripe.charges.capture(transactionId, objToCapture)
      } catch (err) {
        throw err
      }
    }
  }
}

// customerCreate()
// stripe.customers.del("cus_Ckc6NCwnBdzDCb")
// addCustomerCard("cus_Ckc6NCwnBdzDCb", "tok_1CL7adIacGIwwFOIXb11MNFp")
// fetchCustomerCards("cus_Ckc6NCwnBdzDCb")
// deleteCustomerCard("cus_Ckc6NCwnBdzDCb", "card_1CL7T2IacGIwwFOIGOnB9TCn")
// getDefaultCustomerCard("cus_Ckc6NCwnBdzDCb")
// setDefaultCustomerCard("cus_Ckc6NCwnBdzDCb", "card_1CL7ULIacGIwwFOIcSVztrDN")
// customAccountCreate()
// stripe.accounts.del("acct_1CL7oqE3hlMLJT12")
// setVendorBankAccount("acct_1CL7vqGP6TahB4DD", { routingNo: "110000000", accountNo: "000123456789", accountHolderName: "Driver Joe" })
// vendorKyc("acct_1CL7vqGP6TahB4DD", {
//   address: {
//     line1: "Updated Address Line One",
//     line2: "Updated Address Line Two",
//     city: "Houston",
//     postal_code: "77001",
//     state: "Texas",
//     country: "US"
//   },
//   dob: {
//     day: "04",
//     month: "05",
//     year: "1983"
//   },
//   name: {
//     first: "Sayan",
//     last: "Chakrabarti"
//   },
//   ssnLastFour: "5462",
//   fullSsn: "457-55-5462"
// })
// vendorAcceptToc("acct_1CL7vqGP6TahB4DD", {
//   tocAcceptanceDate: (Date.now() / 1000).toFixed(0),
//   tocAcceptanceIp: "127.0.0.1",
//   // tocUserAgent: "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:59.0) Gecko/20100101 Firefox/59.0"
// })
// initiatePayment({
//   customer: "cus_Ckc6NCwnBdzDCb",
//   vendor: "acct_1CL7vqGP6TahB4DD",
//   amount: "420",
//   vendorAmount: "100",
//   currency: "usd",
//   receipt_email: "s26csayan@gmail.com",
//   description: "Just a test!"
// })
// capturePayment("ch_1CLPR9IacGIwwFOIwaEdKU16")
// .then(console.log)
// .catch(console.log)
