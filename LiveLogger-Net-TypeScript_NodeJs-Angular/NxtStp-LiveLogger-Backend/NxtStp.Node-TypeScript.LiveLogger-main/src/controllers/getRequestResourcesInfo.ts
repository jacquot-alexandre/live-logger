import { Request, Response } from 'express'; 
import osu from 'node-os-utils'

interface ResourcesInfo { [key: string]: any
}

async function getResourcesInfo(): Promise<ResourcesInfo> {
  const totalMem = 'totalMemMb';
  const usedMem = 'usedMemMb';
  const freeMem = 'freeMemMb';
  const freeMemPercent = 'freeMemPercentage';
  const resourcesInfo: ResourcesInfo = {};
  const cpu = osu.cpu;

  const cpuPercentage = await cpu.usage();
  resourcesInfo['cpu model'] = cpu.model();
  resourcesInfo['cpu count'] = cpu.count();
  resourcesInfo['cpu usage %'] = cpuPercentage;

  const mem = osu.mem;
  const memInfo = await mem.info();
  resourcesInfo[totalMem] = memInfo[totalMem];
  resourcesInfo[usedMem] = memInfo[usedMem];
  resourcesInfo[freeMem] = memInfo[freeMem];
  resourcesInfo[freeMemPercent] = memInfo[freeMemPercent];

  return resourcesInfo;
}

export const getRequestResourcesInfo = async (req: Request, res: any) => {
    let info = await getResourcesInfo();
    return res.status(200).json({Message : info});
};
