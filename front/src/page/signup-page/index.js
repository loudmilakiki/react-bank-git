import "./index.css";
import Page from "../../component/page";
import Signup from "../../container/signup";

export default function Component() {
  return (
    <Page>
      <Signup title={"Sign up"} description={"Choose a registration method"} />
    </Page>
  );
}
