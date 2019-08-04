import * as React from "react";
import ImagerScreen from "./ImagerScreen/ImagerScreen";
import { $Page, $StackLayout, $Button, $AbsoluteLayout } from "react-nativescript";
import { Page, EventData, Color } from "tns-core-modules/ui/page/page";
import AppBar from "./AppBar/AppBar";
import { observable, autorun, when } from "mobx";
import { device } from "tns-core-modules/platform/platform";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { ActionBar } from "tns-core-modules/ui/action-bar";
export default class MainScreen extends React.Component {
    
    pageRef = React.createRef<Page>();

    private imagerScreenRef = React.createRef<ImagerScreen>();
    private appBarRef = React.createRef<AppBar>();
    
    // ios
    @observable
    private uiNavBar: UINavigationBar;
    @observable
    private uiView: UIView;
    componentDidMount() {
        const actionBar = this.appBarRef.current.actionBarRef.current;
        // const absoluteLayout = this.imagerScreenRef.current.absoluteLayoutRef.current;

        // console.log("actionBar: " + actionBar + " and " + absoluteLayout);
        
        actionBar.addEventListener("onLoaded", (get) => {
            this.uiNavBar = (get.object as ActionBar).ios;
        });
        /*
        absoluteLayout.addEventListener("onLoaded", (get) => {
            this.uiView = (get.object as AbsoluteLayout).ios;
        });
        */
        when(() => this.uiNavBar != null && this.uiView != null, () => {
            if(device.os == "iOS") {
                /*
                console.log("setting: " + this.uiNavBar + " and " + this.uiView);
                this.uiView.frame = CGRectMake(0, 0, 100, 200);
                this.uiView.backgroundColor = UIColor.blueColor;
                */
                
            }
        });

        // (actionBar.ios as UINavigationBar).sendSubviewToBack(absoluteLayout.ios);
    }

    render() {
        return (
            <$Page
                ref={this.pageRef}
            >
                <AppBar ref={this.appBarRef}/>
                <ImagerScreen />
            </$Page>
        )
    }
}

/* does not currently display under ActionBar */