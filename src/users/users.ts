import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { fakeUserDatabase } from "../fakeDatabase";
import { userDataSchema } from "../types";

export const usersRoute = new Hono()
  .get("/", (c) => {
    return c.json({ data: fakeUserDatabase });
  })
  .get("/:id{[0-9]}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const entry = fakeUserDatabase.findIndex((exp) => exp.id === id);
    if (entry === -1) return c.notFound();
    return c.json(fakeUserDatabase[entry]);
  })
  .post("/", zValidator("json", userDataSchema), async (c) => {
    const user = c.req.valid("json");
    const { name, mobile, email, password } = user;
    fakeUserDatabase.push({ id: fakeUserDatabase.length + 1, name, mobile, email, password });
    return c.json(user);
  })
  .delete("/:id{[0-9]}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const deletedEntry = fakeUserDatabase.findIndex((exp) => exp.id === id);
    if (deletedEntry === -1) return c.notFound();
    fakeUserDatabase.splice(deletedEntry, 1);
    return c.json(deletedEntry + 1);
  })
  .patch("/:id{[0-9]}", zValidator("json", userDataSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const updatedEntry = c.req.valid("json");
    const { name, mobile, email } = updatedEntry;
    const originalEntry = fakeUserDatabase.findIndex((exp) => exp.id === id);
    if (originalEntry === -1) return c.notFound();
    fakeUserDatabase[originalEntry].name = name;
    fakeUserDatabase[originalEntry].mobile = mobile;
    fakeUserDatabase[originalEntry].email = email;
    fakeUserDatabase[originalEntry].password = updatedEntry.password;
    return c.json(originalEntry + 1);
  });
