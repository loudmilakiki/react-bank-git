import "./index.css";
import Signup from "../../container/signup";
import Page from "../../component/page";
import Back from "../../component/back-button";
import Status from "../../component/status";

export default function Component() {
  return (
    <Page>
      <Status />
      <Back />
      <Signup title={"Sign up"} description={"Choose a registration method"} />
    </Page>
  );
}
