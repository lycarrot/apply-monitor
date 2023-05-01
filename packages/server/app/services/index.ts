import models from "../models";
import Collect from "./collect";

interface ServicesMap {
  [key:string]: typeof Collect;
}
interface Services {
  [key:string]: InstanceType<typeof Collect>;
}
const servicesMap: ServicesMap = {
  'collect': Collect,
};

const services:Services = {}

Object.keys(servicesMap).forEach((name:string) => {
  services[name] = new servicesMap[name](models)
});


export default services