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
        // 'file', 'parameter', 'loader'
        node.loadStrategy = config.loadStrategy 
        node.decisionJsonFile = config.decisionJsonFile;
       
        // instantiate
        
        switch(node.loadStrategy) {
          case 'loader':
            break;
          case 'parameter':
            break;
          default:
          case 'file':
            (async () => {
              const content = await fs.readFile(node.decisionJsonFile);
              return content;
            })().then(content => {
              node.content = content;
              node.engine = new ZenEngine();
            });
            break;
        }

        // ===============
        // Handle input node event
        this.on('input', function(msg) {
          node.status({ fill: "blue", shape: "dot", text: "..." });

          switch(node.loadStrategy) {
            case 'loader':
              break;
            case 'parameter':
              break;
            default:
            case 'file':
              (async () => {
                const decision = await node.engine.createDecision(node.content);
    
                const result = await decision.evaluate(msg.payload);
                console.log(result)
                return result;
    
              })().then(result => {
    
                msg.result = result;
                node.send(msg);
    
                node.status({ });
              });
              break;
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
