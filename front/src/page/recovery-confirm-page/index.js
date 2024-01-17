import "./index.css";

import "./index.css";

import "./index.css";
import Page from "../../component/page";
import RecoveryConfirmPage from "../../container/recovery-confirm-page";

export default function Component() {
  return (
    <Page>
      <RecoveryConfirmPage
        title={"Recover password"}
        description={"Write the code you received"}
      />
    </Page>
  );
}
