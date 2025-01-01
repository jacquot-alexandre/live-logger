import express, { Request, Response, Application, NextFunction} from 'express';
import cors, { CorsOptions } from 'cors';
import bodyParser, { OptionsJson, OptionsUrlencoded } from 'body-parser'; 
import path from 'path';
import getRequestClearRoute from '../routes/getRequestClear';
import getRequestSaveRoute from '../routes/getRequestSave';
import getRequestSaveAsCsvRoute from '../routes/getRequestSaveAsCsv';
import getRequestImportStackRoute from '../routes/getRequestImportStack';
import getRequestResourcesInfo from '../routes/getRequestResourcesInfo';
import postRequestLog from '../routes/postRequestLog';
import postRequestSaveStackAsJson from '../routes/postRequestSaveStackAsJson';
import postRequestSaveStageAsCsv from '../routes/postRequestSaveStageAsCsv';
import postRequestSaveStageAsJson from '../routes/postRequestSaveStageAsJson';
import postRequestLogText from '../routes/postRequestLogText';
import { Server } from 'ws';
import { WebSocketService } from '../services/websocketService';

export class Bootstrap {
    private readonly port : number = 3000;

    public app: Application

    public websocketService : WebSocketService

    constructor() {
        this.app = express();
        this.configureMiddleware();
        this.websocketService = new WebSocketService();   
    }

    public start(){
        this.app.use((req: Request, res: any) => {
            res.sendFile(path.join(__dirname, '..', 'static', 'index.html'));
          });
        this.app.listen(this.port, () => {
            console.log('Server is listening on port 3000');
          });
    }

    private configureMiddleware() : void {
        this.ConfigureCorsOptions();
        this.configureJsonOptions();
        this.configureStaticPageServer();
        this.configreREstAPI()
    }

    private configureJsonOptions() {
        const jsonOptions: OptionsJson = { limit: '500mb' }; const urlencodedOptions: OptionsUrlencoded = { extended: true };
        this.app.use(bodyParser.json(jsonOptions));
        this.app.use(bodyParser.urlencoded(urlencodedOptions));
        this.app.use(express.json());
    }

    private ConfigureCorsOptions() {
        const corsOptions: CorsOptions = {
            origin: '*', // Allow all origins
            methods: ['GET', 'POST'], // Allow specific HTTP methods
        };
        this.app.use(cors(corsOptions));
    }

    private configureStaticPageServer() {
        this.app.use(express.static('public'));
    }

    private configreREstAPI() {
        this.app.use('/', getRequestClearRoute);
        this.app.use('/', getRequestSaveRoute);
        this.app.use('/', getRequestSaveAsCsvRoute);
        this.app.use('/', getRequestImportStackRoute);
        this.app.use('/', getRequestResourcesInfo);
        this.app.use('/', postRequestLog);
        this.app.use('/', postRequestSaveStackAsJson);
        this.app.use('/', postRequestSaveStageAsCsv);
        this.app.use('/', postRequestSaveStageAsJson);
        this.app.use('/', postRequestLogText);
    }
}