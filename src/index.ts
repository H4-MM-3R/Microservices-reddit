import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { usersRoute } from './users/users';

const app = new Hono()

app.use('*', logger());

app.route('/users', usersRoute);

app.get('/', (c) => {
  return c.json({data: "Welcome to Social Media API"})
})

export default app
