import IssueSummary from "./IssueSumary";
import LatestIssue from "./LatestIssue";

export default async function Home() {
  const closed = await prisma?.issue.count({
    where: {
      status: "CLOSED",
    },
  });
  const inProgress = await prisma?.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });
  const open = await prisma?.issue.count({
    where: {
      status: "OPEN",
    },
  });
  // return <LatestIssue />;
  return (
    <IssueSummary closed={closed!} open={open!} inProgress={inProgress!} />
  );
}
