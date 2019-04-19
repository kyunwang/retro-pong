import Pong from './Game';
import { initSocket } from './Sockets';

initSocket({ url: 'http://localhost:4000' });

// Is two player or not
const Game = new Pong(false);
Game.init();
