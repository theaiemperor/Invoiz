import { Box } from "@/src/components/ui/box";
import { Text } from "@/src/components/ui/text";
import { Link, usePathname } from "expo-router";
import React, { PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";
import { Divider } from "../ui/divider";
import { HStack } from "../ui/hstack";
import { Image } from "../ui/image";

function isActive(path: string, href: string) {
  if (path === href) {
    return true;
  } else if (path.startsWith(href) && href !== "/") {
    return true;
  } else {
    return false;
  }
}

interface INavLink extends PropsWithChildren {
  href: string;
}
function NavLink({ children, href }: INavLink) {
  const path = usePathname();

  const underlineClass = isActive(path, href)
    ? "left-0 w-full"
    : "left-1/2 w-0 group-hover:left-0 group-hover:w-full";

  return (
    <Link href={href} asChild>
      <TouchableOpacity className="relative inline-block text-lg font-medium group">
        <Text className="font-semibold text-pretty relative z-10">
          {children}
        </Text>
        <Box
          className={`absolute bottom-0 h-[2px] bg-current transition-all duration-300 ease-out ${underlineClass}`}
        />
      </TouchableOpacity>
    </Link>
  );
}

interface Props {
  text: string;
  href: string;
}

export default function () {
  const links: Props[] = [
    { text: "Home", href: "/" },
    { text: "Settings", href: "/settings" },
  ];
  return (
    <React.Fragment>
      <HStack className="sticky top-0 p-3 shadow-sm z-50 bg-transparent">
        <HStack className="gap-5 flex-1">
          <Image
            source={{ uri: "/assets/assets/icon.png" }}
            alt="Logo"
            resizeMode="contain"
            className="w-8 h-full"
          />
          {links.map((link) => {
            return (
              <NavLink key={link.text} href={link.href}>
                {link.text}
              </NavLink>
            );
          })}
        </HStack>
      </HStack>
      <Divider />
    </React.Fragment>
  );
}
