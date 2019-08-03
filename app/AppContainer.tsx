import { Frame, Page, Color, PercentLength } from "tns-core-modules/ui/frame/frame";
import * as React from "react";
import { $Frame, $Page, $StackLayout, $Label, $TextField, $Switch, $Button, $FlexboxLayout, $Slider, $ScrollView, $ActionBar } from "react-nativescript";
import { hot } from 'react-nativescript-hot-loader/root';
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { StackLayout } from "tns-core-modules/ui/layouts/stack-layout/stack-layout";
import { Switch } from "tns-core-modules/ui/switch/switch";
import { Button } from "tns-core-modules/ui/button/button";
import ComponentExample from "./ComponentExample";
// import * as Platform from "tns-core-modules/platform";
// export const rootRef: React.RefObject<Frame> = React.createRef<Frame>(); // ReactNativeScript.start needs a ref
// See the testComponents directory for many examples of components (and ref-forwarding).
//where p is props s is state

// when added -> save -> wait -> restart app it crash with: file:///app/vendor.js:37591:79: JS ERROR Error: Failed to create Page with entry.create() function.
import InputArea from "./InputArea";
import { FlexboxLayout } from "react-nativescript/dist/client/ElementRegistry";

export const rootRef: React.RefObject<any> = React.createRef<any>();

class AppContainer extends React.Component { 
    test = "unchanged";
    pageRef = React.createRef<Page>();
    componentDidMount() {
        console.log("didmount");
        rootRef.current.navigate({
            create:() => {
                return this.pageRef.current;
            }
        });
    }
    render() {
        return (
            <$Frame ref={rootRef}>
                
                <$Page
                    ref={this.pageRef}
                >
                    <$StackLayout>
                        <$Label text={this.test}/>
                        <$Button text={"test"} onTouch={(ev) => {
                            if(ev.action == "down")
                            {
                                this.test = "changed";
                            }
                        }}
                        />
                    </$StackLayout>
                </$Page>
            </$Frame>
        )
    }
}
export default AppContainer;
