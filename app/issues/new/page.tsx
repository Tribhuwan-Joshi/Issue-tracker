"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createIssueSchema } from "@/app/validationSchema";
import axios from "axios";
import { useState } from "react";
import { z } from "zod";

// infer type using zod
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error) {
            setError("An unexpected error occurred.");
          }
        })}
        className=" space-y-3"
      >
        <div>
          <TextField.Root className="max-w-full">
            <TextField.Input {...register("title")} placeholder="Title" />
          </TextField.Root>
          {errors.title && (
            <Text color="red" as="p">
              {errors.title.message}
            </Text>
          )}
        </div>
        <div>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          {errors.description && (
            <Text color="red" as="p">
              {errors.description.message}
            </Text>
          )}
        </div>

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssue;
