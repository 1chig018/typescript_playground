import Konva from "konva";
import { MenuView } from "./menu_view";
import { App } from "../main";

export class MenuController {
    private view;
    private stage;
    private screenSwitcher: App;

    constructor(screenSwitcher: App, stage: Konva.Stage){
        this.view = new MenuView(stage, this.switchToScreen.bind(this)); 
        //make sure to do the bind(this) otherwise it has an error when switching.
        //could be because of the badly inheritated structure.
        this.stage = stage;
        this.screenSwitcher = screenSwitcher;
    }

    getView(): MenuView {
        return this.view;
    }
    
    switchToScreen(s:String): void {
        this.screenSwitcher.switchScreen(s);
    }
}