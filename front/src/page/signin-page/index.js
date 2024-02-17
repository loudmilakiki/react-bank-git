import "./index.css";
import Page from "../../component/page";
import Signin from "../../container/signin";
import Status from "../../component/status";
import Back from "../../component/back-button";

export default function Component() {
  return (
    <Page>
      <Status />
      <Back />
      <Signin title={"Sign in"} description={"Select login method"} />
    </Page>
  );
}
