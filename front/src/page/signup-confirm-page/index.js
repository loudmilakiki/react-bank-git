import "./index.css";
import Page from "../../component/page";
import SignupConfirm from "../../container/signup-confirm";

export default function Component() {
  return (
    <Page>
      <SignupConfirm
        title={"Recover password"}
        description={"Choose a registration method"}
      />
    </Page>
  );
}
