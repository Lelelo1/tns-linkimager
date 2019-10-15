import * as React from "react";
import { $AbsoluteLayout, $Button, $StackLayout, $Image, $GridLayout } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { CameraPlus } from "@nstudio/nativescript-camera-plus";
import { Button } from "tns-core-modules/ui/button/button";
import { AbsoluteLayout, Page, View, StackLayout, Image, GridLayout } from "react-nativescript/dist/client/ElementRegistry";
import { device } from "tns-core-modules/platform/platform";
import { PercentLength, Length } from "tns-core-modules/ui/page/page";
import { TouchGestureEventData, PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import CreateController from "./Controllers/CreateController";
import MoveController from "./Controllers/MoveController";
import { Reactified } from "rns-reactify/Reactified/Reactified";
import { LinkImage } from "~/Mixins/Mixins";
import ViewModel from "../ViewModel";
import { PercentRectangle, Rectangle } from "~/Mixins/Types";
// https://github.com/PeterStaev/nativescript-photo-editor

const RNSLinkImage = Reactified(LinkImage, "linkImage");


/* the conatainer/layer for all the imager ui and gestures*/
export default class ImagerScreen extends React.Component {
    
    // stackLayoutRef = React.createRef<StackLayout>()

    imagerScreenRef = React.createRef<AbsoluteLayout>();
    interactorRef = React.createRef<Image>();

    private _onImageCreated = (imageCreated: Image) => {
        const imagerScreen = this.imagerScreenRef.current;
        const interactor = this.interactorRef.current;

        imageCreated.addEventListener("onTap", () => {
            console.log("tapped image");
        });
        
        // MoveController.get(interactor).attach(imageCreated);
        MoveController.get(imagerScreen).attach(imageCreated);
        
    }

    currentLinkImageDisplayed: LinkImage = ViewModel.get().project;

    componentDidMount() {
        const imagerScreen = this.imagerScreenRef.current;
        const interactor = this.interactorRef.current;

        CreateController.get(imagerScreen, interactor, this._onImageCreated);
        
        
        setTimeout(() => {
            this.renderAreas();
        }, 0.000000000000000001)
        
       // this.renderAreas();
    }

    render() {
        return (
            <$AbsoluteLayout
                ref={this.imagerScreenRef}
                width={PercentLength.parse("100%")}
                height={PercentLength.parse("100%")}
            >
                {this.renderInteractor()}

            </$AbsoluteLayout>
        )
    }
    renderInteractor() {
        return <$Image
                ref={this.interactorRef}
                width={PercentLength.parse("100%")}
                height={PercentLength.parse("100%")}
                stretch={"aspectFill"}
                onTap={() => {
                    const imagerScreen = this.imagerScreenRef.current;
                    console.log(imagerScreen.getChildrenCount() - 1);
                }}
                src={this._imageOrLogo()}
        />
    }
    // can also render bad url/no resource message
    private _imageOrLogo() {
        const url = this.currentLinkImageDisplayed.url;
        return this.currentLinkImageDisplayed.url ? url : null; //logo
    }

    private bounds(percentRectangle: PercentRectangle): Rectangle {
        const compare = this.interactorRef.current;
        // console.log("compare width: " + compare.getActualSize() + ", height: " + compare.getActualSize());
        if(compare.getMeasuredWidth() < 1 || compare.getMeasuredHeight() < 1) {
            throw new Error("failed to get bounds of interactor to messure areas. Could determine bounds");
        }
        return new Rectangle(
            percentRectangle.x / 100  * compare.getActualSize().width,
            percentRectangle.y  / 100 * compare.getActualSize().height,
            percentRectangle.width / 100 * compare.getActualSize().width,
            percentRectangle.height / 100 * compare.getActualSize().height
        )
    }

    renderAreas() {
        
        this.currentLinkImageDisplayed.links.map((data) => {
            
            const paint = this.bounds(data.percentRectangle);
            console.log("paint: " + JSON.stringify(paint));
            
            const area = new Image();
            area.src = data.url;
            area.backgroundColor = new Color("purple");
            area.on("onTap", () => {
                this.currentLinkImageDisplayed = new LinkImage(data);
            });
            this.imagerScreenRef.current.addImage(area, paint.x, paint.y, paint.width, paint.height);
        });
        
    }
}




/* cmeraview covers all screen <--- fix.
 A button added is placed nexto appbar*/