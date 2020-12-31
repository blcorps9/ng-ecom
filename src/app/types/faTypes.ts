import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export type IFAIconName = IconName;
export type IFAIconObject = { prefix: IconPrefix; iconName: IconName };
export type IFAIcon = IFAIconName | IFAIconObject;
