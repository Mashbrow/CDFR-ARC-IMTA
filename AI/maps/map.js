'use strict';

module.exports = class Map {

    constructor(app){
        this.width = 0;
        this.height = 0;
        this.background = "";
        this.components = [];

        this.app = app;
    }

    init(){
        this.send();
    }

    send(){
        let payload = {
            width: this.width,
            height: this.height,
            background: this.background,
            components: this.components
        }
        this.app.mqttServer.publish({
            topic: "/map",
            payload: JSON.stringify(payload),
            qos: 0, retain: false,
        });
    }

}