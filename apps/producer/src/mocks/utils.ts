import { faker } from '@faker-js/faker';

// prettier-ignore
const predefinedRoutes = [
    { pathname: "/", routeId: "routes/_index", routePath: "" },
    { pathname: "/id/foo", routeId: "routes/id.$id", routePath: "/id/:id" },
    { pathname: "/user/bar", routeId: "routes/user.$username", routePath: "/user/:username" },
    { pathname: "/post/abc", routeId: "routes/post.$slug", routePath: "/post/:slug" },
    { pathname: "/category/js", routeId: "routes/category.$name", routePath: "/category/:name" },
    { pathname: "/tag/react", routeId: "routes/tag.$tag", routePath: "/tag/:tag" },
    { pathname: "/search/query", routeId: "routes/search.$query", routePath: "/search/:query" },
    { pathname: "/settings/general", routeId: "routes/settings.$section", routePath: "/settings/:section" },
    { pathname: "/dashboard/main", routeId: "routes/dashboard.$view", routePath: "/dashboard/:view" },
    { pathname: "/inbox/message", routeId: "routes/inbox.$messageId", routePath: "/inbox/:messageId" },
    { pathname: "/profile/info", routeId: "routes/profile.$tab", routePath: "/profile/:tab" },
    { pathname: "/team/123/project/456", routeId: "routes/team.$teamId.project.$projectId", routePath: "/team/:teamId/project/:projectId" },
    { pathname: "/org/789/repo/101", routeId: "routes/org.$orgId.repo.$repoId", routePath: "/org/:orgId/repo/:repoId" },
    { pathname: "/user/111/friends/222", routeId: "routes/user.$userId.friends.$friendId", routePath: "/user/:userId/friends/:friendId" },
    { pathname: "/course/333/lesson/444/exercise/555", routeId: "routes/course.$courseId.lesson.$lessonId.exercise.$exerciseId", routePath: "/course/:courseId/lesson/:lessonId/exercise/:exerciseId" },
    { pathname: "/forum/666/topic/777/comment/888", routeId: "routes/forum.$forumId.topic.$topicId.comment.$commentId", routePath: "/forum/:forumId/topic/:topicId/comment/:commentId" }
  ];

export function getRoute<T extends object>(
  cb?: (route: (typeof predefinedRoutes)[number]) => T,
) {
  const route = faker.helpers.arrayElement(predefinedRoutes);

  return cb ? cb(route) : route;
}
