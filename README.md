# Web Geeks Event Count

This is a microservice built to query the [DSM Web Geeks Eventbrite account](https://www.eventbrite.com/o/des-moines-web-geeks-10941387310) for attendance numbers.

## Usage

Pass a valid Eventbrite `eventUrl` for a Web Geeks event as a query param:

```
?eventUrl=https://www.eventbrite.com/e/blockchain-with-dave-wakeman-an-ibm-blockchain-tech-tickets-49409159125
```

And receive a JSON response:

```json
{
  "sold": 35,
  "total": 50
}
```

## Development

With Node >= v10:

```bash
yarn
yarn dev
```

## Deployment

This site is automatically deployed to [Now](https://zeit.co/now) via Github.

- All pushes to branches will be deployed to a unique staging URL
- All pushes to `master` will be deployed and aliased to https://webgeeks-count.now.sh

### Deploying manually

Be sure you have an account with the [DSM Web Geeks Zeit team](https://zeit.co):

```bash
now switch dsmwebgeeks
now
```
