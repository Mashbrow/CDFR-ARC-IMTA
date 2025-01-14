

const app = {}

app.startAI = function (){
    //Load map
    map = require('./maps/map_2021').map;
    app.logger.log("Map Loaded")

    //Load goals
    goals = require('./goals/goals').goals;
    app.logger.log("Goals Loaded")

    //Load Robot
    const Robot = require('./robots/robot_2022');
    app.logger.log("Robot Loaded")
    let robot = new Robot(app);

    //Running goals
    for(const goal of goals){
        app.logger.log("Running: "+goal.name)
        for(const action of goal.actions){
            let success = robot.run(action);
            app.logger.log(success?"Done":"Failed");
        }
    }
}

async function main(){

    //Might be a little confusing to pass app in logger while logger is an argument of app
    //Try to make a new class called app ?

    //Create Server
    let Server = require('./server');
    app.server = new Server(app)
    app.server.init();

    //Create Logger
    let Logger = require('./logger');
    app.logger = new Logger(app);

    //Create AI
    let Intelligence = require('./intelligence');
    app.intelligence = new Intelligence(app);
}

main();