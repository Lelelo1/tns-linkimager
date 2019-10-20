import { observer } from "mobx-react";
import * as React from "react";
import { $ActionItem, $ActionBar, $StackLayout, $FlexboxLayout, $Button, $NavigationButton, $FormattedString, $Span, $Image, $Placeholder } from "react-nativescript";
import $ImagerActionItem from "./ImagerActionItem";
import { ActionItem, IOSActionItemSettings, AndroidActionItemSettings, ActionBar, NavigationButton } from "tns-core-modules/ui/action-bar";
import ToggleActionItem from "./ImagerActionItem";
import { observable, observe, autorun, decorate } from "mobx";
import { device } from "tns-core-modules/platform/platform";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout";
import { Color } from "tns-core-modules/color/color";
import { Label } from "tns-core-modules/ui/label/label";
import { rootRef } from "../AppContainer";
import { View, PercentLength } from "tns-core-modules/ui/core/view/view";
import { ContentView, Page } from "tns-core-modules/ui/page/page";
import ViewModel from "~/ViewModel";
import { LinkImage } from "~/Mixins/Mixins";
import { Placeholder } from "tns-core-modules/ui/placeholder/placeholder";
import { fromUrl, ImageSource } from "tns-core-modules/image-source/image-source";
import { PhotoEditor } from "@proplugins/nativescript-photo-editor";

@observer
export default class AppBar extends React.Component {
    
    appBarRef = React.createRef<FlexboxLayout>();
    private placeholderRef = React.createRef<Placeholder>();
    componentDidMount() {
        console.log("appBar did mount");

        autorun(() => {
            const trigger = ViewModel.get().update;
            this.setState({});
        })
    }
        

    /* icons need to be completely white. use unfilled/filled for toggle  */
    render() {
        return (
            <$FlexboxLayout
                ref={this.appBarRef}
                backgroundColor={new Color('transparent')}
                flexDirection={"row-reverse"}
                justifyContent={"space-between"}
            >
                <$Button text={"other appBar items"} margin={5} onTap={() => {
                    this.__testPhotoEditor__();
                }}/>
                {this._renderBackArrow()}
                {/* place custom backarrow, custom title text, custom buttons as actionitems here */}
            </$FlexboxLayout>
        );
    }

    _renderBackArrow() {
        
        const viewModel = ViewModel.get();
        return viewModel.currentLinkImageDisplayed.owners.length > 0 ? (
            <$Image
                src={"https://media-cdn.tripadvisor.com/media/photo-s/0e/38/76/58/korridor.jpg"}
                width={55}
                height={55}
                stretch={"aspectFill"}
                margin={5}
                onTap={() => {
                    this._navigateBack();
                }}
            />
        )
        :
        null
        
    }

    _navigateBack() {
        console.log("navigateBack");
        const viewModel = ViewModel.get();
        viewModel.clearAreas();
        let from = viewModel.currentLinkImageDisplayed;
        viewModel.currentLinkImageDisplayed = new LinkImage(from.owners[0]);
        viewModel.update = !viewModel.update;
        from = null;
    }

    build(height: PercentLength) {
        const appBar = this.appBarRef.current;
        appBar.width = PercentLength.parse("100%");
        appBar.height = height;
    }
    __testPhotoEditor__() {
        const viewModel = ViewModel.get();
        const photoEditor = new PhotoEditor();
        fromUrl(viewModel.currentLinkImageDisplayed.url).then((imageSource) => {
            console.log("url imagesource: " + JSON.stringify(imageSource));
            photoEditor.editPhoto({ imageSource }).then((edited: ImageSource) => {
                viewModel.currentLinkImageDisplayed.imageSource = edited;
                
                // to trigget a mobx -> react update 
                viewModel.update = !viewModel.update;
            });
        })
    }
}

