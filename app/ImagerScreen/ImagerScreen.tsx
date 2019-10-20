import * as React from "react";
import { $AbsoluteLayout, $Image } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";

import { Image} from "react-nativescript/dist/client/ElementRegistry";
import { PercentLength, Length } from "tns-core-modules/ui/page/page";
import CreateController from "./Controllers/CreateController";
import MoveController from "./Controllers/MoveController";
import { Reactified } from "rns-reactify/Reactified/Reactified";
import { LinkImage } from "~/Mixins/Mixins";
import ViewModel from "../ViewModel";
import { PercentRectangle, Rectangle, Media } from "~/Mixins/Types";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import { percentRectangle, bounds } from "./Utils";

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
        MoveController.get(viewModel.imagerScreenRef.current).attach(imageCreated);
        console.log("imageCreated");
        percentRectangle(imageCreated, this.interactorRef.current).then((percentRectangle) => {
            const link = new LinkImage({ url: null, media: Media.photo, percentRectangle });
            viewModel.combine(viewModel.currentLinkImageDisplayed, link);

            viewModel.update = !viewModel.update;
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
                const paint = bounds(data.percentRectangle, this.interactorRef.current);
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