import "./index.css";
import Page from "../../component/page";
import Wellcome from "../../container/wellcome";

export default function Component() {
  return (
    <Page>
      <Wellcome title={"Hello!"} description={"Wellcome to bank app"} />
    </Page>
  );
}
