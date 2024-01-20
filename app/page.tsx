import { Metadata } from "next";
import prisma from "@/prisma/client";
import IssueChart from "./IssueChart";
import IssueSummary from "./IssueSumary";
import LatestIssue from "./LatestIssue";
import { Flex, Grid } from "@radix-ui/themes";
export default async function Home() {
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Flex direction="column" gap="5">
        <IssueSummary open={open!} inProgress={inProgress!} closed={closed!} />
        <IssueChart open={open!} inProgress={inProgress!} closed={closed!} />
      </Flex>
      <LatestIssue />
    </Grid>
  );
}

export const metadata: Metadata = {
  title: "Issue Tracker - Dashboard",
  description: "View a summary of project issues",
};
