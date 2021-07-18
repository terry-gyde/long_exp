export default {
  name: "gallery",
  type: "document",
  title: "Gallery",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Titles should be catchy, descriptive, and not too long",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description:
        "Some frontends will require a slug to be set to be able to show the post",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      description: "This can be used to schedule post for publishing",
    },
    {
      name: "imageGallery",
      type: "imageGallery",
      title: "Image Gallery",
    },
    {
      name: "categories",
      type: "array",
      title: "Categories",
      of: [
        {
          type: "reference",
          to: {
            type: "category",
          },
        },
      ],
    },
    {
      name: "body",
      type: "bodyPortableText",
      title: "Body",
    },
  ],
  orderings: [
    {
      name: "publishingDateAsc",
      title: "Publishing date new–>old",
      by: [
        {
          field: "publishedAt",
          direction: "asc",
        },
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
    {
      name: "publishingDateDesc",
      title: "Publishing date old->new",
      by: [
        {
          field: "publishedAt",
          direction: "desc",
        },
        {
          field: "title",
          direction: "asc",
        },
      ],
    },
  ],
};
