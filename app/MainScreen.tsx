import * as React from "react";
import ImagerScreen from "./ImagerScreen/ImagerScreen";
import { $Page, $StackLayout, $Button, $AbsoluteLayout, $ActionBar } from "react-nativescript";
import { Page, EventData, Color, PercentLength, ContentView } from "tns-core-modules/ui/page/page";
import AppBar from "./AppBar/AppBar";
import { observable, autorun, when } from "mobx";
import { device } from "tns-core-modules/platform/platform";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { ActionBar } from "tns-core-modules/ui/action-bar";
import { on,resumeEvent } from "tns-core-modules/application/";
import CameraScreen from "./CameraScreen";

export default class MainScreen extends React.Component {
    
    pageRef = React.createRef<Page>();

    private containerRef = React.createRef<AbsoluteLayout>();

    private imagerScreenRef = React.createRef<ImagerScreen>();
    private appBarRef = React.createRef<AppBar>();
    private cameraScreenRef = React.createRef<CameraScreen>();

    componentDidMount() {
        
        /*
        CameraScreen.get().build(this.containerRef.current);
        // fix #8: https://github.com/Lelelo1/tns-linkimager/issues/8
        if(device.os == "iOS") {
            on(resumeEvent, () => {
                console.log("resumed ");
                CameraScreen.get().refresh();
            })
        } 
        */
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
                <$AbsoluteLayout ref={this.containerRef}>
                    <ImagerScreen ref={this.imagerScreenRef} />
                    <AppBar ref={this.appBarRef} />
                </$AbsoluteLayout>
            </$Page>
        )
    }
}

/* does not currently display under ActionBar */