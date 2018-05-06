# stripe-connect-functions ![node](https://img.shields.io/node/v/stripe-connect-functions.svg)

![Travis](https://img.shields.io/travis/sayanriju/stripe-connect-functions.svg) ![Coveralls github](https://img.shields.io/coveralls/github/sayanriju/stripe-connect-functions.svg) ![David](https://img.shields.io/david/sayanriju/stripe-connect-functions.svg) ![David](https://img.shields.io/david/dev/sayanriju/stripe-connect-functions.svg)

[![NPM](https://nodei.co/npm/stripe-connect-functions.png)](https://nodei.co/npm/stripe-connect-functions/)

This package provides a collection of functions to help with a _Customers -> Marketplace -> Vendors_ Workflow using [Stripe Connect](https://stripe.com/connect).

All the provided functions internally uses the [official NodeJS library for Stripe](https://www.npmjs.com/package/stripe).

## Example Workflow

The following activity diagrams try to elucidate a rudimentary workflow. The various stages are labelled with the librarry function names to use in each case.

![https://github.com/sayanriju/stripe-connect-functions/blob/master/Stripe_Connect_Workflow_1.jpg](https://github.com/sayanriju/stripe-connect-functions/blob/master/Stripe_Connect_Workflow_1.jpg "Activity Diagram: User Management")

![https://github.com/sayanriju/stripe-connect-functions/blob/master/Stripe_Connect_Workflow_2.jpg](https://github.com/sayanriju/stripe-connect-functions/blob/master/Stripe_Connect_Workflow_2.jpg "Activity Diagram: Payment Flow")

## Installation & Basic Usage

0.  Set up a Stripe Connect Account and obtain the _Secret key_, which is in the form `sk_myapp_k9DHwQESw7ntTGzdjS7vFsHs`

1.  Install:

    ```shell
    npm install stripe-connect-functions
    ```

    ​

2.  Initialize:

    ```javascript
    const stripeConnect = require("stripe-connect-functions")("sk_myapp_k9DHwQESw7ntTGzdjS7vFsHs")
    // ^^ Remember to replace with your own key!
    ```

3.  Use:

    ```javascript
    stripeConnect.fetchCustomerCards("cus_Ckc6NCwnBdzDCb")
    	.then(console.log, console.log) // returns a Promise!
    ```

For details, check the Api Docs below.

## API Docs

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

-   [customerCreate](#customercreate)
-   [customerDelete](#customerdelete)
-   [vendorCreate](#vendorcreate)
-   [vendorDelete](#vendordelete)
-   [fetchCustomerCards](#fetchcustomercards)
-   [addCustomerCard](#addcustomercard)
-   [deleteCustomerCard](#deletecustomercard)
-   [getDefaultCustomerCard](#getdefaultcustomercard)
-   [setDefaultCustomerCard](#setdefaultcustomercard)
-   [setVendorBankAccount](#setvendorbankaccount)
-   [vendorKyc](#vendorkyc)
-   [vendorAcceptTos](#vendoraccepttos)
-   [initiatePayment](#initiatepayment)
-   [capturePayment](#capturepayment)
-   [refund](#refund)

### customerCreate

Create a Customer on Stripe

**Parameters**

-   `email` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `null`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### customerDelete

Delete a Customer on Stripe

**Parameters**

-   `stripeCustomerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Customer ID to delete (begins with "cus\_")

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### vendorCreate

Create a Vendor (Custom Account on Stripe)

**Parameters**

-   `email` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)**  (optional, default `null`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### vendorDelete

Delete a Vendor (Custom Account on Stripe)

**Parameters**

-   `stripeAccountId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Vendor ID (Custom Account on Stripe) to delete (begins with "acct\_")

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### fetchCustomerCards

Fetch all the Cards (or other sources) associated with the Customer with the provided id. The default card is marked as such.

**Parameters**

-   `stripeCustomerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Customer Id (begins with "cus\_")

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### addCustomerCard

Add a Card to a Customer

**Parameters**

-   `stripeCustomerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the Customer to whom the Card is to be added (begins with "cus\_")
-   `stripeToken` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The token representing the Card to add, genetrated client-side using Stripe.js, etc.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### deleteCustomerCard

Delete a Customer's Card

**Parameters**

-   `stripeCustomerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the Customer for whom the Card is to be deleted (begins with "cus\_")
-   `cardId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the Card to be deleted

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### getDefaultCustomerCard

Get a Customer's default Card. Note that, this info is already available implicitly from `fetchCustomerCards()`

**Parameters**

-   `stripeCustomerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Customer Id (begins with "cus\_")

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### setDefaultCustomerCard

Set an existing Customer Card as the default payment source

**Parameters**

-   `stripeCustomerId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Customer Id (begins with "cus\_")
-   `stripeCardId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The id of the Card to be set as default. Must be one of the Customer's existing Cards.

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### setVendorBankAccount

Set the default Bank A/c for a Vendor (Custom Account on Stripe)

**Parameters**

-   `stripeAccountId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Vendor Id (begins with "acct\_")
-   `_` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The Bank A/c details
    -   `_.routingNo` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `_.accountNo` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 
    -   `_.accountHolderName` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?**  (optional, default `null`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### vendorKyc

Update KYC details for a Vendor (Stripe Custom Account). These are mandatory to be able to receive payments and payouts.

**Parameters**

-   `stripeAccountId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Vendor Id (begins with "acct\_")
-   `_` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** The KYC details
    -   `_.address` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Address details (optional, default `{}`)
        -   `_.address.city` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** City
        -   `_.address.line1` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Address Line 1
        -   `_.address.line2` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Address Line 2
        -   `_.address.postal_code` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** ZIP/Postal Code
        -   `_.address.state` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** State/County/Province/Region
        -   `_.address.country` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** 2-letter Country Code
    -   `_.dob` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Date of Birth (optional, default `{}`)
        -   `_.dob.day` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Day of Birth
        -   `_.dob.month` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Month of Birth
        -   `_.dob.year` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Year of Birth
    -   `_.name` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Name (optional, default `{}`)
        -   `_.name.first` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** First Name
        -   `_.name.last` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Last Name
    -   `_.ssnLastFour` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Last 4 digits of the SSN (optional, default `null`)
    -   `_.fullSsn` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The full SSN (optional, default `null`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### vendorAcceptTos

ToS acceptance of a Vendor (Stripe Custom Account)

**Parameters**

-   `stripeAccountId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Vendor Id (begins with "acct\_")
-   `_` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** ToS Acceptance details
    -   `_.tosAcceptanceDate` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Date (in UNIX timestamp format) of ToS acceptance
    -   `_.tosAcceptanceIp` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** IP address from where the ToS was accepted
    -   `_.tosUserAgent` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** User Agent string of the browser using which the ToS was accepted (optional, default `null`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### initiatePayment

Initiate a Payment (Stripe Charge creation)

**Parameters**

-   `_` **[object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** Payment (Stripe Charge) parameters
    -   `_.customer` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the Customer (Stripe Customer) making the payment (begins with "cus\_")
    -   `_.vendor` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the Vendor (Stripe Custom Account) to receive the payment (begins with "acct\_")
    -   `_.amount` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Amount to deduct from Customer
    -   `_.vendorAmount` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Amount payable to the Vendor. Must be less than or equal to `amount`. Ideally, the difference between `amount` & `vendorAmount`, minus the Stripe fees, is what the Marketplace retains as profit.
    -   `_.currency` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Currency code
    -   `_.receiptEmail` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Email to mail the receipt from Stripe (optional, default `null`)
    -   `_.description` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Optional description (optional, default `null`)
    -   `_.statementDescriptor` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Text appearing on Bank/Card statements (optional, default `null`)
    -   `_.capture` **[boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Whether to capture this charge later or immediately. By default, it is set to false, signifying later capture. Note that such charges need to be captured manually within 7 days, beyond which it is automatically reveresed/refunded by Stripe. (optional, default `false`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### capturePayment

Capture an existing Payment (Stripe Charge)

**Parameters**

-   `transactionId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Id of the Stripe Charge to capture (begins with "ch\_")
-   `vendorAmount` **[number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Optionally update the amount payable to Vendor. If not mentioned, the amount in original charge is used. (optional, default `null`)
-   `statementDescriptor` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)?** Text appearing on Bank/Card statements (overrides the one mentioned in original charge) (optional, default `null`)

Returns **[Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)** 

### refund

Refund a previously captured (but unrefunded) Charge

**Parameters**

-   `transactionId` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The Stripe Charge Id to Refund
-   `amount` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Amount to refund
-   `reason` **[string](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** Reason for refund (optional, default `null`)

## Testing

For Unit Tests,  [Ava](https://github.com/avajs/ava) is being used. Code  Coverage is provided by nyc/istanbul. All calls to the Stripe API are stubbed.

To run the included tests:

```shell
npm run test
## Or, if you don't want code coverage:
npm run test:nocoverage
```

## License

[MIT](https://github.com/sayanriju/stripe-connect-functions/blob/master/LICENSE)
