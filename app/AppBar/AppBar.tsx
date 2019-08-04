import { observer } from "mobx-react";
import * as React from "react";
import { $ActionItem, $ActionBar, $StackLayout } from "react-nativescript";
import $ImagerActionItem from "./ImagerActionItem";
import { ActionItem, IOSActionItemSettings, AndroidActionItemSettings, ActionBar } from "tns-core-modules/ui/action-bar";
import ToggleActionItem from "./ImagerActionItem";
import { observable, observe, autorun, decorate } from "mobx";
import { device } from "tns-core-modules/platform/platform";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import { Color } from "tns-core-modules/color/color";
import { Label } from "tns-core-modules/ui/label/label";
import { rootRef } from "../AppContainer";
import { View } from "tns-core-modules/ui/core/view/view";
import { ContentView, Page } from "tns-core-modules/ui/page/page";

export default class AppBar extends React.Component {
    
    state = {
        n: 0
    }

    actionBarRef = React.createRef<ActionBar>();

    componentDidMount() {

    }
        
    color = new Color('green');
    /* icons need to be completely white. use unfilled/filled for toggle  */
    render() {
        return (
            <$ActionBar
                ref={this.actionBarRef}
                title={"LinkImager"}
                onLoaded={(get) => {
                    
                    setTimeout(() => {
                        this.setTransparent(get.object as ActionBar);
                    }, 0.00000001); // bug https://github.com/NativeScript/NativeScript/issues/7640 
                    
                   /*
                   this.setTransparent(get.object as ActionBar);
                   this.setState({n: 1}, () => {
                       console.log("n iiiiz: " + this.state.n);
                   });
                   */
                }}
            >
            <$ImagerActionItem text="visible" />
            <$ImagerActionItem text="control" />
            <$ImagerActionItem text="settings" />
        </$ActionBar>
        );
    }
    setTransparent = (actionBar: ActionBar) => {
        console.log("actionbaaaar ios: " + actionBar.ios);
        if(device.os == "iOS") {
            // https://stackoverflow.com/questions/49352415/transparent-actionbar-using-nativescript-in-combination-with-angular
            var navBar = this.actionBarRef.current.ios as UINavigationBar;
            navBar.translucent = true;
            navBar.setBackgroundImageForBarMetrics(UIImage.new(), UIBarMetrics.Default);
            navBar.shadowImage = UIImage.new();
            navBar.backgroundColor = UIColor.clearColor;
        }
    }
}

