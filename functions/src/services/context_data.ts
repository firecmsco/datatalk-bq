import { BigQuery } from "@google-cloud/bigquery";
import { DatasetConfig } from "../types/dataset";
import { Firestore } from "firebase-admin/firestore";
import { getStoredServiceAccount } from "./projects";

export async function getProjectDataContext(firestore: Firestore, projectId: string, datasetId: string): Promise<string> {
    console.log("getting project data context", projectId, datasetId);
    // if (datasetId) {
    return fetchTablesMetadata(firestore, projectId, datasetId).then((res) => generateContextForLLM([res], projectId));
    // }
    // return fetchAllDatasetsAndTablesMetadata(projectId).then(generateContextForLLM);
}

async function fetchTablesMetadata(firestore: Firestore, projectId: string, datasetId: string): Promise<DatasetConfig> {
    const credentials = await getStoredServiceAccount(firestore, projectId);
    const bigquery = new BigQuery({
        projectId,
        credentials
    });

    try {
        // Get a reference to the dataset
        const dataset = bigquery.dataset(datasetId);

        // Get the list of tables in the dataset
        const [tables] = await dataset.getTables();

        // Fetch metadata for each table
        const tablesMetadata = await Promise.all(
            tables.map(async (table) => {
                const [metadata] = await table.getMetadata();
                return {
                    tableId: table.id as string,
                    metadata
                };
            })
        );

        return {
            datasetId,
            tables: tablesMetadata
        };
    } catch (error) {
        console.error("Error fetching table metadata:", error);
        throw error;
    }
}

function generateContextForLLM(datasets: Array<DatasetConfig>, projectId: string): string {
    let context = "BigQuery dataset contains the following datasets, tables and their metadata:\n\n";

    datasets.forEach((dataset) => {

        context += `*** Dataset: ${projectId}.${dataset.datasetId}\n`;
        dataset.tables.forEach((table) => {
            context += `*** Table: ${projectId}.${dataset.datasetId}.${table.tableId}\n`;
            context += `Description: ${table.metadata.description || "No description"}\n`;
            context += "Columns:\n";

            table.metadata.schema.fields.forEach((field: any) => {
                context += ` - ${field.name}: ${field.type} ${field.description
                    ? "- " + field.description
                    : ""}\n`;
            });

            context += "\n";
        });
    });

    return context;
}

