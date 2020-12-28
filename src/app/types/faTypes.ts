import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";

export type FAIconName = IconName;
export type FAIconObject = { prefix: IconPrefix; iconName: IconName };
export type FAIcon = FAIconName | FAIconObject;
