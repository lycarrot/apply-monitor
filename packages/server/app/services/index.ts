import models from "../models";
import Collect from "./collect";
import Error from "./error";
import { propAny } from "../types";

const servicesMap: propAny = {
  collect: Collect,
  error: Error,
};

const services: propAny = {};

Object.keys(servicesMap).forEach((name: string) => {
  services[name] = new servicesMap[name](models);
});

export default services;
