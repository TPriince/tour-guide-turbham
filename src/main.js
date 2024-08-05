import "./style.css";

// export individual components
import TourGuide from "./components/TourGuide.vue";
import GuideWrapper from "./components/GuideWrapper.vue";
import Guide from "./components/Guide.vue";

export { TourGuide, GuideWrapper, Guide };

// export the entire library as a plugin, so it can be installed via app.use()
// comment this out if you don't want to install the entire library

export default {
  install: (app) => {
    app.component("TourGuide", TourGuide);
    app.component("GuideWrapper", GuideWrapper);
    app.component("Guide", Guide);
  },
};
