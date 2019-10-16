
import { TouchGestureEventData, PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";

import ImagerScreen from ".././ImagerScreen";
import "../Extensions"; // need to import something to get access to extension methods
import { AbsoluteLayout, Image, Color, View } from "react-nativescript/dist/client/ElementRegistry";

export default class CreateController {

    private static controller = null;
    static get(imagerScreen: AbsoluteLayout, interactor: Image, onImageCreated: (imageCreated: Image) => void): CreateController {
        if(CreateController.controller == null) {
            CreateController.controller = new CreateController(imagerScreen, interactor);
            CreateController.imageCreated = onImageCreated;
        }
        return CreateController.controller;
    }
    private static imageCreated: (imageCreated: Image) => void;
    constructor(imagerScreen: AbsoluteLayout, interactor: Image) {
        this._imagerScreen = imagerScreen;
        this._interactor = interactor;
        interactor.addEventListener("onTouch", this.select)
        interactor.addEventListener("onPan", this.pan);
    }
    private _imagerScreen: AbsoluteLayout = null;
    private _interactor: Image = null;
    private select = (touch: TouchGestureEventData) => {
        const action = touch.action;
        if(action == "down") {
            touch.X = touch.getX();
            touch.Y = touch.getY(); 
            this._touched = touch;
        } else if (action == "up" || action == "cancel") {
            this._release();
        }
    }
    private _touched: TouchGestureEventData = null;
    private pan = (pan: PanGestureEventData) => {
        const dX = pan.deltaX;
        const dY = pan.deltaY;
        if(this._shouldDraw()) {
            if(!this._createImage) {
                this._createImage = new Image(); // <-- needs more setup/setup as linkimage
            }
            // console.log("_touched: " + this._touched);
            this._createImage.backgroundColor = new Color('blue'); // for testing
            const x = this._touched.X;
            const y = this._touched.Y;

            this._imagerScreen.addImage(this._createImage, x, y, dX, dY);

        }
    }
    private _createImage: Image = null;
    // create additional checks, like if touched hidden linkareas (and pan)
    private _shouldDraw = () => {  
        const touched = this._touched != null;
        if(!touched) {
            return false;
        }
        const touchedInteractor = this._touched.view == this._interactor

        return touchedInteractor;
    }
    private _shouldCreate = () => {
        const width = this._createImage.width >= this._minimumSizeAllowed;
        const height = this._createImage.height >= this._minimumSizeAllowed;
        return width && height;
    }
    private _minimumSizeAllowed = 15;
    private _handleCreationEnd() {
        const image = this._createImage;
        if(image) {
            if(!this._shouldCreate()) {
                this._imagerScreen.removeChild(image);
            } else {
                // output of the controller here
                CreateController.imageCreated(image);
            }
        }
    }
    /* need to handle deselection - whenever any other ui activity end*/
    private _release() {
        this._touched = null;
        this._handleCreationEnd();
        this._createImage = null;
    }
}


/*
declare module "tns-core-modules/ui/text-field/text-field" {
    interface TextField {
        // setPlaceholder(placeholder: string);
        setAutofillHintContentType(contentType: AutofillHintContentType);
        // placeholder: string;
    }
    // what name should i use?!
    // can't use enum when places here from ComponentExample class
}
// TextField.prototype.setAutofillHintContentType = function(this: TextField, contentType: AutofillHintContentType) {
*/