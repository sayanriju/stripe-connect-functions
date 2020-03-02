## Functions

<dl>
<dt><a href="#customerCreate">customerCreate([email])</a> ⇒ <code>Promise</code></dt>
<dd><p>Create a Customer on Stripe</p>
</dd>
<dt><a href="#customerDelete">customerDelete(stripeCustomerId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Delete a Customer on Stripe</p>
</dd>
<dt><a href="#vendorCreate">vendorCreate([email], [country])</a> ⇒ <code>Promise</code></dt>
<dd><p>Create a Vendor (Custom Account on Stripe)</p>
</dd>
<dt><a href="#vendorDelete">vendorDelete(stripeAccountId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Delete a Vendor (Custom Account on Stripe)</p>
</dd>
<dt><a href="#fetchCustomerCards">fetchCustomerCards(stripeCustomerId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Fetch all the Cards (or other sources) associated with the Customer with the provided id. The default card is marked as such.</p>
</dd>
<dt><a href="#addCustomerCard">addCustomerCard(stripeCustomerId, stripeToken)</a> ⇒ <code>Promise</code></dt>
<dd><p>Add a Card to a Customer</p>
</dd>
<dt><a href="#deleteCustomerCard">deleteCustomerCard(stripeCustomerId, cardId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Delete a Customer&#39;s Card</p>
</dd>
<dt><a href="#getDefaultCustomerCard">getDefaultCustomerCard(stripeCustomerId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Get a Customer&#39;s default Card. Note that, this info is already available implicitly from <code>fetchCustomerCards()</code></p>
</dd>
<dt><a href="#setDefaultCustomerCard">setDefaultCustomerCard(stripeCustomerId, stripeCardId)</a> ⇒ <code>Promise</code></dt>
<dd><p>Set an existing Customer Card as the default payment source</p>
</dd>
<dt><a href="#setVendorBankAccount">setVendorBankAccount(stripeAccountId, _)</a> ⇒ <code>Promise</code></dt>
<dd><p>Set the default Bank A/c for a Vendor (Custom Account on Stripe)</p>
</dd>
<dt><a href="#vendorKyc">vendorKyc(stripeAccountId, _)</a> ⇒ <code>Promise</code></dt>
<dd><p>Update KYC details for a Vendor (Stripe Custom Account). These are mandatory to be able to receive payments and payouts.</p>
</dd>
<dt><a href="#vendorAcceptTos">vendorAcceptTos(stripeAccountId, _)</a> ⇒ <code>Promise</code></dt>
<dd><p>ToS acceptance of a Vendor (Stripe Custom Account)</p>
</dd>
<dt><a href="#initiatePayment">initiatePayment(_)</a> ⇒ <code>Promise</code></dt>
<dd><p>Initiate a Payment (Stripe Charge creation)</p>
</dd>
<dt><a href="#capturePayment">capturePayment(transactionId, [vendorAmount], [statementDescriptor])</a> ⇒ <code>Promise</code></dt>
<dd><p>Capture an existing Payment (Stripe Charge)</p>
</dd>
<dt><a href="#refund">refund(transactionId, amount, [reason])</a> ⇒ <code>Promise</code></dt>
<dd><p>Refund a previously captured (but unrefunded) Charge</p>
</dd>
</dl>

<a name="customerCreate"></a>

## customerCreate([email]) ⇒ <code>Promise</code>
Create a Customer on Stripe

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [email] | <code>string</code> | <code>null</code> | 

<a name="customerDelete"></a>

## customerDelete(stripeCustomerId) ⇒ <code>Promise</code>
Delete a Customer on Stripe

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeCustomerId | <code>string</code> | Customer ID to delete (begins with "cus_") |

<a name="vendorCreate"></a>

## vendorCreate([email], [country]) ⇒ <code>Promise</code>
Create a Vendor (Custom Account on Stripe)

**Kind**: global function  

| Param | Type | Default |
| --- | --- | --- |
| [email] | <code>string</code> | <code>null</code> | 
| [country] | <code>string</code> | <code>&quot;US&quot;</code> | 

<a name="vendorDelete"></a>

## vendorDelete(stripeAccountId) ⇒ <code>Promise</code>
Delete a Vendor (Custom Account on Stripe)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeAccountId | <code>string</code> | Vendor ID (Custom Account on Stripe) to delete (begins with "acct_") |

<a name="fetchCustomerCards"></a>

## fetchCustomerCards(stripeCustomerId) ⇒ <code>Promise</code>
Fetch all the Cards (or other sources) associated with the Customer with the provided id. The default card is marked as such.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeCustomerId | <code>string</code> | Customer Id (begins with "cus_") |

<a name="addCustomerCard"></a>

## addCustomerCard(stripeCustomerId, stripeToken) ⇒ <code>Promise</code>
Add a Card to a Customer

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeCustomerId | <code>string</code> | Id of the Customer to whom the Card is to be added (begins with "cus_") |
| stripeToken | <code>string</code> | The token representing the Card to add, genetrated client-side using Stripe.js, etc. |

<a name="deleteCustomerCard"></a>

## deleteCustomerCard(stripeCustomerId, cardId) ⇒ <code>Promise</code>
Delete a Customer's Card

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeCustomerId | <code>string</code> | Id of the Customer for whom the Card is to be deleted (begins with "cus_") |
| cardId | <code>string</code> | Id of the Card to be deleted |

<a name="getDefaultCustomerCard"></a>

## getDefaultCustomerCard(stripeCustomerId) ⇒ <code>Promise</code>
Get a Customer's default Card. Note that, this info is already available implicitly from `fetchCustomerCards()`

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeCustomerId | <code>string</code> | Customer Id (begins with "cus_") |

<a name="setDefaultCustomerCard"></a>

## setDefaultCustomerCard(stripeCustomerId, stripeCardId) ⇒ <code>Promise</code>
Set an existing Customer Card as the default payment source

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeCustomerId | <code>string</code> | Customer Id (begins with "cus_") |
| stripeCardId | <code>string</code> | The id of the Card to be set as default. Must be one of the Customer's existing Cards. |

<a name="setVendorBankAccount"></a>

## setVendorBankAccount(stripeAccountId, _) ⇒ <code>Promise</code>
Set the default Bank A/c for a Vendor (Custom Account on Stripe)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stripeAccountId | <code>string</code> |  | Vendor Id (begins with "acct_") |
| _ | <code>object</code> |  | The Bank A/c details |
| _.routingNo | <code>string</code> |  |  |
| _.accountNo | <code>string</code> |  |  |
| [_.accountHolderName] | <code>string</code> | <code>null</code> |  |
| [_.country] | <code>string</code> | <code>&quot;US&quot;</code> |  |
| [_.currency] | <code>string</code> | <code>&quot;usd&quot;</code> |  |

<a name="vendorKyc"></a>

## vendorKyc(stripeAccountId, _) ⇒ <code>Promise</code>
Update KYC details for a Vendor (Stripe Custom Account). These are mandatory to be able to receive payments and payouts.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| stripeAccountId | <code>string</code> | Vendor Id (begins with "acct_") |
| _ | <code>object</code> | The KYC details |
| _.address | <code>object</code> | Address details |
| _.address.city | <code>string</code> | City |
| _.address.line1 | <code>string</code> | Address Line 1 |
| _.address.line2 | <code>string</code> | Address Line 2 |
| _.address.postal_code | <code>string</code> | ZIP/Postal Code |
| _.address.state | <code>string</code> | State/County/Province/Region |
| _.address.country | <code>string</code> | 2-letter Country Code |
| _.dob | <code>object</code> | Date of Birth |
| _.dob.day | <code>string</code> | Day of Birth |
| _.dob.month | <code>string</code> | Month of Birth |
| _.dob.year | <code>string</code> | Year of Birth |
| _.name | <code>object</code> | Name |
| _.name.first | <code>string</code> | First Name |
| _.name.last | <code>string</code> | Last Name |
| _.email | <code>string</code> | Email Id |
| _.phone | <code>string</code> | Phone Number |
| _.businessUrl | <code>string</code> | Business url |
| _.personalIdNumber | <code>string</code> | Personal ID Number (For some Non US Countries) |
| _.ssnLastFour | <code>string</code> | Last 4 digits of the SSN |
| _.mcc | <code>string</code> | Stripe Merchant Category Code (Ref: https://stripe.com/docs/connect/setting-mcc) |

<a name="vendorAcceptTos"></a>

## vendorAcceptTos(stripeAccountId, _) ⇒ <code>Promise</code>
ToS acceptance of a Vendor (Stripe Custom Account)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| stripeAccountId | <code>string</code> |  | Vendor Id (begins with "acct_") |
| _ | <code>object</code> |  | ToS Acceptance details |
| _.tosAcceptanceDate | <code>number</code> |  | Date (in UNIX timestamp format) of ToS acceptance |
| _.tosAcceptanceIp | <code>string</code> |  | IP address from where the ToS was accepted |
| [_.tosUserAgent] | <code>string</code> | <code>null</code> | User Agent string of the browser using which the ToS was accepted |

<a name="initiatePayment"></a>

## initiatePayment(_) ⇒ <code>Promise</code>
Initiate a Payment (Stripe Charge creation)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| _ | <code>object</code> |  | Payment (Stripe Charge) parameters |
| [_.capture] | <code>boolean</code> | <code>false</code> | Whether to capture this charge later or immediately. By default, it is set to false, signifying later capture. Note that such charges need to be captured manually within 7 days, beyond which it is automatically reveresed/refunded by Stripe. |
| _.customer | <code>string</code> |  | Id of the Customer (Stripe Customer) making the payment (begins with "cus_") |
| _.vendor | <code>string</code> |  | Id of the Vendor (Stripe Custom Account) to receive the payment (begins with "acct_") |
| _.amount | <code>number</code> |  | Amount to deduct from Customer |
| _.vendorAmount | <code>number</code> |  | Amount payable to the Vendor. Must be less than or equal to `amount`. Ideally, the difference between `amount` & `vendorAmount`, minus the Stripe fees, is what the Marketplace retains as profit. |
| _.currency | <code>string</code> |  | Currency code |
| [_.receiptEmail] | <code>string</code> | <code>null</code> | Email to mail the receipt from Stripe |
| [_.description] | <code>string</code> |  | Optional description |
| [_.statementDescriptor] | <code>string</code> |  | Text appearing on Bank/Card statements |

<a name="capturePayment"></a>

## capturePayment(transactionId, [vendorAmount], [statementDescriptor]) ⇒ <code>Promise</code>
Capture an existing Payment (Stripe Charge)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transactionId | <code>string</code> |  | Id of the Stripe Charge to capture (begins with "ch_") |
| [vendorAmount] | <code>number</code> | <code></code> | Optionally update the amount payable to Vendor. If not mentioned, the amount in original charge is used. |
| [statementDescriptor] | <code>string</code> |  | Text appearing on Bank/Card statements (overrides the one mentioned in original charge) |

<a name="refund"></a>

## refund(transactionId, amount, [reason]) ⇒ <code>Promise</code>
Refund a previously captured (but unrefunded) Charge

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| transactionId | <code>string</code> |  | The Stripe Charge Id to Refund |
| amount | <code>string</code> |  | Amount to refund |
| [reason] | <code>string</code> | <code>null</code> | Reason for refund |

