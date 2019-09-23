import { Image, AbsoluteLayout, Observable } from "react-nativescript/dist/client/ElementRegistry";
import { TouchGestureEventData, PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { PercentLength } from "tns-core-modules/ui/page/page";

export default class MoveController {
    private static controller = null;
    // not interceptor: Image since pan otherwise does not activate
    public static get(imagerScreen: AbsoluteLayout): MoveController {
        if (MoveController.controller == null) {
            MoveController.controller = new MoveController();
            // MoveController.interceptor = interceptor;
            MoveController.imagerScreen = imagerScreen;
        }
        return MoveController.controller;
    }

    // private static interceptor: Image = null;
    private static imagerScreen: AbsoluteLayout;
    attach(image: Image): void {
        image.addEventListener("onTouch", this.select);
        image.addEventListener("onPan", this._pan);
    }

    private moveImage: Image = null;
    private select = (touch: TouchGestureEventData) => {
        const img = touch.object as Image;
        if(touch.action == "down") {
            this.moveImage = img;
        } else if (touch.action == "move"){

        } else {
            // this.moveImage.removeEventListener("onPan", this._pan);
            this.moveImage = null;
        }
    }
    prevDeltaX: number;
    prevDeltaY: number;
    private _pan = (pan: PanGestureEventData) => {
        if(this.moveImage) {
            if (pan.state === 1) {
                this.prevDeltaX = 0;
                this.prevDeltaY = 0;
            }
            else if (pan.state === 2) {
                this.moveImage.translateX += pan.deltaX - this.prevDeltaX;
                this.moveImage.translateY += pan.deltaY - this.prevDeltaY;
    
                this.prevDeltaX = pan.deltaX;
                this.prevDeltaY = pan.deltaY;
            }
        }
    }
}