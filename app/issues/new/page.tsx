"use client";
import { Button, TextArea, TextField } from "@radix-ui/themes";

const NewIssue = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root className="max-w-full">
        <TextField.Input placeholder="Title" />
      </TextField.Root>
      <TextArea placeholder="Description" />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssue;
