import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";

const IssueActions = ({status}:{status : Status | undefined}) => {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter status={status} />
      <Button>
        <Link href="/issues/new">NewIssue</Link>
      </Button>
    </Flex>
  );
};
export default IssueActions;
