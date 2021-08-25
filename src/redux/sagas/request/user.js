import axios from "axios";
import { getUser, setUser } from "../../ducks/user";
import { useAppDispatch, useAppSelector } from "../../hooks";

export function requestGetUser() {
  //   if (user != undefined)
  return axios.request({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/users",
  });
}
