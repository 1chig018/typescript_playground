import Konva from "konva"

export class MatchView {
    private group: Konva.Group;
    private stage: Konva.Stage;
    constructor(stage: Konva.Stage, 
    arrowAnimation: (stage: Konva.Stage, q: Konva.Circle, a_1: Konva.Circle, a_2: Konva.Circle,
    a_3: Konva.Circle) => void,
    switchToScreen: (s:String) => void
    ){
        
      this.group = new Konva.Group({ visible: false });
      this.stage = stage;

      // create background
      const bg = new Konva.Rect({
        x: 0,
        y: 0,
        width: 800,
        height: 800,
        fill: "#87CEEB", // Sky blue
      });
      this.group.add(bg);

      // Create a circle shape for answer
      const a_1 = new Konva.Circle({
        x: 700,
        y: 400,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
      });
      this.group.add(a_1);

      // Create a circle shape for answer
      const a_2 = new Konva.Circle({
        x: 700,
        y: 650,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
      });
      this.group.add(a_2);

      // Create a circle shape for answer
      const a_3 = new Konva.Circle({
        x: 700,
        y: 150,
        radius: 70,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
      });
      this.group.add(a_3);

      // Create a circle shape for question
      const q_1 = new Konva.Circle({
        x: 100,
        y: 400,
        radius: 70,
        fill: 'yellow',
        stroke: 'black',
        strokeWidth: 4,
      });

      // add animation for q_1
      q_1.on('mousedown touchstart', () => {
        arrowAnimation(this.stage, q_1, a_1, a_2, a_3); // Call arrowAnimation when event occurs
      });
      this.group.add(q_1);

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
          switchToScreen("menu")
      })
      this.group.add(switch_button)

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