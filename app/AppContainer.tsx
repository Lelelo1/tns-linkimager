import { Frame, Page, Color, PercentLength } from "tns-core-modules/ui/frame/frame";
import * as React from "react";
import { $Frame, $Page, $AbsoluteLayout} from "react-nativescript";
import { observer } from "mobx-react";
import { decorate, observable } from "mobx";
import $AppBar from "./AppBar/AppBar";
import MainScreen from "./MainScreen";
import { device } from "tns-core-modules/platform/platform";
export const rootRef: React.RefObject<Frame> = React.createRef<Frame>();

class AppContainer extends React.Component { 
    
    // frameRef = React.createRef<Frame>();

    private mainScreenRef = React.createRef<MainScreen>();

    componentDidMount() {

        rootRef.current.addEventListener(Frame.loadedEvent, () => {

        });

        rootRef.current.navigate({
            create:() => {

                
                const page = this.mainScreenRef.current.pageRef.current;
                
                
                return page;
            }
        });
        
    }
    render() {
        return (
            <$Frame ref={rootRef}>
                <MainScreen ref={this.mainScreenRef}/>
            </$Frame>
        )
    }
}

export default (observer(AppContainer));
