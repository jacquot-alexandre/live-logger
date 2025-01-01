import { Request, Response } from 'express'; 
import { globalJsonArray } from '../main';
import * as fs from 'fs';
export let json2csvConverter = require('json-2-csv');

const DATA_SAVE_AS_CSV = 'Data received on server saved on disk in CSV format.'

export const getRequestSaveAsCsv = (req: Request, res: any) => {
    let data = JSON.stringify(globalJsonArray);
    let json = JSON.parse(data);
    const csv = json2csvConverter.json2csv(json);
    console.log(DATA_SAVE_AS_CSV);
    fs.writeFileSync('./output/log.csv', csv);
    return res.status(200).json({Message :DATA_SAVE_AS_CSV}); 
};