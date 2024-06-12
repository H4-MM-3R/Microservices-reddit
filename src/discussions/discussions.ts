import { Hono } from "hono";
import { fakeDiscussionDatabase } from "../fakeDatabase";
import { zValidator } from "@hono/zod-validator";
import { discussionDataSchema } from "../types";

export const discussionRoute = new Hono()
  .get("/", (c) => {
    const { text, tag } = c.req.query();
    const entry = fakeDiscussionDatabase.filter((exp) => {
      if(text) return exp.text.includes(text);
      if(tag) return exp.hashtags.includes("#" + tag);
    });
    if (entry.length != 0) return c.json(entry);
    console.log("No entry found");
    return c.json({ data: fakeDiscussionDatabase });
  })
  .post("/", zValidator("json", discussionDataSchema), async (c) => {
    const discussion = c.req.valid("json");
    const { text, image, hashtags } = discussion;
    fakeDiscussionDatabase.push({
      id: fakeDiscussionDatabase.length + 1,
      text,
      image,
      hashtags,
      createdAt: new Date().toISOString().toString(),
    });
    return c.json(discussion);
  })
  .patch("/:id{[0-9]}", zValidator("json", discussionDataSchema), async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const updatedDiscussion = c.req.valid("json");
    const { text, image, hashtags } = updatedDiscussion;
    const origEntry = fakeDiscussionDatabase.findIndex((exp) => exp.id === id);
    if (origEntry === -1) return c.notFound();
    fakeDiscussionDatabase[origEntry].text = text;
    fakeDiscussionDatabase[origEntry].image = image;
    fakeDiscussionDatabase[origEntry].hashtags = hashtags;
    fakeDiscussionDatabase[origEntry].createdAt = new Date()
      .toISOString()
      .toString();
    return c.json(origEntry + 1);
  })
  .delete("/:id{[0-9]}", async (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const deletedEntry = fakeDiscussionDatabase.findIndex(
      (exp) => exp.id === id,
    );
    if (deletedEntry === -1) return c.notFound();
    fakeDiscussionDatabase.splice(deletedEntry, 1);
    return c.json(deletedEntry + 1);
  });
