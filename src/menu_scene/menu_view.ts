import Konva from "konva"

export class MenuView {
    private stage: Konva.Stage;
    private group: Konva.Group;

    constructor(stage: Konva.Stage, switchToScreen: (s:String) => void) {
        this.group = new Konva.Group({ visible: false });
        this.stage = stage;

        // create background
        const bg = new Konva.Rect({
            x: 0,
            y: 0,
            width: 800,
            height: 800,
            fill: "yellow",
        });
        this.group.add(bg);

        const switch_button = new Konva.Rect({
            x: 100,
            y: 600,
            fill: "gray",
            width: 100,
            height: 60,
            strokeWidth: 4,
            stroke: "black",
        });
        //add switching to the button
        switch_button.on("click", () => {
            switchToScreen("matching")
        })
        this.group.add(switch_button)

        // Add text block
        const text = new Konva.Text({
            x: 100,
            y: 100,
            text: "Welcome to the Menu",
            fontSize: 30,
            fontFamily: "Arial",
            fill: "black",
            align: "center",
            width: 600, // Center within this width
        });
        this.group.add(text);
    }
    /**
     * Show the screen
     */
    show(): void {
        this.group.visible(true);
        this.group.getLayer()?.draw();
    }

    /**
     * Hide the screen
     */
    hide(): void {
        this.group.visible(false);
        this.group.getLayer()?.draw();
    }

    getGroup(): Konva.Group {
        return this.group;
    }   
}