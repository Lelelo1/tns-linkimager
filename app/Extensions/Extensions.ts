
// global extensions

import { Image } from "tns-core-modules/ui/image/image";
import "../Mixins/Mixins";

/*
// for accessing testable from image
declare module "tns-core-modules/ui/image/image" {
    interface Image {
        Testable(): Testable<typeof Image>.Test: 
    }
}
*/
// (extension methdos can be used to access the specific mixin type object)