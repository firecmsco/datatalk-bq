import { DryWidgetConfig } from "../../types";
import React, { useMemo } from "react";
import { Button, Dialog, DialogActions, DialogContent, TextField, Typography } from "@firecms/ui";
import { AutoHeightEditor } from "../AutoHeightEditor";
import { useSnackbarController } from "@firecms/core";

export function ConfigViewDialog({
                                     dryConfig: dryConfigProp,
                                     open,
                                     setOpen,
                                     onUpdate: onUpdateProp
                                 }: {
    dryConfig: DryWidgetConfig
    open: boolean,
    setOpen: (open: boolean) => void,
    onUpdate?: (newConfig: DryWidgetConfig) => void
}) {

    const snackbar = useSnackbarController();

    const [title, setTitle] = React.useState<string>(dryConfigProp.title);
    const [sqlCode, setSqlCode] = React.useState<string>(dryConfigProp.sql);
    const initialChartConfig: string = useMemo(() => {
        if (dryConfigProp.type === "chart")
            return JSON.stringify(dryConfigProp.chart, null, 2);
        else if (dryConfigProp.type === "table")
            return JSON.stringify(dryConfigProp.table, null, 2);
        else
            throw new Error("Unknown widget type");
    }, []);
    const [chartOrTableConfig, setChartOrTableConfig] = React.useState(initialChartConfig);

    const updateChartConfig = (value: string) => {
        setChartOrTableConfig(value);
    }

    const onUpdate = () => {
        try {

            let dryConfig = {
                ...dryConfigProp,
                title,
                sql: sqlCode,
            };

            if (dryConfig.type === "chart") {
                dryConfig = {
                    ...dryConfig,
                    chart: JSON.parse(chartOrTableConfig)
                }
            } else if (dryConfig.type === "table") {
                dryConfig = {
                    ...dryConfig,
                    table: JSON.parse(chartOrTableConfig)
                }
            }

            console.log("Updating config", dryConfig);
            onUpdateProp?.(dryConfig)
            setOpen(false);
        } catch (e) {
            snackbar.open({
                type: "error",
                message: "Error updating config"
            });
            console.error("Error updating config", e);
        }
    };

    const onTitleChange = (event: React.ChangeEvent<any>) => {
        setTitle(event.target.value);
    }

    return <Dialog
        maxWidth={"6xl"}
        open={open}
        onOpenChange={setOpen}
    >
        <DialogContent className="p-8 flex flex-col space-y-4">
            <TextField invisible
                       value={title}
                       onChange={onTitleChange}
                       className={"text-lg font-semibold"}
                       placeholder={"Widget config"}/>
            <div>
                <Typography gutterBottom variant={"label"}>
                    SQL code
                </Typography>
                {sqlCode && <AutoHeightEditor value={sqlCode ?? ""}
                                              defaultLanguage={"sql"}
                                              onChange={(updatedSQL) => {
                                                  setSqlCode(updatedSQL ?? "");
                                              }}/>}
            </div>
            <div>
                <Typography gutterBottom variant={"label"}>
                    Widget config
                </Typography>
                <AutoHeightEditor value={chartOrTableConfig ?? ""}
                                  defaultLanguage={"json"}
                                  onChange={(value) => {
                                      updateChartConfig(value ?? "");
                                  }}/>
            </div>

        </DialogContent>
        <DialogActions>
            <Button onClick={onUpdate}
                    variant={"outlined"}>
                Update
            </Button>
        </DialogActions>
    </Dialog>
}
