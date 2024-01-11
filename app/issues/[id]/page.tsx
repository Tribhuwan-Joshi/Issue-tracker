import { notFound } from "next/navigation";
import prisma from "@/prisma/client";
import { Card, Flex, Grid, Heading, Text, Box, Button } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import delay from "delay";
import Link from "next/link";
import { Pencil2Icon } from "@radix-ui/react-icons";

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
    <Grid columns={{ initial: "1", sm: "2" }} gap="5">
      <Box>
        <Heading>{issue.title}</Heading>
        <Flex gap="3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose" mt="4">
          <ReactMarkdown>{issue.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon /> <Link href={`/issues/${issue.id}/edit`}>Edit</Link>
        </Button>
      </Box>
    </Grid>
  );
};
export default IssueDetailsPage;
