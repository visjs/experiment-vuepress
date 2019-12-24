module.exports = {
  base: "/experiment-vuepress/documentation/",
  dest: "./documentation/",

  themeConfig: {
    nav: [
      { text: "Vis.js", link: "https://visjs.org/" },
      { text: "Guide", link: "/guide/" },
      {
        text: "All Projects",
        ariaLabel: "All Projects Menu",
        items: [
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
    sidebar: ["/guide/data-view/", "/guide/data-set/", "/guide/data-pipe/"],
    displayAllHeaders: true,

    locales: {
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
        // algolia docsearch options for current locale
        algolia: {}
      },
      "/cs-CZ/": {
        selectText: "Jazyky",
        label: "Čeština",
        editLinkText: "Upravit tuto stránku na GitHubu",
        serviceWorker: {
          updatePopup: {
            message: "Novej obsah je k dispozici.",
            buttonText: "Obnovit"
          }
        },
        nav: [
          { text: "Vis.js", link: "https://visjs.org/" },
          { text: "Příručka", link: "/cs-CZ/guide/" },
          {
            text: "Všechny projekty",
            ariaLabel: "Menu všech projektů",
            items: [
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
        algolia: {},
        sidebar: [
          "/cs-CZ/guide/data-view/",
          "/cs-CZ/guide/data-set/",
          "/cs-CZ/guide/data-pipe/"
        ]
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
    },
    "/cs-CZ/": {
      lang: "cs-CZ",
      title: "Vis Data",
      description:
        "Projekt obsahující Data Set, Data View a další nástroje pro práci s datama."
    }
  }
};
