import { getBigQueryClient } from "../bigQuery";
import { BLS_ID_PREFIX, BLS_QUERY_IDS } from "../data";

export const getAllQueryResults = async () => {
    const bigQueryClient = getBigQueryClient();
    const dataset = bigQueryClient.dataset('user_tables');
    return await Promise.all(BLS_QUERY_IDS.map(async (queryId) => {
        const table = dataset.table(`${BLS_ID_PREFIX}_${queryId}`);
        return {
            queryId, results: (await table.getRows())[0]
        };
    }))
}