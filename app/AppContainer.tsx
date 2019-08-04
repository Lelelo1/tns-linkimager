import { Frame, Page, Color, PercentLength } from "tns-core-modules/ui/frame/frame";
import * as React from "react";
import { $Frame, $Page, $AbsoluteLayout} from "react-nativescript";
import { observer } from "mobx-react";
import { decorate, observable } from "mobx";

import $AppBar from "./AppBar/AppBar";
import $MainScreen from "./MainScreen/MainScreen";
import { device } from "tns-core-modules/platform/platform";
export const rootRef: React.RefObject<any> = React.createRef<any>();

class AppContainer extends React.Component { 
    
    // frameRef = React.createRef<Frame>();

    pageRef = React.createRef<Page>();

    
    componentDidMount() {
        console.log("didmount");
        rootRef.current.navigate({
            create:() => {
                return this.pageRef.current;
            }
        });
        /*
        if(device.os == "iOS") { // to set actionBar transparent: actionBar.ios is undefined
            // https://github.com/3rror404/ns-fading-actionbar/blob/master/app/second-page.js
            var controller = this.frameRef.current.ios.controller as UINavigationController;
            var navBar = controller.navigationBar;
            navBar.backgroundColor = UIColor.colorWithRedGreenBlueAlpha(0.20, 0.20, 0.20, 0.0);
        }
        */
    }
    render() {
        return (
            <$Frame>
                
                <$Page
                    ref={this.pageRef}
                    actionBarHidden={false}
                    backgroundSpanUnderStatusBar={true}
                    iosOverflowSafeAreaEnabled={true}
                    iosOverflowSafeArea={true}
                    
                >
                    {/* iosOverflowSafeArea for Android how? */}
                    <$AbsoluteLayout>
                        <$MainScreen />
                        <$AppBar />
                    </$AbsoluteLayout>
                </$Page>
            </$Frame>
        )
    }
}

export default (observer(AppContainer));
