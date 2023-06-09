const { ZenEngine } = require('@gorules/zen-engine');
const fs = require('fs/promises');
const path = require('path');

module.exports = function(RED) {

    function GoRules(config) {
        console.log('GoRules: init()');
        RED.nodes.createNode(this, config);

        var node = this;
       
        // ===============
        // Initialize node
        node.status({ });

        // properties
        node.ruleFile = config.ruleFile;
       
        // pre-load rule file
        if(node.ruleFile != undefined) {
          (async () => {
            node.content = await fs.readFile(node.ruleFile);
            node.engine = new ZenEngine();
            node.decision = node.engine.createDecision(node.content);
            return node.content;
          })().then(content => {
            node.status({ fill: "green", shape: "dot", text: "(loaded)" });
          });          
        }

        // ===============
        // Handle input node event
        this.on('input', function(msg) {
          node.status({ fill: "blue", shape: "dot", text: "..." });

          // https://gorules.io/docs/rules-engine/engines/nodejs

          if(msg.input != undefined) {
            (async () => {
              // const decision = await node.engine.createDecision(node.content);
              const result = await node.decision.evaluate(msg.input);
              console.log(result)
              return result;
  
            })().then(result => {
              msg.output = result;
              node.send(msg);
  
              node.status({ });
            });
          }
          
        });

        // Handle Node-red stop
        this.on('close', function() {
          // tidy up any state
          console.log("GoRules: cleanup()");
        });
    }

    RED.nodes.registerType("GoRules", GoRules);
}
