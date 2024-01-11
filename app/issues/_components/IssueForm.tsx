"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { issueSchema } from "@/app/validationSchema";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";

// infer type using zod
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (issue) await axios.patch("/api/issues/" + issue.id, data);
      else await axios.post("/api/issues", data);
      router.push("/issues");
      router.refresh(); // refersh content
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  });

  
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <TextField.Root className="max-w-full">
            <TextField.Input
              defaultValue={issue?.title}
              {...register("title")}
              placeholder="Title"
            />
          </TextField.Root>
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </div>
        <div className="flex gap-2">
          <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
          </Button>
          {isSubmitting && <Spinner />}
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
