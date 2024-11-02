// Core
export { Root } from "@/Root.tsx";

import "@/styles/index.css";

// Components
export { DefaultLayout } from "@/components/layouts/DefaultLayout.tsx";
export { Sidebar } from "@/components/sidebar/Sidebar.tsx";
export { Navbar } from "@/components/Navbar.tsx";

// Interfaces
export type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";

// Utils
export { redirectNative } from "@/utils/RedirectNative.ts";
export { generateId } from "@/utils/GenerateId.ts";
export { shouldBypass } from "@/utils/ShouldBypass.ts";

// Plugins
export { icons } from "@/plugins/Icons.tsx";

// ThirdParty
export { create } from "zustand";
export { type UIMatch, type RouteObject, type LoaderFunction, Navigate } from "react-router-dom";
