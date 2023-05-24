const config = {
  backend: {
    host: process.env.REACT_APP_HTTP_HOST,
    portHttp: process.env.REACT_APP_HTTP_PORT,
    portWs: process.env.REACT_APP_HTTP_PORTWS,
  },
  app: {
    develop: process.env.REACT_APP_DEVELOP,
  },
  map: {
    center: JSON.parse(process.env.REACT_APP_LOCATION_MAP),
    zoom_general: process.env.REACT_APP_MAP_ZOOM_GENERAL,
    zoom_specific: process.env.REACT_APP_MAP_ZOOM_SPECIFIC,
  },
  restore: {
    hash: "o6PBmJwBGLO;t12",
  },
};

module.exports = { config };
