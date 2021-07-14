export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "60ef75ee65dc6947e3b1a68b",
                  title: "Sanity Studio",
                  name: "long-exp-studio",
                  apiId: "aaf4d845-85d5-4369-9bba-952d8e77f565",
                },
                {
                  buildHookId: "60ef75ee3850ae4b9b2bcba0",
                  title: "Blog Website",
                  name: "long-exp",
                  apiId: "4cfc7d36-6345-40df-9d10-6853aaa3d758",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/terry-gyde/long_exp",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://long-exp.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};
