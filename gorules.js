const { ZenEngine } = require('@gorules/zen-engine');
const fs = require('fs/promises');

module.exports = function(RED) {

    function GoRules(config) {
        console.log('GoRules: init()');
        RED.nodes.createNode(this, config);

        var node = this;
       
        // ===============
        // Initialize node
        node.status({ });

        node.engine = new ZenEngine();

        // ===============
        // Handle input node event
        this.on('input', function(msg) {
          node.status({ fill: "blue", shape: "dot", text: "..." });


        });

        // Handle Node-red stop
        this.on('close', function() {
          // tidy up any state
          console.log("GoRules: cleanup()");
        });
    }

    RED.nodes.registerType("GoRules", GoRules);
}
