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

For details, check the Api Docs [HERE](./APIDOCS.md).

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
