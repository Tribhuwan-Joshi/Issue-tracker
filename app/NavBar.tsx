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
  const currentPath = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/issues/list", label: "Issues" },
  ];

  const { status, data: session } = useSession();

  return (
    <nav className=" py-6 space-x-6  mb-5 px-5 border-b">
      <Container>
        <Flex direction="row" align="center" justify="between">
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
                        "text-zinc-800": currentPath == link.href,
                        "text-zinc-500": currentPath !== link.href,
                        "hover:text-zinc-800 transition-colors": true,
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
          <Box>
            {status == "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="cursor-pointer">
                  <Avatar radius="full" size="3" src={session.user!.image!} fallback="" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <Text>{session.user!.email}</Text>
                  <Button color="red" variant="soft">
                    <Link href="/api/auth/signout">Logout</Link>
                  </Button>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status == "unauthenticated" && (
              <Button color="blue" variant="soft">
                <Link href="/api/auth/signin">Login</Link>
              </Button>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};
export default NavBar;
