
import {AbsoluteLayout, Image, View } from "react-nativescript/dist/client/ElementRegistry";
import { TouchGestureEventData } from "tns-core-modules/ui/gestures/gestures";
declare module "react-nativescript/dist/client/ElementRegistry" {
    interface AbsoluteLayout {
        addImage(this: AbsoluteLayout, image: Image, x: number,
             y: number, width: number, height: number);
    }
}

AbsoluteLayout.prototype.addImage = function (this: AbsoluteLayout, image: Image, x: number,
    y: number, width: number, height: number) {
        image.left = x;
        image.top = y;
        image.width = width;
        image.height = height;
        if(this.getChildIndex(image) == -1) {
            this.addChild(image);
        }
        // console.log("x: " + x + ", y: " + y + ", width: " + width + ", height: " + height);
    };
/* Beacuse can't getX(); touch.getY(); from the touched object in pan*/
declare module "tns-core-modules/ui/gestures/gestures" {
    interface TouchGestureEventData {
        X: number;
        Y: number;
    }
}

