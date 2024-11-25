// Core
export { Root } from "@/Root";

import "@/styles/index.css";

// Components
export { DefaultLayout } from "@/components/layouts/default-layout/DefaultLayout.tsx";
export { Sidebar } from "@/components/sidebar/Sidebar";
export { Navbar } from "@/components/navbar/Navbar";
export { Input } from "@/components/form/inputs/input/Input.tsx";
export { Avatar } from "@/components/avatar/Avatar.tsx";
export { IconBox } from "@/components/iconbox/IconBox.tsx";
export { Dropdown } from "@/components/dropdown/Dropdown";
export { DropdownTrigger } from "@/components/dropdown/DropdownTrigger.tsx";
export { DropdownItem } from "@/components/dropdown/DropdownItem.tsx";
export { Button } from "@/components/button/Button.tsx";
export { SplitLayout } from "@/components/layouts/SplitLayout";
export { Dialog } from "@/components/dialog/Dialog";
export { DialogAction } from "@/components/dialog/DialogAction";
export { DialogBody } from "@/components/dialog/DialogBody";
export { DialogHeader } from "@/components/dialog/DialogHeader";
export { Radiobox } from "@/components/form/inputs/radiobox/Radiobox.tsx";
export { Checkbox } from "@/components/form/inputs/checkbox/Checkbox.tsx";
export { Toggle } from "@/components/form/inputs/toggle/Toggle.tsx";
export { Select } from "@/components/form/inputs/select/Select.tsx";

// Interfaces
export type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
export type { IUserMenuData } from "@/interfaces/components/navbar/IUserMenuData.ts";
export type { IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown";
export type { ISize, IRounded } from "@/interfaces/types/IMetrics.ts";

// Utils
export { redirectNative } from "@/actions/client/RedirectNative.ts";
export { generateId } from "@/utils/GenerateId.ts";
export { shouldBypass } from "@/utils/should-bypass/ShouldBypass.ts";

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
