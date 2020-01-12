const utils = {
  parseRequestURL: () => {
    const url = location.hash.replace("#", "").toLowerCase() || "/";
    const [, resource, id, verb] = url.split("/");
    const request = {
      resource: null,
      id: null,
      verb: null
    };

    request.resource = resource;
    request.id = id;
    request.verb = verb;

    return request;
  },

  sleep: ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};

export default utils;
