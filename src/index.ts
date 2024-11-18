// Core
export { Root } from "@/Root";

import "@/styles/index.css";

// Components
export { DefaultLayout } from "@/components/layouts/DefaultLayout";
export { Sidebar } from "@/components/sidebar/Sidebar";
export { Navbar } from "@/components/navbar/Navbar";
export { Input } from "@/components/inputs/Input";
export { UnderlinedInput } from "@/components/inputs/UnderlinedInput";
export { Avatar } from "@/components/Avatar";
export { IconBox } from "@/components/IconBox";
export { Dropdown } from "@/components/dropdown/Dropdown";
export { Button } from "@/components/Button";
export { SplitLayout } from "@/components/layouts/SplitLayout";
export { Dialog } from "@/components/overlays/dialog/Dialog";
export { DialogAction } from "@/components/overlays/dialog/DialogAction";
export { DialogBody } from "@/components/overlays/dialog/DialogBody";
export { DialogHeader } from "@/components/overlays/dialog/DialogHeader";

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
export { icons } from "@/plugins/Icons";
export { emitter } from "@/plugins/Mitt";

// Events
export { dialogEvents } from "@/events/DialogEvents";

// Stores
export { useRouterStore } from "@/stores/RouterStore.ts";
export { useThemeStore } from "@/stores/ThemeStore.ts";

// ThirdParty
export { create } from "zustand";
export { type UIMatch, type RouteObject, type LoaderFunction, Navigate } from "react-router-dom";
