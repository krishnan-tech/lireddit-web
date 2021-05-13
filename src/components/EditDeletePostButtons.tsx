import React from "react";
import { Box, IconButton, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  if (meData?.me?.id !== creatorId) {
    return null;
  }
  return (
    <Box ml="auto">
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          mr={5}
          icon={<EditIcon />}
          ml="auto"
          aria-label="Edit Post"
        />
      </NextLink>
      <IconButton
        as={Link}
        icon={<DeleteIcon />}
        aria-label="Delete Post"
        onClick={() => deletePost({ id })}
      />
    </Box>
  );
};
