import { Bootstrap } from './bootstrap/bootstrap';

const bootstrap = new Bootstrap();

export const INTERNAL_SERVER_ERROR_MESSAGE ='Internal server error.';

export let globalJsonArray: any[] = [];
export function updateGlobalJsonArray(newValue: any[]) {
   globalJsonArray = newValue; 
}

export let sockets: any[] = [];
export function updateSockets(newValue : any[]){
  sockets = newValue;
}

bootstrap.start();
