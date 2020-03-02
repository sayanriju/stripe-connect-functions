const Stripe = require("stripe")
module.exports = (stripeSecretKey) => {
  const stripe = Stripe(stripeSecretKey)
  return {
    /**
     * Create a Customer on Stripe
     * @param {string} [email=null]
     * @returns {Promise}
     */
    async customerCreate(email = null) {
      try {
        return await stripe.customers.create({ email })
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Delete a Customer on Stripe
     * @param {string} stripeCustomerId Customer ID to delete (begins with "cus_")
     * @returns {Promise}
     */
    async customerDelete(stripeCustomerId) {
      try {
        return await stripe.customers.del(stripeCustomerId)
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Create a Vendor (Custom Account on Stripe)
     * @param {string} [email=null]
     * @param {string} [country=US]
     * @returns {Promise}
     */
    async vendorCreate(email = null, country = "US") {
      try {
        return await stripe.accounts.create({
          country,
          business_type: "individual",
          requested_capabilities: ["transfers"],
          type: "custom",
          email,
        })
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Delete a Vendor (Custom Account on Stripe)
     * @param {string} stripeAccountId Vendor ID (Custom Account on Stripe) to delete (begins with "acct_")
     * @returns {Promise}
     */
    async vendorDelete(stripeAccountId) {
      try {
        return await stripe.accounts.del(stripeAccountId)
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Fetch all the Cards (or other sources) associated with the Customer with the provided id. The default card is marked as such.
     * @param {string} stripeCustomerId Customer Id (begins with "cus_")
     * @returns {Promise}
     */
    async fetchCustomerCards(stripeCustomerId) {
      try {
        const result = await Promise.all([
          await stripe.customers.listSources(stripeCustomerId),
          await stripe.customers.retrieve(stripeCustomerId)
        ])
        const { data } = result[0]
        const { default_source } = result[1] // eslint-disable-line camelcase
        return data.map(card => Object.assign(card, {
          isDefault: (card.id === default_source) // eslint-disable-line camelcase
        }))
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
   * Add a Card to a Customer
   * @param {string} stripeCustomerId Id of the Customer to whom the Card is to be added (begins with "cus_")
   * @param {string} stripeToken The token representing the Card to add, genetrated client-side using Stripe.js, etc.
   * @returns {Promise}
   */
    async addCustomerCard(stripeCustomerId, stripeToken) {
      try {
        return await stripe.customers.createSource(stripeCustomerId, {
          source: stripeToken
        })
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Delete a Customer's Card
     * @param {string} stripeCustomerId Id of the Customer for whom the Card is to be deleted (begins with "cus_")
     * @param {string} cardId Id of the Card to be deleted
     * @returns {Promise}
     */
    async deleteCustomerCard(stripeCustomerId, cardId) {
      try {
        return await stripe
          .customers
          .deleteSource(stripeCustomerId, cardId)
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Get a Customer's default Card. Note that, this info is already available implicitly from `fetchCustomerCards()`
     * @param {string} stripeCustomerId Customer Id (begins with "cus_")
     * @returns {Promise}
     */
    async getDefaultCustomerCard(stripeCustomerId) {
      try {
        const {
          default_source // eslint-disable-line camelcase
        } = await stripe.customers.retrieve(stripeCustomerId)
        return default_source // eslint-disable-line camelcase
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Set an existing Customer Card as the default payment source
     * @param {string} stripeCustomerId Customer Id (begins with "cus_")
     * @param {string} stripeCardId The id of the Card to be set as default. Must be one of the Customer's existing Cards.
     * @returns {Promise}
     */
    async setDefaultCustomerCard(stripeCustomerId, stripeCardId) {
      try {
        const {
          default_source // eslint-disable-line camelcase
        } = await stripe.customers.update(stripeCustomerId, { // eslint-disable-line camelcase
          default_source: stripeCardId
        })
        return default_source // eslint-disable-line camelcase
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Set the default Bank A/c for a Vendor (Custom Account on Stripe)
     * @param {string} stripeAccountId Vendor Id (begins with "acct_")
     * @param {object} _ The Bank A/c details
     * @param {string}  _.routingNo
     * @param {string} _.accountNo
     * @param {string} [_.accountHolderName=null]
     * @param {string} [_.country=US]
     * @param {string} [_.currency=usd]
     * @returns {Promise}
     */
    async setVendorBankAccount(stripeAccountId, {
      routingNo,
      accountNo,
      accountHolderName = null,
      country = "US",
      currency = "usd"
    }) {
      try {
        const accountObj = {
          object: "bank_account",
          country,
          currency,
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
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Update KYC details for a Vendor (Stripe Custom Account). These are mandatory to be able to receive payments and payouts.
     * @param {string} stripeAccountId Vendor Id (begins with "acct_")
     * @param {object} _ The KYC details
     * @param {object} _.address Address details
     * @param {string} _.address.city City
     * @param {string} _.address.line1 Address Line 1
     * @param {string} _.address.line2 Address Line 2
     * @param {string} _.address.postal_code ZIP/Postal Code
     * @param {string} _.address.state State/County/Province/Region
     * @param {string} _.address.country 2-letter Country Code
     * @param {object} _.dob Date of Birth
     * @param {string} _.dob.day Day of Birth
     * @param {string} _.dob.month Month of Birth
     * @param {string} _.dob.year Year of Birth
     * @param {object} _.name Name
     * @param {string} _.name.first First Name
     * @param {string} _.name.last Last Name
     * @param {string} _.email Email Id
     * @param {string} _.phone Phone Number
     * @param {string} _.businessUrl Business url
     * @param {string} _.personalIdNumber Personal ID Number (For some Non US Countries)
     * @param {string} _.ssnLastFour Last 4 digits of the SSN
     * @param {string} _.mcc Stripe Merchant Category Code (Ref: https://stripe.com/docs/connect/setting-mcc)
     * @returns {Promise}
     */
    async vendorKyc(stripeAccountId, {
      address = {},
      dob = {},
      name = {},
      email = null,
      phone = null,
      businessUrl = null,
      ssnLastFour = null,
      personalIdNumber = null,
      mcc = null
    }) {
      try {
        const entityObj = {
          individual: {
            address,
            dob,
            first_name: name.first,
            last_name: name.last,
            id_number: personalIdNumber,
            ssn_last_4: ssnLastFour,
            email,
            phone
          },
          business_type: "individual",
          business_profile: {
            mcc,
            url: businessUrl
          }
        }
        if (ssnLastFour !== null && personalIdNumber !== null) {
          entityObj.individual.ssn_last_4 = ssnLastFour
          entityObj.individual.id_number = personalIdNumber
        }
        return await stripe.accounts.update(stripeAccountId, entityObj)
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * ToS acceptance of a Vendor (Stripe Custom Account)
     * @param {string} stripeAccountId Vendor Id (begins with "acct_")
     * @param {object} _ ToS Acceptance details
     * @param {number} _.tosAcceptanceDate Date (in UNIX timestamp format) of ToS acceptance
     * @param {string} _.tosAcceptanceIp IP address from where the ToS was accepted
     * @param {string} [_.tosUserAgent=null] User Agent string of the browser using which the ToS was accepted
     * @returns {Promise}
     */
    async vendorAcceptTos(stripeAccountId, {
      tosAcceptanceDate,
      tosAcceptanceIp,
      tosUserAgent = null
    }) {
      try {
        const tosObj = {
          date: tosAcceptanceDate,
          ip: tosAcceptanceIp,
        }
        if (tosUserAgent !== null) tosObj.user_agent = tosUserAgent
        return await stripe.accounts.update(stripeAccountId, {
          tos_acceptance: tosObj
        })
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Initiate a Payment (Stripe Charge creation)
     * @param {object} _ Payment (Stripe Charge) parameters
     * @param {boolean} [_.capture=false] Whether to capture this charge later or immediately. By default, it is set to false, signifying later capture. Note that such charges need to be captured manually within 7 days, beyond which it is automatically reveresed/refunded by Stripe.
     * @param {string} _.customer Id of the Customer (Stripe Customer) making the payment (begins with "cus_")
     * @param {string} _.vendor Id of the Vendor (Stripe Custom Account) to receive the payment (begins with "acct_")
     * @param {number} _.amount Amount to deduct from Customer
     * @param {number} _.vendorAmount Amount payable to the Vendor. Must be less than or equal to `amount`. Ideally, the difference between `amount` & `vendorAmount`, minus the Stripe fees, is what the Marketplace retains as profit.
     * @param {string} _.currency Currency code
     * @param {string} [_.receiptEmail=null] Email to mail the receipt from Stripe
     * @param {string} [_.description] Optional description
     * @param {string} [_.statementDescriptor] Text appearing on Bank/Card statements
     * @returns {Promise}
     */
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
        const opts = {
          capture,
          customer,
          amount: amount * 100, // convert to cents from dollar
          currency,
          description,
          destination: {
            amount: vendorAmount * 100,
            account: vendor,
          }
        }
        if (receiptEmail !== null) opts.receipt_email = receiptEmail
        if (statementDescriptor !== null) opts.statement_descriptor = statementDescriptor
        return await stripe.charges.create(opts)
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    },

    /**
     * Capture an existing Payment (Stripe Charge)
     * @param {string} transactionId Id of the Stripe Charge to capture (begins with "ch_")
     * @param {number} [vendorAmount=null] Optionally update the amount payable to Vendor. If not mentioned, the amount in original charge is used.
     * @param {string} [statementDescriptor] Text appearing on Bank/Card statements (overrides the one mentioned in original charge)
     * @returns {Promise}
     */
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
        // istanbul ignore next
        throw err
      }
    },

    /**
   * Refund a previously captured (but unrefunded) Charge
   * @param {string} transactionId The Stripe Charge Id to Refund
   * @param {string} amount Amount to refund
   * @param {string} [reason=null] Reason for refund
   * @returns {Promise}
   */
    async refund(transactionId, amount, reason = null) {
      try {
        const refundObj = {
          charge: transactionId,
          amount: amount * 100
        }
        if (reason !== null) {
          refundObj.reason = reason
        }
        return await stripe.refunds.create(refundObj)
      } catch (err) {
        // istanbul ignore next
        throw err
      }
    }
  }
}
