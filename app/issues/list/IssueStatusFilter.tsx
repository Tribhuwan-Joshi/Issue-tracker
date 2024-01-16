"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";

const statuses: { label: string; status?: Status }[] = [
  {
    label: "All",
  },
  {
    label: "Open",
    status: "OPEN",
  },
  { label: "Closed", status: "CLOSED" },
  {
    label: "In Progress",
    status: "IN_PROGRESS",
  },
];

const IssueStatusFilter = () => {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.status || " "}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};
export default IssueStatusFilter;
