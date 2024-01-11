import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import EditButton from "./EditButton";
import IssueDetail from "./IssueDetail";
import DeleteButton from "./DeleteButton";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });
  if (!issue) notFound();
  await delay(2000);

  return (
    <Grid columns={{ initial: "1" ,sm:"5"}} gap="5">
      <Box className="col-span-4">
        <IssueDetail issue={issue} />
      </Box>
      <Box>
        <Flex gap="4" direction="column">
          <EditButton issueId={issue.id} />
          <DeleteButton issueId={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};
export default IssueDetailsPage;
