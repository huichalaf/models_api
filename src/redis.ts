import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: 'https://adjusted-skunk-39938.upstash.io',
  token: 'AZwCASQgZTBhNGQxZGYtZThhMC00ZDg1LWJkMjYtZGNjMzQwYmM0NGU4ZjJiY2JhNTdkZWVhNDU4N2IzMTZjODIxYTZhN2FhMWI=',
})
   
const data = await redis.set('foo', 'bar');
console.log(data);
const value = await redis.get('foo');
console.log(value);
