import { IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import NextLink from "next/link";

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}
interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell
              key={c.value}
              className={`${c.className} flex`}
            >
              <NextLink href={{ query: { ...searchParams, orderBy: c.value } }}>
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
  );
};

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

export const columnNames = columns.map((column) => column.value);
export default IssueTable;
