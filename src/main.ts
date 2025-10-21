// import { MatchView } from "./matching_scene/matching_scene_view";
import Konva from "konva";
import { MatchController } from "./matching_scene/matching_scene_controller";
import { MenuController } from "./menu_scene/menu_controller";

export class App {
    private matchingController: MatchController;
    private menuController: MenuController;
    private stage: Konva.Stage;
    private layer: Konva.Layer;
    constructor(){
        this.stage = new Konva.Stage({
			container: "container",
			width: 800,
			height: 800,
		});

        this.matchingController = new MatchController(this, this.stage);
        this.menuController = new MenuController(this, this.stage);

        this.layer = new Konva.Layer();
		this.stage.add(this.layer);
        this.layer.add(this.matchingController.getView().getGroup());
        this.layer.add(this.menuController.getView().getGroup());
        this.layer.draw();

        this.menuController.getView().show();
        
    }

    switchScreen(s:String): void {
        this.menuController.getView().hide();
        this.matchingController.getView().hide();
        
        if(s == "menu") {
            this.menuController.getView().show();
        }
        else if(s == "matching") {
            this.matchingController.getView().show();
        }	
    }
}

console.log("start")
const app = new App();
console.log("end")