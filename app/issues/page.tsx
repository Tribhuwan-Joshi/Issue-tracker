import { Button } from "@radix-ui/themes";
import Link from "next/link";
const IssuesPage = () => {
  return (
    <div>
      <Button>
        <Link href="/issues/new">NewIssue</Link>
      </Button>
    </div>
  );
};
export default IssuesPage;
