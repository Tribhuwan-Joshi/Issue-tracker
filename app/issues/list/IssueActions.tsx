import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {
  return (
    <Flex mb="5" justify="between">
      <Button>
        <Link href="/issues/new">NewIssue</Link>
      </Button>
      <IssueStatusFilter />
    </Flex>
  );
};
export default IssueActions;
