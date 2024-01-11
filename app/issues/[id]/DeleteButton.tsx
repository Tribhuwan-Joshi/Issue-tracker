import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
const DeleteButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red">
      <MdDelete /> Delete
    </Button>
  );
};
export default DeleteButton;
