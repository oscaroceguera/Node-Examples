'use stric';

import http from 'http';
import mongoose from 'mongoose';
import conf from './config'
import router from './lib/router';

const server   = http.createServer();
const port     = process.env.PORT || conf.port;
const database = process.env.MONGO_URL || conf.database;

mongoose.connect(database, onDBConnect);

server.on('request', router);
server.on('listening', onListening);

function onDBConnect(err, res){
  if(err) console.log(`ERROR : on connectiong to database ${err}`);
  else{
    console.log(`Connection established to Database`);
    server.listen(port);
  }
}

function onListening(){
  console.log(`Server listeninig on http://localhost:${port}`);
}
