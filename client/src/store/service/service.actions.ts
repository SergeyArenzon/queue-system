import { Service } from "./../../models/system/service";
import { serviceActionsEnum } from "./service.types";
import API from "../../models/axios/axios";

export const postService = (form: Service) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_SERVICE });
    const domain = localStorage.getItem("domain");

    API.post(domain + "/service")
      .then((res) => {
        return dispatch({
          type: serviceActionsEnum.SUCCESS_POST_SERVICE,
          service: res.data.service,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: serviceActionsEnum.FALID_SERVICE,
          error: msg,
        });
      });
  };
};

export const getAllServices = () => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_SERVICE });
    const domain = localStorage.getItem("domain");

    API.get(domain + "/business/service")
      .then((res) => {
        console.log(res.data);
        return dispatch({
          type: serviceActionsEnum.SUCCESS_GET_ALL_SERVICES,
          service: res.data.services,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        console.log(msg);
        return dispatch({
          type: serviceActionsEnum.FALID_SERVICE,
          error: msg,
        });
      });
  };
};


export const updateService = (service: Service) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_SERVICE });
    const domain = localStorage.getItem("domain");

    API.post(domain + "/business/service/" + service.id)
      .then((res) => {
        console.log(res.data);
        return dispatch({
          type: serviceActionsEnum.SUCCESS_UPDATE_SERVICE,
          service: res.data.service,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: serviceActionsEnum.FALID_SERVICE,
          error: msg,
        });
      });
  };
};

// export const deleteService = (form: Service, domain: string) => {
//   return (dispatch: any, getState: any) => {
//     dispatch({ type: serviceActionsEnum.START_POST_SERVICE });
//     const token = localStorage.getItem("token");
//     const send = { ...form, token };
//     API.delete(domain + "/business/service/"+form.id,form)
//       .then(() => {


//         return dispatch({
//           type: serviceActionsEnum.SUCCESS_POST_SERVICE,

//         });
//       })
//       .catch((error: any) => {
//         const msg = error.response.data.message;
//         return dispatch({
//           type: serviceActionsEnum.FALID_SERVICE,
//           error: msg,
//         });
//       });
//   };
// };