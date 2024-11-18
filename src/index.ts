// Core
export { Root } from "@/Root.tsx";

import "@/styles/index.css";

// Components
export { DefaultLayout } from "@/components/layouts/DefaultLayout.tsx";
export { Sidebar } from "@/components/sidebar/Sidebar.tsx";
export { Navbar } from "@/components/navbar/Navbar.tsx";
export { Input } from "@/components/inputs/Input.tsx";
export { UnderlinedInput } from "@/components/inputs/UnderlinedInput.tsx";
export { Avatar } from "@/components/Avatar.tsx";
export { IconBox } from "@/components/IconBox.tsx";
export { Dropdown } from "@/components/dropdown/Dropdown";
export { Button } from "@/components/Button.tsx";
export { SplitLayout } from "@/components/layouts/SplitLayout.tsx";

// Interfaces
export type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
export type { IUserMenuData } from "@/interfaces/components/navbar/IUserMenuData.ts";
export type { IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown";
export type { ISize, IRounded } from "@/interfaces/types/IMetrics.ts";

// Utils
export { redirectNative } from "@/utils/RedirectNative.ts";
export { generateId } from "@/utils/GenerateId.ts";
export { shouldBypass } from "@/utils/ShouldBypass.ts";

// Plugins
export { icons } from "@/plugins/Icons.tsx";

// Stores
export { useRouterStore } from "@/stores/RouterStore.ts";
export { useThemeStore } from "@/stores/ThemeStore.ts";

// ThirdParty
export { create } from "zustand";
export { type UIMatch, type RouteObject, type LoaderFunction, Navigate } from "react-router-dom";
