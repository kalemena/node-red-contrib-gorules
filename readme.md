# node-red-contrib-gorules

Node-Red block to integrate GoRules as a Rules Engine.

GoRules allows to create rules in the form of Decision Tables.

Details for GoRules available at [https://gorules.io/](https://gorules.io/)

[Here are Example & Editor](https://editor.gorules.io/?template=shipping-fees) which can be downloaded into this project.

Implementation of this Block is done following [NodeJS guide](https://gorules.io/docs/rules-engine/engines/nodejs)


# Test

Using docker:

```bash
$ docker-compose up -d
```

Then browse to *http://localhost:2880* to see the example described in section below.

# Example

## Screenshot

![Examples defaults](/examples/examples-default.png)

See [GoRules official example for details](https://gorules.io/docs/tutorials/fintech-company-analysis)

## Flow

```json
[
    {
        "id": "e468bcf7a6ec520d",
        "type": "tab",
        "label": "Flow 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "ba2f6c37e78b9ee2",
        "type": "GoRules",
        "z": "e468bcf7a6ec520d",
        "name": "shipping-fees.json",
        "ruleFile": "/opt/node-red-contrib-gorules/examples/rules/shipping-fees.json",
        "x": 590,
        "y": 280,
        "wires": [
            [
                "2aa8a283ecbad3f0"
            ]
        ]
    },
    {
        "id": "f3b2d7b3ddd8e492",
        "type": "inject",
        "z": "e468bcf7a6ec520d",
        "name": "customer.country=FR",
        "props": [
            {
                "p": "input",
                "v": "{\"customer\":{\"country\":\"FR\"}}",
                "vt": "json"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 240,
        "y": 240,
        "wires": [
            [
                "ba2f6c37e78b9ee2"
            ]
        ]
    },
    {
        "id": "2aa8a283ecbad3f0",
        "type": "debug",
        "z": "e468bcf7a6ec520d",
        "name": "debug 1",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 820,
        "y": 280,
        "wires": []
    },
    {
        "id": "5c7b71a0573f6344",
        "type": "inject",
        "z": "e468bcf7a6ec520d",
        "name": "customer.country=US",
        "props": [
            {
                "p": "input",
                "v": "{\"customer\":{\"country\":\"US\"}}",
                "vt": "json"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 240,
        "y": 280,
        "wires": [
            [
                "ba2f6c37e78b9ee2"
            ]
        ]
    },
    {
        "id": "31b958e98e52ca5c",
        "type": "inject",
        "z": "e468bcf7a6ec520d",
        "name": "customer.country=US > 1000",
        "props": [
            {
                "p": "input",
                "v": "{\"customer\":{\"country\":\"US\"},\"cart\":{\"total\":1200}}",
                "vt": "json"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 260,
        "y": 320,
        "wires": [
            [
                "ba2f6c37e78b9ee2"
            ]
        ]
    },
    {
        "id": "5d84bd8d00af3c26",
        "type": "inject",
        "z": "e468bcf7a6ec520d",
        "name": "customer.country=US > 1000 & gold",
        "props": [
            {
                "p": "input",
                "v": "{\"customer\":{\"country\":\"US\",\"tier\":\"gold\"},\"cart\":{\"total\":1200}}",
                "vt": "json"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 280,
        "y": 360,
        "wires": [
            [
                "ba2f6c37e78b9ee2"
            ]
        ]
    },
    {
        "id": "59d6999fb132ff89",
        "type": "GoRules",
        "z": "e468bcf7a6ec520d",
        "name": "credit-analysis.json",
        "ruleFile": "/opt/node-red-contrib-gorules/examples/rules/credit-analysis.json",
        "x": 590,
        "y": 440,
        "wires": [
            [
                "b167c27368392433"
            ]
        ]
    },
    {
        "id": "b167c27368392433",
        "type": "debug",
        "z": "e468bcf7a6ec520d",
        "name": "debug 2",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 820,
        "y": 440,
        "wires": []
    },
    {
        "id": "7e2745865a9b49f8",
        "type": "inject",
        "z": "e468bcf7a6ec520d",
        "name": "Example",
        "props": [
            {
                "p": "input",
                "v": "{\"company\":{\"turnover\":1000000,\"type\":\"INC\",\"country\":\"US\"}}",
                "vt": "json"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 200,
        "y": 440,
        "wires": [
            [
                "59d6999fb132ff89"
            ]
        ]
    }
]
```

