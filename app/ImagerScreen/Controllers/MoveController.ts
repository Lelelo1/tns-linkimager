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
        if(touch.action == "down" && !this.moveImage) {
            this.moveImage = img;
            /*
            MoveController.imagerScreen.removeChild(this.moveImage);
            MoveController.imagerScreen.addChild(this.moveImage);
            */
            console.log(touch.eventName + " " + this.moveImage.automationText);
            // this.moveImage.addEventListener("onPan", this._pan)
            
        } else if (touch.action == "move"){
            // MoveController.interceptor.removeEventListener("onPan", this._pan)
        } else {
            // this.moveImage.removeEventListener("onPan", this._pan);
            this.moveImage = null;
            console.log("up or cancel " + img.automationText);
        }
    }
    private _pan = (pan: PanGestureEventData) => {
        if(this.moveImage) {
            // console.log(pan.eventName + " " + (pan.object as Image).automationText + " panDX: " + pan.deltaX + " panDY:" + pan.deltaY);
            console.log("left: " + this.moveImage.left + ", top: " + this.moveImage.top)
            const dX = pan.deltaX;
            const dY = pan.deltaY;
            
            this.moveImage.translateX = dX;
            this.moveImage.translateY = dY;
            
            /*
            const left = this.moveImage.left as number;
            const top = this.moveImage.top as number;
            this.moveImage.left =  left + PercentLength.toDevicePixels(dX);
            this.moveImage.top = top + PercentLength.toDevicePixels(dY);
            */
        }
    }
}