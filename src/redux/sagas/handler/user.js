import { call, put } from "redux-saga/effects";
import { setUser } from "../../ducks/user";
import { requestGetUser } from "../request/user";

export function* handleGetUser(action) {
  try {
    const response = yield call(requestGetUser);
    const { data } = response;

    let finaData = [];
    data.map((ele) => {
      let temp = {};
      temp.key = ele.id;
      temp.name = ele.name;
      temp.id = ele.id;
      temp.email = ele.email;
      finaData.push(temp);
    });

    yield put(setUser(finaData));
  } catch (error) {
    console.log(error);
  }
}
