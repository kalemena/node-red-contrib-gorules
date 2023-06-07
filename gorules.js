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

        // properties
        node.decisionJsonFile = config.decisionJsonFile;
       
        node.engine = new ZenEngine();

        // ===============
        // Handle input node event
        this.on('input', function(msg) {
          node.status({ fill: "blue", shape: "dot", text: "..." });

          (async () => {
            // Example filesystem content, it is up to you how you obtain content
            // e.g. '/opt/node-red-contrib-gorules/examples/rules/shipping-fees.json'

            const content = await fs.readFile(node.decisionJsonFile);
            // const engine = new ZenEngine();
            const decision = await node.engine.createDecision(content);

            const result = await decision.evaluate(msg.payload);
            console.log(result)
            return result;

          })().then(result => {

            msg.result = result;
            node.send(msg);

            node.status({ });
          });

        });

        // Handle Node-red stop
        this.on('close', function() {
          // tidy up any state
          console.log("GoRules: cleanup()");
        });
    }

    RED.nodes.registerType("GoRules", GoRules);
}
