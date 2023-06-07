FROM kalemena/node-red:latest

COPY --chown=nodered:nodered [ "package*.json", "gorules.*", "LICENSE", "/opt/node-red-contrib-gorules/" ]
COPY --chown=nodered:nodered [ "examples", "/opt/node-red-contrib-gorules/examples/" ]
RUN cd /opt/node-red-contrib-gorules \
  && npm install \
  && cd /opt/node-red \
  && npm i \
        /opt/node-red-contrib-gorules