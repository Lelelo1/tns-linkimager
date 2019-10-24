
import * as React from "react";
import { Reactified } from "rns-reactify/Reactified/Reactified";
import { CameraPlus } from "@nstudio/nativescript-camera-plus";
import { PercentLength, Page } from "tns-core-modules/ui/page/page";
import { AbsoluteLayout } from "react-nativescript/dist/client/ElementRegistry";
import { $Page } from "react-nativescript";


const $CameraPlus = Reactified(CameraPlus, "cameraPlus");

/*
export default class CameraScreen {

    private static instance: CameraScreen = null;
    static get(): CameraScreen {
        if(CameraScreen.instance === null) {
            CameraScreen.instance = new CameraScreen();
        }
        return CameraScreen.instance;
    }

    private camera: CameraPlus;

    build(container: AbsoluteLayout) {
        this.camera = new CameraPlus();
        this.setProperties(this.camera);
        container.addChild(this.camera);
    }

    refresh() {
        const container = this.camera.parent as AbsoluteLayout;
        container.removeChild(this.camera);
        this.camera = null;
        this.build(container);
    }
    private setProperties(camera: CameraPlus) {
        camera.width = PercentLength.parse("100%");
        camera.height = PercentLength.parse("100%");
        camera.confirmPhotos = false;
        camera.confirmVideo = false;
        camera.on("photoCapturedEvent", () => {
            console.log("photo captured");
        })
    }
}
*/

export default class CameraScreen extends React.Component {
    
    pageRef = React.createRef<Page>();

    private cameraPlusRef = React.createRef<CameraPlus>();

    componentDidMount() {
        this.cameraPlusRef.current.on("photoCapturedEvent", () => {
            console.log("photoCaptured");
        });
        
    }

    render() {
        return (
            <$Page ref={this.pageRef}>
                <$CameraPlus
                    forwardedRef={this.cameraPlusRef}
                    width={PercentLength.parse("100%")}
                    height={PercentLength.parse("100%")}
                    confirmPhotos={false}
                    confirmVideo={false}
                />
            </$Page>
        )
    }
}