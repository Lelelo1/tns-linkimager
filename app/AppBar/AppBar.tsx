import { observer } from "mobx-react";
import * as React from "react";
import { $ActionItem, $ActionBar, $StackLayout, $FlexboxLayout, $Button, $NavigationButton } from "react-nativescript";
import $ImagerActionItem from "./ImagerActionItem";
import { ActionItem, IOSActionItemSettings, AndroidActionItemSettings, ActionBar } from "tns-core-modules/ui/action-bar";
import ToggleActionItem from "./ImagerActionItem";
import { observable, observe, autorun, decorate } from "mobx";
import { device } from "tns-core-modules/platform/platform";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import { Color } from "tns-core-modules/color/color";
import { Label } from "tns-core-modules/ui/label/label";
import { rootRef } from "../AppContainer";
import { View, PercentLength } from "tns-core-modules/ui/core/view/view";
import { ContentView, Page } from "tns-core-modules/ui/page/page";

export default class AppBar extends React.Component {
    
    appBarRef = React.createRef<FlexboxLayout>();

    componentDidMount() {
        console.log("appBar did mount");
    }
        

    /* icons need to be completely white. use unfilled/filled for toggle  */
    render() {
        return (
            <$FlexboxLayout ref={this.appBarRef} backgroundColor={new Color('transparent')}>
                <$Button text={"appBar items"}/>
                {/* place custom backarrow, custom title text, custom buttons as actionitems here */}
            </$FlexboxLayout>
        );
    }

    build(height: PercentLength) {
        const appBar = this.appBarRef.current;
        appBar.width = PercentLength.parse("100%");
        appBar.height = height;
    }
}

