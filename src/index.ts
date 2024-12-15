// Core
export { Root } from "@/Root";
import "@/styles/index.css";

// Components
export { DefaultLayout } from "@/components/layouts/default-layout/DefaultLayout.tsx";
export { Sidebar } from "@/components/sidebar/main/Sidebar";
export { Navbar } from "@/components/navbar/Navbar";
export { Input } from "@/components/form/inputs/input/Input.tsx";
export { Avatar } from "@/components/avatar/Avatar.tsx";
export { IconBox } from "@/components/icon-box/IconBox.tsx";
export { Dropdown } from "@/components/dropdown/main/Dropdown.tsx";
export { DropdownTrigger } from "@/components/dropdown/trigger/DropdownTrigger.tsx";
export { DropdownItem } from "@/components/dropdown/item/DropdownItem.tsx";
export { Button } from "@/components/button/Button.tsx";
export { SplitLayout } from "@/components/layouts/split-layout/SplitLayout.tsx";
export { Dialog } from "@/components/dialog/main/Dialog.tsx";
export { DialogAction } from "@/components/dialog/action/DialogAction.tsx";
export { DialogBody } from "@/components/dialog/body/DialogBody.tsx";
export { DialogHeader } from "@/components/dialog/header/DialogHeader.tsx";
export { Radiobox } from "@/components/form/inputs/radiobox/Radiobox.tsx";
export { Checkbox } from "@/components/form/inputs/checkbox/Checkbox.tsx";
export { Toggle } from "@/components/form/inputs/toggle/Toggle.tsx";
export { Select } from "@/components/form/inputs/select/Select.tsx";
export { Textarea } from "@/components/form/inputs/textarea/Textarea.tsx";
export { Card } from "@/components/card/main/Card.tsx";
export { CardHeader } from "@/components/card/header/CardHeader.tsx";
export { CardBody } from "@/components/card/body/CardBody.tsx";
export { CardAction } from "@/components/card/action/CardAction.tsx";
export { FormCreator } from "@/components/form/creator/FormCreator.tsx";
export { FormControl } from "@/components/form/control/FormControl.tsx";
export { Breadcrumb } from "@/components/breadcrumb/Breadcrumb.tsx";
export { Tab } from "@/components/tab/Tab";
export { Dropzone } from "@/components/form/inputs/dropzone/Dropzone";
export { Pill } from "@/components/pill/Pill";

// Interfaces
export type { ISidebarMenu } from "@/interfaces/components/sidebar/ISidebarMenu.ts";
export type { IUserMenuData } from "@/interfaces/components/navbar/IUserMenuData.ts";
export type { IDropdownStyle } from "@/interfaces/components/dropdown/IDropdown";
export type { ILanguage } from "@/interfaces/ILanguage";
export type { ISize, IRounded } from "@/interfaces/types/IMetrics.ts";
export type { ICustomStylesConfig } from "@/interfaces/types/ICustomStyleConfig.ts";
export type { IFormFields, IFormField, IFormButton } from "@/interfaces/components/form/IFormCreator.ts";
export type { ICustomRouteObject } from "@/interfaces/plugins/ICustomRouteObject";
export type { ITabItem } from "@/interfaces/components/ITab";

// Utils
export { redirectNative } from "@/actions/client/RedirectNative.ts";
export { generateId } from "@/utils/GenerateId.ts";
export { shouldBypass } from "@/utils/should-bypass/ShouldBypass.ts";

// Plugins
export { icons } from "@/plugins/Icons";
export { emitter } from "@/plugins/Mitt";
export { handleLanguageChange } from "@/plugins/i18n/I18N";
export { toaster } from "@/plugins/Toaster";

// Locales
export { enTranslations as themeEnTranslations } from "@/locales/en/translations";
export { trTranslations as themeTrTranslations } from "@/locales/tr/translations";

// Events
export { dialogEvents } from "@/events/DialogEvents";

// Stores
export { useRouterStore } from "@/stores/RouterStore.ts";
export { useThemeStore } from "@/stores/ThemeStore.ts";

// ThirdParty
export { create } from "zustand";
export { z as zod } from "zod";
export { useForm, Controller } from "react-hook-form";
export { type LoaderFunction, Navigate } from "react-router-dom";
export type { ResourceLanguage } from "i18next";
export { default as classNames } from "classnames";
export { motion, AnimatePresence } from "framer-motion";
export { useTranslation } from "react-i18next";
export type { IFileError } from "dropzone-kit";
