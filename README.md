# Microservices for a Social Media Prototype

## Schemas (Intial)

### User

| Field  | Type    | Description       |
| ------ | ------- | ----------------- |
| id     | int     | Identifier        |
| name   | str     | Name of User      |
| mobile | num(10) | Mobile No of User |
| email  | email   | Email of User     |

### Discussion

| Field    | Type      | Description |
| -------- | --------- | ----------- |
| id       | int       | Identifier  |
| text     | str       | content     |
| image    | url       | imageUrl    |
| hashTags | str[]     | hashtags    |
| createOn | timeStamp | timeStamp   |


## Day-1 Tasks

## Expose API for the following

### User Service

- [x] Create a User
- [x] Update a User
- [x] Delete a User
- [x] Show list of Users
- [x] Search user based on name

### Discussion Service

- [ ] Create a Discussion
- [ ] Update a Discussion
- [ ] Delete a Discussion
- [ ] Get a List of Discussions based on tags
- [ ] Get a List of Discussions based on certain text

## Required functionalities

1.  [ ] User can login/signup.
2.  [ ] User can search for another users.
3.  [ ] User can follow another user.
4.  [ ] User can post a discussion. --> Text, Image + Text.
5.  [ ] Other Users can comment or like a discussion.
6.  [ ] Users can like a comment or reply on the comment
7.  [ ] Uses can delete or modify post after posting
8.  [ ] Users delete or modify comments
9.  [ ] Users can see view count of a post
10. [ ] Users can search for any posts using the hashtags


Expected Routes:

- /users - (get, post)
- /users/:id - (get, patch, delete)
- /discussions - (post)
- /discussions/:id - (patch, delete)
- /discussions/:tag - (get)
- /discussions/:text - (get)

Additional Routes:

- /user/auth - (post)
- /user/followers - (get)
- /user/follow/:id - (post)
- /user/post - (post)
- /user/post/:id - (patch, delete)
- /user/like/:postId - (patch)
- /user/comment - (post)
- /user/comment/:id - (patch, delete)

- /user/viewed/:postId - (patch)
- /user/posts/:tag - (get)





