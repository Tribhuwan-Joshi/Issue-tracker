"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Box,
  Button,
  Flex,
  Container,
  DropdownMenu,
  Avatar,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className=" py-6 space-x-6  mb-5 px-5 border-b">
      <Container>
        <Flex direction="row" align="center" justify="between">
          <NavLinks />
          <Authoptions />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];
  return (
    <Box>
      <Flex gap="4" align="center">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                className={classnames({
                  navlink: true,
                  "!text-zinc-900": currentPath === link.href,
                })}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </Flex>
    </Box>
  );
};

const Authoptions = () => {
  const { status, data: session } = useSession();
  if (status == "loading") return null;
  if (status == "unauthenticated")
    return (
      <Button color="blue" variant="soft">
        <Link href="/api/auth/signin">Login</Link>
      </Button>
    );
  else
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="cursor-pointer">
            <Avatar
              radius="full"
              size="2"
              src={session!.user!.image!}
              fallback="?"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <Text>{session!.user!.email}</Text>
            <Button color="red" variant="soft">
              <Link href="/api/auth/signout">Logout</Link>
            </Button>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    );
};
export default NavBar;
