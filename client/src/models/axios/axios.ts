import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/",
  // baseURL: "https://queue-jz36q4rkyq-uk.a.run.app/",

  //headers: { "Access-Control-Allow-Origin": true },
});
