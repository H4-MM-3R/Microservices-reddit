import { Hono } from "hono";
import { fakeDatabase } from "../fakeDatabase";
import { zValidator } from "@hono/zod-validator";
import { PostSchema } from "../types";

export const usersRoute = new Hono()
  .get("/", (c) => {
    return c.json({ data: fakeDatabase });
  })
  .get("/:id{[0-9]}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const entry = fakeDatabase.findIndex((exp) => exp.id === id);
    if (entry === -1) return c.notFound();
    return c.json(fakeDatabase[entry]);
  })
  .post("/", zValidator("json", PostSchema), async (c) => {
    const user = c.req.valid("json");
    const { name, mobile, email } = user;
    fakeDatabase.push({ id: fakeDatabase.length + 1, name, mobile, email });
    return c.json(user);
  })
  .delete("/:id{[0-9]}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const deletedEntry = fakeDatabase.findIndex((exp) => exp.id === id);
    if (deletedEntry === -1) return c.notFound();
    fakeDatabase.splice(deletedEntry, 1);
    return c.json(deletedEntry + 1);
  })
  .patch("/:id{[0-9]}", zValidator("json", PostSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const updatedEntry = c.req.valid("json");
    const { name, mobile, email } = updatedEntry;
    const originalEntry = fakeDatabase.findIndex((exp) => exp.id === id);
    if (originalEntry === -1) return c.notFound();
    fakeDatabase[originalEntry].name = name;
    fakeDatabase[originalEntry].mobile = mobile;
    fakeDatabase[originalEntry].email = email;
    return c.json(originalEntry + 1);
  });
