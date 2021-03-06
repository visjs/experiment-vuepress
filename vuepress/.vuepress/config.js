module.exports = {
  base: "/experiment-vuepress/documentation/",
  dest: "./documentation/",

  plugins: ["vuepress-plugin-element-tabs"],

  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 3,

    locales: {
      // English
      "/": {
        // text for the language dropdown
        selectText: "Languages",
        // label for this locale in the language dropdown
        label: "English",
        // Aria Label for locale in the dropdown
        ariaLabel: "Languages",
        // text for the edit-on-github link
        editLinkText: "Edit this page on GitHub",
        // config for Service Worker
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        // the navigation buttons at the top of the page
        nav: [
          { text: "Guide", link: "/guide/" },
          // { text: "Examples", link: "/../examples/" },
          {
            text: "GitHub",
            link: require("../../package.json").repository.url
          },
          {
            text: "All Projects",
            ariaLabel: "All Projects Menu",
            items: [
              { text: "Vis.js", link: "https://visjs.org/" },
              {
                text: "Vis Data",
                link: "https://visjs.github.io/vis-data/data/"
              },
              {
                text: "Vis Graph2D",
                link: "https://visjs.github.io/vis-timeline/docs/graph2d/"
              },
              {
                text: "Vis Graph3D",
                link: "https://visjs.github.io/vis-graph3d/docs/graph3d/"
              },
              {
                text: "Vis Network",
                link: "https://visjs.github.io/vis-network/docs/network/"
              },
              {
                text: "Vis Timeline",
                link: "https://visjs.github.io/vis-timeline/docs/timeline/"
              }
            ]
          }
        ],
        // sidebar links on the left (all heading will be automatically included)
        sidebar: [
          { title: "Data Set", path: "/guide/data-set/", collapsable: true },
          { title: "Data View", path: "/guide/data-view/", collapsable: true },
          { title: "Data Pipe", path: "/guide/data-pipe/", collapsable: true }
        ],
        // algolia docsearch options for current locale
        algolia: {}
      }
    }
  },

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    "/": {
      lang: "en-US", // this will be set as the lang attribute on <html>
      title: "Vis Data",
      description:
        "The home of Data Set and Data View among other data related tools."
    }
  }
};
