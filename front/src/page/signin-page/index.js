import "./index.css";
import Page from "../../component/page";
import Signin from "../../container/signin";

export default function Component() {
  return (
    <Page>
      <Signin title={"Sign in"} description={"Select login method"} />
    </Page>
  );
}
