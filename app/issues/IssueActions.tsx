import { Button } from "@radix-ui/themes";
import Link from "next/link";

const IssueActions = () => {
  return (
    <div className="mb-5">
      <Button>
        <Link href="/issues/new">NewIssue</Link>
      </Button>
    </div>
  );
}
export default IssueActions