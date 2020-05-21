import { Service } from "./../../models/system/service";
import { serviceState } from "./service.types";

export const initialserviceState: serviceState = {
  error: "",
  loading: false,
  services: [],
};
