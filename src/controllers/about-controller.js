export const aboutController = {
    index: {
      handler: function (request, h) {
        const viewData = {
          title: "About Wild Swimming",
        };
        return h.view("about-view", viewData);
      },
    },
  };