import { Hono } from "hono";
import { logger } from "hono/logger";
import { usersRoute } from "./users/users";
import { discussionRoute } from "./discussions/discussions";
import { userDataSchema } from "./types";
import { zValidator } from "@hono/zod-validator";
import { fakeUserDatabase } from "./fakeDatabase";
import { comparePassword, hashPassword } from "./auth";
import { sign } from "hono/jwt";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { bearerAuth } from "hono/bearer-auth";

const app = new Hono();

const secretKey = "fortniteNiggaBalls";

app.use("*", logger());

app.use(
  "/users/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === getCookie(c, "token");
    },
  }),
);
app.use(
  "/discussions/*",
  bearerAuth({
    verifyToken: async (token, c) => {
      return token === getCookie(c, "token");
    },
  }),
);
app.route("/users", usersRoute);
app.route("/discussions", discussionRoute);

app.get("/", (c) => {
  return c.json({
    message: "Welcome to Social Media API",
    signup: "use /signup route to create a new account",
    login: "use /login route if you already have an account",
  });
});

app.post("/signup", zValidator("json", userDataSchema), async (c) => {
  const user = c.req.valid("json");
  const { name, mobile, email, password } = user;

  const existingUser = fakeUserDatabase.find((exp) => exp.email === email);
  if (existingUser) {
    return c.json(
      {
        error: "User already exists",
        message: "login with your existing account",
      },
      400,
    );
  }

  const hashedPassword = hashPassword(password);
  const newUser = {
    id: fakeUserDatabase.length + 1,
    name,
    mobile,
    email,
    password: hashedPassword,
  };

  fakeUserDatabase.push(newUser);
  console.log(newUser);

  const token = await sign(newUser, secretKey);

  return c.json({
    token,
  });
});

app.post("/login", async (c) => {
  const { email, password } = await c.req.json();

  const user = fakeUserDatabase.find((u) => u.email === email);
  if (!user) return c.json({ error: "User not found" }, 404);

  const passwordIsValid = comparePassword(password, user.password);
  if (!passwordIsValid) return c.json({ error: "Invalid password" }, 401);

  const token = await sign(user, secretKey);
  setCookie(c, "token", token);
  return c.json({ token });
});

app.get("/logout", async (c) => {
  deleteCookie(c, "token");
  return c.json({ message: "Logged out" });
});

export default app;
