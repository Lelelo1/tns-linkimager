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

export default class AppBar extends React.Component {
    
    actionBarRef = React.createRef<ActionBar>();

    componentDidMount() {
        const actionBar = this.actionBarRef.current;
        console.log("actionBar: " + actionBar);

        // (actionBar.ios as UINavigationBar).
        const view = new FlexboxLayout();
        const label = new Label();
        label.text = "LinkImager";
        view.addChild(label)
        view.style.backgroundColor = new Color('green');
        actionBar.titleView = view;
    }
    /* icons need to be completely white. use unfilled/filled for toggle  */
    render() {
        return (
            <$ActionBar
                ref={this.actionBarRef} title={"LinkImager"}
                color={new Color('#ff000000')}
            >
                <$ImagerActionItem text="visible" />
                <$ImagerActionItem text="control" />
                <$ImagerActionItem text="settings" />
            </$ActionBar>
        )
    }
}
