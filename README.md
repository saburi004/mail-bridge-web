## Install
npm install mail-bridge

## Usage
```js
import { sendEmail } from "mail-bridge";

sendEmail({
  apiKey: "pk_xxxxxxxxx",
  to: "user@gmail.com",
  subject: "Hello",
  message: "Sent via Mail Bridge"
});
