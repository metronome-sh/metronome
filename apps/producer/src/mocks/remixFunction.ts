import { faker } from '@faker-js/faker';

export function generateRemixFunction(type: 'action' | 'loader') {
  // prettier-ignore
  const predefinedRoutes = [
    { httpPathname: "/", routeId: "routes/_index", routePath: "" },
    { httpPathname: "/id/foo", routeId: "routes/id.$id", routePath: "/id/:id" },
    { httpPathname: "/user/bar", routeId: "routes/user.$username", routePath: "/user/:username" },
    { httpPathname: "/post/abc", routeId: "routes/post.$slug", routePath: "/post/:slug" },
    { httpPathname: "/category/js", routeId: "routes/category.$name", routePath: "/category/:name" },
    { httpPathname: "/tag/react", routeId: "routes/tag.$tag", routePath: "/tag/:tag" },
    { httpPathname: "/search/query", routeId: "routes/search.$query", routePath: "/search/:query" },
    { httpPathname: "/settings/general", routeId: "routes/settings.$section", routePath: "/settings/:section" },
    { httpPathname: "/dashboard/main", routeId: "routes/dashboard.$view", routePath: "/dashboard/:view" },
    { httpPathname: "/inbox/message", routeId: "routes/inbox.$messageId", routePath: "/inbox/:messageId" },
    { httpPathname: "/profile/info", routeId: "routes/profile.$tab", routePath: "/profile/:tab" },
    { httpPathname: "/team/123/project/456", routeId: "routes/team.$teamId.project.$projectId", routePath: "/team/:teamId/project/:projectId" },
    { httpPathname: "/org/789/repo/101", routeId: "routes/org.$orgId.repo.$repoId", routePath: "/org/:orgId/repo/:repoId" },
    { httpPathname: "/user/111/friends/222", routeId: "routes/user.$userId.friends.$friendId", routePath: "/user/:userId/friends/:friendId" },
    { httpPathname: "/course/333/lesson/444/exercise/555", routeId: "routes/course.$courseId.lesson.$lessonId.exercise.$exerciseId", routePath: "/course/:courseId/lesson/:lessonId/exercise/:exerciseId" },
    { httpPathname: "/forum/666/topic/777/comment/888", routeId: "routes/forum.$forumId.topic.$topicId.comment.$commentId", routePath: "/forum/:forumId/topic/:topicId/comment/:commentId" }
  ];

  const route = faker.helpers.arrayElement(predefinedRoutes);

  return {
    name: type,
    details: {
      name: type,
      timestamp: Date.now().valueOf(),
      duration: faker.number
        .bigInt({ min: 1_000_000, max: 1_000_000_000 })
        .toString(),
      errored: faker.datatype.boolean({ probability: 0.1 }),
      httpMethod: type === 'action' ? 'POST' : 'GET',
      httpStatusCode: 200,
      httpStatusText: 'Ok',
      version: '7.1.0-next.18',
      adapter: 'express',
      hash: '446b9c7b',
      ip: faker.internet.ipv4(),
      ua: faker.internet.userAgent(),
      startTime: '1794458220825042',
      ...route,
    },
  };
}
