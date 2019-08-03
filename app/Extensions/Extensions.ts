
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { device } from "tns-core-modules/platform/platform";

declare module "tns-core-modules/ui/action-bar" {
    interface ActionBar {
        actionItemsOrientation: string;
    }
}
/*
Object.defineProperty(ActionBar.prototype, "left", {
    get (this: ActionBar) {
        if (device.os == "iOS") {
            return this as 
        }
    }
});
*/