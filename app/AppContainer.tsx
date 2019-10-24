import { Frame, Page, Color, PercentLength } from "tns-core-modules/ui/frame/frame";
import * as React from "react";
import { $Frame, $Page, $AbsoluteLayout} from "react-nativescript";
import { observer } from "mobx-react";
import { decorate, observable } from "mobx";
import $AppBar from "./AppBar/AppBar";
import MainScreen from "./MainScreen";
import { device } from "tns-core-modules/platform/platform";
import CameraScreen from "./CameraScreen";

export const rootRef: React.RefObject<Frame> = React.createRef<Frame>();

const mainScreenRef = React.createRef<MainScreen>();
const cameraScreenRef = React.createRef<CameraScreen>();

// for navigating
export const shell = {
    navigate : (screen : Screens) => {
        const frame = rootRef.current;
        switch(screen) {
            case (Screens.main) : { 
                frame.navigate({ create: () => mainScreenRef.current.pageRef.current }) // <- won't be used user can navigate back
            }
            case (Screens.camera) : {
                frame.navigate({ create: () => cameraScreenRef.current.pageRef.current });
            }
        }
    },
}
export enum Screens { 
    "main" = "main",
    "camera" = "camera"
}


class AppContainer extends React.Component { 
    
    // frameRef = React.createRef<Frame>();

    componentDidMount() {

        rootRef.current.addEventListener(Frame.loadedEvent, () => {

        });

        rootRef.current.navigate({
            create:() => {
                const page = mainScreenRef.current.pageRef.current;
                
                
                return page;
            }
        });
        
    }
    render() {
        return (
            <$Frame ref={rootRef}>
                <MainScreen ref={mainScreenRef}/>
                <CameraScreen ref={cameraScreenRef}/>
            </$Frame>
        )
    }
}

export default (observer(AppContainer));
