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
import { PercentRectangle, Rectangle, Media } from "~/Mixins/Types";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import { PhotoEditor } from "@proplugins/nativescript-photo-editor";
import { ImageSource, fromUrl } from "tns-core-modules/image-source/image-source";
// import { Cache } from "tns-core-modules/ui/image-cache/image-cache";

// https://github.com/PeterStaev/nativescript-photo-editor

const RNSLinkImage = Reactified(LinkImage, "linkImage");

/* the conatainer/layer for all the imager ui and gestures*/
@observer
export default class ImagerScreen extends React.Component {
    
    // stackLayoutRef = React.createRef<StackLayout>()

    // imagerScreenRef = React.createRef<AbsoluteLayout>();
    interactorRef = React.createRef<Image>();

    private _onImageCreated = (imageCreated: Image) => {
        const viewModel = ViewModel.get();
        const imagerScreen = viewModel.imagerScreenRef.current;
        const interactor = this.interactorRef.current;
        // MoveController.get(imagerScreen).attach(imageCreated);
        console.log("imageCreated");
        this.percentRectangle(imageCreated).then((percentRectangle) => {
            console.log("then");
            const link = new LinkImage({url: null, media: Media.photo, percentRectangle});
            viewModel.combine(viewModel.currentLinkImageDisplayed, link);
            
        });
        
    }

    componentDidMount() {
        const viewModel = ViewModel.get();
        const imagerScreen = viewModel.imagerScreenRef.current;
        const interactor = this.interactorRef.current;

        CreateController.get(imagerScreen, interactor, this._onImageCreated);
        
        autorun(() => {
            console.log("updating... ");
            const trigger = viewModel.update;
            this.setState({}, () => {
                setTimeout(() => {
                    this.renderAreas();
                }, 0.000000000000000001)
            });
            
        })
        
    }


    render() {
        console.log("imageScreen render");
        return (
            <$AbsoluteLayout
                ref={ViewModel.get().imagerScreenRef}
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
                    
                }}
                src={this._imageOrLogo()}
        />
    }
    // can also render bad url/no resource message
    private _imageOrLogo() {
        const viewModel = ViewModel.get();
        const linkImageDisplayed = viewModel.currentLinkImageDisplayed
        
        if(linkImageDisplayed) {
            if(linkImageDisplayed.imageSource) {
                return linkImageDisplayed.imageSource; // photo edited
            }
            const url = viewModel.currentLinkImageDisplayed.url;
            return url ? url : null; // logo
        }
        return null;
    }

    private percentRectangle(bounds: Rectangle | Image): Promise<PercentRectangle> {
        console.log("percent rectangle");
        let rectangle = bounds instanceof Rectangle ? bounds: null;
        let image = bounds instanceof Image ? bounds: null;

        const compare = this.interactorRef.current;
        if(compare) {
            console.log("compare");
            if(compare.getMeasuredWidth() < 1 || compare.getMeasuredHeight() < 1) {
                throw new Error("failed to get bounds of interactor to set percentRectangle values. Could not set the percentages");
            }
            
            if(rectangle) {
                console.log("rectangle");
                return new Promise<PercentRectangle>((reject, resolve) => {
                    setTimeout(() => {
                        resolve(new PercentRectangle(
                            rectangle.x / compare.getActualSize().width,
                            rectangle.y / compare.getActualSize().height,
                            rectangle.width /  compare.getActualSize().width,
                            rectangle.height / compare.getActualSize().height 
                        ));
                    }, 0.000000000000001);
                });
            }
            return new Promise<PercentRectangle>((resolve, reject) => {
                setTimeout(() => {
                    console.log("returning ");
                    resolve(new PercentRectangle(
                        image.getLocationInWindow().x / compare.getActualSize().width,
                        image.getLocationInWindow().y / compare.getActualSize().height,
                        image.getActualSize().width /  compare.getActualSize().width,
                        image.getActualSize().height / compare.getActualSize().height 
                    ));
                }, 0.00000000000000001);
            });
        }
        console.log("returning null");

    }
    private bounds(percentRectangle: PercentRectangle): Rectangle {
        const compare = this.interactorRef.current;
        if(compare) {
            // console.log("compare width: " + compare.getActualSize() + ", height: " + compare.getActualSize());
            if(compare.getMeasuredWidth() < 1 || compare.getMeasuredHeight() < 1) {
                throw new Error("failed to get bounds of interactor to messure areas. Could determine bounds");
            }
            return new Rectangle(
                percentRectangle.x * compare.getActualSize().width,
                percentRectangle.y * compare.getActualSize().height,
                percentRectangle.width * compare.getActualSize().width,
                percentRectangle.height * compare.getActualSize().height
            )
        }
        return new Rectangle(-0.01, -0.01, -0.01, -0.01);
    }

    renderAreas() {
        const viewModel = ViewModel.get();
        console.log("render areas");
        // render new areas
        const imagerScreen = viewModel.imagerScreenRef.current;
        console.log("imageScreen: " + imagerScreen);
        if(imagerScreen) {
            console.log("count " + viewModel.currentLinkImageDisplayed.links.length);
            viewModel.currentLinkImageDisplayed.links.map((data) => {
                console.log("map");
                const paint = this.bounds(data.percentRectangle);
                console.log("paint: " + JSON.stringify(paint));
                
                const area = new Image();
                area.src = data.url;
                area.backgroundColor = new Color("purple");
                area.on("onTap", () => {
                    console.log("tap area: ");
                    viewModel.clearAreas();
                    const to = new LinkImage(data);
                    viewModel.combine(viewModel.currentLinkImageDisplayed, to);
                    viewModel.currentLinkImageDisplayed = to;
                    viewModel.update = !viewModel.update;
                });
                area.stretch = "aspectFill";
                console.log("current: "  + viewModel.imagerScreenRef.current);
                imagerScreen.addImage(area, paint.x, paint.y, paint.width, paint.height);

                // MoveController.get(imagerScreen).attach(area);
            });
        }
    }
    
}




/* cmeraview covers all screen <--- fix.
 A button added is placed nexto appbar*/