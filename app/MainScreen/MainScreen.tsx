import * as React from "react";
import { $AbsoluteLayout, $Button, $StackLayout } from "react-nativescript";
import { Color } from "tns-core-modules/color/color";
import { CameraPlus } from "@nstudio/nativescript-camera-plus";
import { AbsoluteLayout } from "tns-core-modules/ui/layouts/absolute-layout/absolute-layout";
import { StackLayout } from "react-nativescript/dist/client/ElementRegistry";
import { device } from "tns-core-modules/platform/platform";

// https://github.com/PeterStaev/nativescript-photo-editor
export default class MainScreen extends React.Component {
    
    // stackLayoutRef = React.createRef<StackLayout>()

    mainScreenRef = React.createRef<AbsoluteLayout>();
    mainScreenStyle = { opacity: 0 }; // backgroundColor: new Color('orange') 
    itemStyle = {padding: 0, margin: 0};
    

    componentDidMount() {
        /*
        const deviceWidth = device.
        const stackLayout = this.stackLayoutRef.current;
        */
        const cameraPlus = new CameraPlus();
        cameraPlus.width = 300;
        cameraPlus.height = 300
        
        
        const mainScreen = this.mainScreenRef.current;
        console.log("mainScreen: " + mainScreen);

        
        mainScreen.insertChild(cameraPlus, 0);
        
        cameraPlus.left = 0;
        cameraPlus.top = 0;
        
    }

    render() {
        return (
            <$AbsoluteLayout ref={this.mainScreenRef}>
                
            </$AbsoluteLayout>
        )
    }
}
/*
<$AbsoluteLayout ref={this.mainScreenRef} style={this.mainScreenStyle}>
                <$Button text={"button"} style={this.itemStyle} />
            </$AbsoluteLayout>
*/