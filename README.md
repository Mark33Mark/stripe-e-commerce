# Stripe-E-Commerce site

[Stripe - test credit cards](https://docs.stripe.com/testing)

[Stripe conditions for Donations](https://support.stripe.com/questions/requirements-for-accepting-tips-or-donations)

[fade hook](https://dev.to/ekeijl/simple-react-fade-animation-hook-5dp8)  

[fade hook code sandbox](https://codesandbox.io/p/sandbox/simple-component-fade-on-mount-3gjkn) 

[fade component example](https://stackoverflow.com/questions/65731647/how-to-fade-out-and-fade-in-in-react)

[Fade transition](https://codesandbox.io/p/sandbox/optimistic-nobel-z74j3r?file=%2Fpublic%2Fquotes.js%3A33%2C5)

[build react stripe donation form](https://dev.to/wra-sol/building-a-reactexpress-stripe-donation-form-2pek)

[Stripe - simple example React](https://docs.stripe.com/payments/quickstart)

[Stripe - testing tutorial](https://docs.stripe.com/payments/accept-a-payment?platform=web&ui=stripe-hosted#additional-testing-resources)

[Netlify-HTML working example](https://github.com/aperkaz/serverless-payments/tree/main/netlify/functions)

[Netlify-HTML walk through](https://www.freecodecamp.org/news/serverless-online-payments/)

## web components

[web component tutorial](https://dev.to/jennieji/web-component-tutorial-for-react-devs-4mlc)


## Curl method for Random Number

examples from https://random.org :

https://api.random.org/json-rpc/4/basic

{
    "jsonrpc": "2.0",
    "method": "generateIntegers",
    "params": {
        "apiKey": "73dfaf89-cf80-441f-8555-9447b75c3e7f",
        "n": 1,
        "min": 1,
        "max": 1000,
	"replacement": false
    },
    "id": "watsonised-001"
}

https://api.random.org/json-rpc/4/invoke

{"jsonrpc": "2.0","method": "generateIntegers","params": {"apiKey": "73dfaf89-cf80-441f-8555-9447b75c3e7f","n": 1,"min": 1,"max": 1000,"replacement": false},"id": "watsonised-001"}

curl -H "Content-Type: application/json" -d '{"jsonrpc": "2.0","method": "generateIntegers","params": {"apiKey": "73dfaf89-cf80-441f-8555-9447b75c3e7f","n": 1,"min": 1,"max": 1000,"replacement": false},"id": "watsonised-001"}' https://api.random.org/json-rpc/4/invoke



[Make API call using a hook](https://stackoverflow.com/questions/55647287/how-to-send-request-on-click-react-hooks-way)
