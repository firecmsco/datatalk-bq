import React, { useEffect, useRef, useState } from "react";
import equal from "react-fast-compare"

import { makeSQLQuery } from "../../api";
import { useDataki } from "../../DatakiProvider";
import { DataRow, DateParams, DryWidgetConfig, WidgetConfig } from "../../types";
import { DataTable } from "./DataTable";
import { ErrorBoundary, useModeController } from "@firecms/core";
import { format } from "sql-formatter";
import {
    AddIcon,
    Button,
    CircularProgress,
    cls,
    DownloadIcon,
    IconButton,
    RefreshIcon,
    RemoveIcon,
    SettingsIcon,
    Tooltip,
    Typography
} from "@firecms/ui";
import { ConfigViewDialog } from "./ConfigViewDialog";
import { AddToDashboardDialog } from "../dashboards/AddToDashboardDialog";
import { toPng } from "html-to-image";
import { downloadImage } from "../../utils/downloadImage";
import { ExecutionErrorView } from "./ExecutionErrorView";
import { getConfigWithoutSize } from "../utils/widget";

export function DryTableConfigView({
                                       dryConfig,
                                       params,
                                       onUpdated,
                                       onRemoveClick,
                                       zoom,
                                       maxWidth,
                                       selected,
                                       largeAddToDashboardButton,
                                       actions,
                                       className
                                   }: {
    dryConfig: DryWidgetConfig,
    params?: DateParams,
    onUpdated?: (newConfig: DryWidgetConfig) => void,
    onRemoveClick?: () => void,
    maxWidth?: number,
    zoom?: number,
    selected?: boolean,
    largeAddToDashboardButton?: boolean,
    actions?: React.ReactNode,
    className?: string
}) {

    const {
        apiEndpoint,
        getAuthToken
    } = useDataki();

    const { mode } = useModeController();

    const [configDialogOpen, setConfigDialogOpen] = React.useState(false);
    const [addToDashboardDialogOpen, setAddToDashboardDialogOpen] = React.useState(false);

    const config = dryConfig as WidgetConfig;
    const [data, setData] = useState<DataRow[]>([]);
    const [dataLoading, setDataLoading] = useState<boolean>(false);
    const [dataLoadingError, setDataloadingError] = useState<Error | null>(null);

    const viewRef = React.useRef<HTMLDivElement>(null);

    const loadedConfig = React.useRef<{ dryConfig: DryWidgetConfig, params?: DateParams } | null>(null);
    const limit = 100;

    const desiredOffset = useRef<number>(0);
    const currentOffset = useRef<number>(0);

    useEffect(() => {
        if (loadedConfig.current && equal(loadedConfig.current, {
            dryConfig: getConfigWithoutSize(dryConfig),
            params
        })) {
            return;
        }

        if (dryConfig) {
            try {
                setData([]);
                loadedConfig.current = {
                    dryConfig: getConfigWithoutSize(dryConfig),
                    params
                };
                const formattedDrySQL = format(dryConfig.sql, { language: "bigquery" })
                onUpdated?.({
                    ...dryConfig,
                    sql: formattedDrySQL
                });
                resetPagination();
                makeHydrationRequest(dryConfig, 0);
            } catch (e) {
                console.error(dryConfig);
                console.error("Error parsing dry config", e);
            }
        }
    }, [dryConfig, params]);

    const ongoingRequest = useRef(false);

    const makeHydrationRequest = async (newDryConfig: DryWidgetConfig, offset: number) => {
        if (ongoingRequest.current) {
            return;
        }
        const firebaseToken = await getAuthToken();
        if (!newDryConfig) {
            throw Error("makeHydrationRequest: No code provided");
        }
        ongoingRequest.current = true;
        setDataLoading(true);
        setDataloadingError(null);
        console.log("Fetching SQL data", offset, newDryConfig);
        makeSQLQuery({
            firebaseAccessToken: firebaseToken,
            projectId: newDryConfig.projectId,
            apiEndpoint,
            sql: newDryConfig.sql,
            params,
            limit,
            offset
        })
            .then((data) => {
                currentOffset.current = offset;
                ongoingRequest.current = false;
                setData((existingData) => [...existingData, ...data]);
            })
            .catch(setDataloadingError)
            .finally(() => setDataLoading(false));
    };

    const downloadFile = () => {
        // TODO: download as CSV
        toPng(viewRef.current as HTMLElement, {
            backgroundColor: mode === "dark" ? "#18181c" : "#fff",
            width: viewRef.current?.scrollWidth,
            height: viewRef.current?.scrollHeight
        }).then((url) => downloadImage(url, "chart.png"));
    }

    function resetPagination() {
        desiredOffset.current = 0;
        currentOffset.current = 0;
    }

    const onConfigUpdated = (newConfig: DryWidgetConfig) => {
        if (!newConfig) return;
        resetPagination();
        makeHydrationRequest(newConfig, 0);
        onUpdated?.(newConfig)
    };

    return <>

        <div
            className={cls("group flex flex-col w-full h-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 dark:border-opacity-80 rounded-lg overflow-hidden",
                selected ? "ring-offset-transparent ring-2 ring-primary ring-opacity-75 ring-offset-2" : "",
                className)}>

            <div
                className={"min-h-[54px] flex flex-row w-full border-b border-gray-100 dark:border-gray-800 dark:border-opacity-80"}>
                <Typography variant={"label"}
                            className={"grow px-3 py-4 line-clamp-1 h-10"}>{config?.title ?? dryConfig.title}</Typography>

                {dataLoading && <div className={"m-3"}><CircularProgress size={"small"}/></div>}

                <div className={"m-2.5 flex-row gap-1 hidden group-hover:flex"}>
                    <Tooltip title={"Download"}>
                        <IconButton size={"small"} onClick={downloadFile}>
                            <DownloadIcon size={"small"}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Refresh data"}>
                        <IconButton size={"small"} onClick={() => {
                            resetPagination();
                            setData([]);
                            makeHydrationRequest(dryConfig, 0);
                        }}>
                            <RefreshIcon size={"small"}/>
                        </IconButton>
                    </Tooltip>
                    {onRemoveClick && <Tooltip title={"Remove this view"}>
                        <IconButton size={"small"} onClick={onRemoveClick}>
                            <RemoveIcon size={"small"}/>
                        </IconButton>
                    </Tooltip>}

                    {onUpdated && <Tooltip title={"Edit widget configuration"}>
                        <IconButton size={"small"} onClick={() => setConfigDialogOpen(true)}>
                            <SettingsIcon size={"small"}/>
                        </IconButton>
                    </Tooltip>}

                    <Tooltip title={"Add this view to a dashboard"}>
                        {largeAddToDashboardButton
                            ? <Button variant={"outlined"}
                                      size={"small"}
                                      onClick={() => setAddToDashboardDialogOpen(true)}>
                                Add to dashboard
                            </Button>
                            : <IconButton size={"small"}
                                          onClick={() => setAddToDashboardDialogOpen(true)}>
                                <AddIcon size={"small"}/>
                            </IconButton>}
                    </Tooltip>

                    {actions}

                </div>
            </div>

            {data && !dataLoadingError && <>
                {config?.table && (
                    <DataTable
                        ref={viewRef}
                        data={data}
                        columns={config.table.columns}
                        zoom={zoom}
                        maxWidth={maxWidth}
                        loading={dataLoading}
                        onEndReached={() => {
                            console.log("End reached", currentOffset.current, desiredOffset.current);
                            if (currentOffset.current === desiredOffset.current) {
                                desiredOffset.current = currentOffset.current + limit;
                                makeHydrationRequest(dryConfig, desiredOffset.current);
                            }
                        }}/>
                )}
            </>}

            {!dataLoading && dataLoadingError && (
                <ExecutionErrorView executionError={dataLoadingError}/>
            )}

            <ErrorBoundary>
                {dryConfig && <ConfigViewDialog open={configDialogOpen}
                                                setOpen={setConfigDialogOpen}
                                                dryConfig={dryConfig}
                                                onUpdate={onConfigUpdated}
                />}
            </ErrorBoundary>
        </div>


        {largeAddToDashboardButton && config && <AddToDashboardDialog open={addToDashboardDialogOpen}
                                                                      setOpen={setAddToDashboardDialogOpen}
                                                                      widget={dryConfig}/>}
    </>;
}
