import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import IssueActions from "./IssueActions";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";

interface Props {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
  };
}

const IssuesPage = async ({ searchParams }: Props) => {
  const statues = Object.values(Status);
  const status = statues.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const columns: { label: string; value: keyof Issue; className?: string }[] = [
    {
      label: "Issue",
      value: "title",
    },
    {
      label: "Status",
      value: "status",
      className: "hidden md:table-cell",
    },
    {
      label: "CreatedAt",
      value: "createdAt",
      className: "hidden md:table-cell",
    },
  ];

  const orderBy = columns.map((c) => c.value).includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({ where: { status }, orderBy });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((c) => (
              <Table.ColumnHeaderCell
                key={c.value}
                className={`${c.className} flex`}
              >
                <NextLink
                  href={{ query: { ...searchParams, orderBy: c.value } }}
                >
                  {c.label}
                </NextLink>
                {c.value === searchParams.orderBy && (
                  <ArrowUpIcon className="inline" />
                )}
              </Table.ColumnHeaderCell>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.RowHeaderCell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.status} />
                </div>
              </Table.RowHeaderCell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};
export default IssuesPage;

export const dynamic = "force-dynamic";
