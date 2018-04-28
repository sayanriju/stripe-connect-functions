const Stripe = require("stripe")

module.exports = (stripeSecretKey) => {
  const stripe = Stripe(stripeSecretKey)
  return {
    async customerCreate(email = null) {
      try {
        return await stripe.customers.create({ email })
      } catch (err) {
        throw err
      }
    },

    async customAccountCreate(email = null) {
      try {
        return await stripe.accounts.create({
          country: "US",
          type: "custom",
          email,
        })
      } catch (err) {
        throw err
      }
    },

    async fetchCustomerCards(stripeCustomerId) {
      try {
        const { data } = await stripe.customers.listCards(stripeCustomerId)
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
        return await stripe
          .customers
          .deleteCard(stripeCustomerId, cardId)
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
      accountHolderName = null
    }) {
      try {
        const accountObj = {
          object: "bank_account",
          country: "US",
          currency: "usd",
          account_number: accountNo,
          routing_number: routingNo,
        }
        if (accountHolderName !== null) {
          accountObj.account_holder_name = accountHolderName
        }
        return await stripe.accounts.update(stripeAccountId, {
          external_account: accountObj
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
        const entityObj = {
          address,
          dob,
          first_name: name.first,
          last_name: name.last,
          type: "individual"
        }
        if (ssnLastFour !== null) entityObj.ssn_last_4 = ssnLastFour
        if (fullSsn !== null) entityObj.personal_id_number = fullSsn
        return await stripe.accounts.update(stripeAccountId, {
          legal_entity: entityObj
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
      statementDescriptor = null,
      capture = false
    }) {
      try {
        return await stripe.charges.create({
          capture,
          customer,
          amount: amount * 100, // convert to cents from dollar
          currency,
          description,
          receipt_email: receiptEmail,
          statement_descriptor: statementDescriptor,
          destination: {
            amount: vendorAmount,
            account: vendor,
          }
        })
      } catch (err) {
        throw err
      }
    },

    async capturePayment(
      transactionId,
      vendorAmount = null,
      statementDescriptor = null
    ) {
      try {
        const objToCapture = {}
        if (statementDescriptor !== null) {
          objToCapture.statement_descriptor = statementDescriptor
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
