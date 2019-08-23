import * as React from "react";
import ImagerScreen from "./ImagerScreen/ImagerScreen";
import { $Page, $StackLayout, $Button, $AbsoluteLayout, $ActionBar } from "react-nativescript";
import { Page, EventData, Color, PercentLength } from "tns-core-modules/ui/page/page";
import AppBar from "./AppBar/AppBar";
import { observable, autorun, when } from "mobx";
import { device } from "tns-core-modules/platform/platform";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { ActionBar } from "tns-core-modules/ui/action-bar";
export default class MainScreen extends React.Component {
    
    pageRef = React.createRef<Page>();

    private imagerScreenRef = React.createRef<ImagerScreen>();
    private appBarRef = React.createRef<AppBar>();
    

    componentDidMount() {

    }

    render() {

        return (
            <$Page
                ref={this.pageRef}
            >
                <$ActionBar onLoaded={(ev) => {
                    const actionBar = ev.object as ActionBar;
                    this.appBarRef.current.build(actionBar.height);
                    this.pageRef.current.actionBarHidden = true;
                }}/>
                <$AbsoluteLayout>
                    <ImagerScreen ref={this.imagerScreenRef} />
                    <AppBar ref={this.appBarRef}/>
                </$AbsoluteLayout>
            </$Page>
        )
    }
}

/* does not currently display under ActionBar */