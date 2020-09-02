import {notification} from "antd";
import {history} from "umi";

export default function validResponse(response) {
  if (response.code === 401) {
    notification.error({message: response.message});
    history.push("/user/login");
  }
  if (response.code !== 200) {
    notification.error({message: response.message});
    return false;
  }
  return true;
}
