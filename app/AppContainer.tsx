import { Frame, Page, Color, PercentLength } from "tns-core-modules/ui/frame/frame";
import * as React from "react";
import { $Frame, $Page} from "react-nativescript";
import { observer } from "mobx-react";
import { decorate, observable } from "mobx";

import $AppBar from "./AppBar/AppBar";
import $MainScreen from "./MainScreen/MainScreen";
export const rootRef: React.RefObject<any> = React.createRef<any>();

class AppContainer extends React.Component { 
    @observable
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
                    actionBarHidden={false}
                >
                    <$AppBar />
                    <$MainScreen />
                </$Page>
            </$Frame>
        )
    }
}

export default (observer(AppContainer));
