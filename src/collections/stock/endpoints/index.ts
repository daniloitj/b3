import { Endpoint } from 'payload/config';
import { getMaxDailyVolumeController } from "../controllers/getMaxDailyVolumeController";
import { getMaxRangeValueController } from "../controllers/getMaxRangeValueController";

const stockEndpoints: Endpoint[] = [
    {
        method: 'get',
        path: '/:stock/max-range-value',
        handler: getMaxRangeValueController,
    },
    {
        method: 'get',
        path: '/:stock/max-daily-volume',  
        handler: getMaxDailyVolumeController,
    },
];

export default stockEndpoints;
