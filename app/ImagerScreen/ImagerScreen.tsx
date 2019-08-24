import * as React from "react";
import { $AbsoluteLayout, $Button, $StackLayout } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { CameraPlus } from "@nstudio/nativescript-camera-plus";
import { Button } from "tns-core-modules/ui/button/button";
import { AbsoluteLayout, Page, View, StackLayout } from "react-nativescript/dist/client/ElementRegistry";
import { device } from "tns-core-modules/platform/platform";
import { PercentLength } from "tns-core-modules/ui/page/page";
import { TouchGestureEventData, PanGestureEventData } from "tns-core-modules/ui/gestures/gestures";
import { Create } from "./Controller";
// https://github.com/PeterStaev/nativescript-photo-editor

/* the conatainer/layer for all the imager ui and gestures*/
export default class ImagerScreen extends React.Component {
    
    // stackLayoutRef = React.createRef<StackLayout>()

    imagerScreenRef = React.createRef<AbsoluteLayout>();

    componentDidMount() {
        const imagerScreen = this.imagerScreenRef.current;
        Create.getController(imagerScreen);
        /*
        const cameraView = new CameraPlus();
        cameraView.width = PercentLength.parse("100%");
        cameraView.height = PercentLength.parse("100%");
        this.absoluteLayoutRef.current.addChild(cameraView);
        */
    }

    render() {
        return (
            <$AbsoluteLayout
                ref={this.imagerScreenRef}
                width={PercentLength.parse("100%")}
                height={PercentLength.parse("100%")}
                onTap={() => {
                    
                    const imagerScreen = this.imagerScreenRef.current;
                    console.log(imagerScreen.getChildrenCount());
                   /*
                    const stack = new StackLayout();
                    stack.backgroundColor = new Color('green');
                    stack.width = 200;
                    stack.height = 200;
                    */
                }}
            >
                    
            </$AbsoluteLayout>
        )
    }
}



/* cmeraview covers all screen <--- fix.
 A button added is placed nexto appbar*/