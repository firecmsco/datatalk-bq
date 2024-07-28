import Chart from "chart.js/auto"
import { Colors } from "chart.js";
import { FunnelController, TrapezoidElement } from "chartjs-chart-funnel";

import React, { useEffect } from "react";
import { ChartConfig, WidgetSize } from "../../types";
import { useModeController } from "@firecms/core";

console.log("Colors", Colors);
Chart.register(Colors, FunnelController, TrapezoidElement);

export function ChartView({
                              config,
                              size,
                              ref
                          }: {
    ref?: React.RefObject<HTMLDivElement | null>,
    config: ChartConfig,
    size: WidgetSize
}) {

    const modeController = useModeController();
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        Chart.defaults.font.family = "'Rubik', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif";
        if (modeController.mode === "dark")
            Chart.defaults.color = "#ccc";
        else if (modeController.mode === "light")
            Chart.defaults.color = "#333";

        const current = canvasRef.current;
        if (!current) return;
        if (!config) {
            return;
        }
        const chartConfig = {
            ...config,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    ...config?.options?.plugins
                },
                ...config?.options
            }
        };
        const chart = new Chart(
            current,
            chartConfig as any
        );
        return () => {
            chart.destroy();
        };
    }, [config, modeController.mode]);

    return <div ref={ref} className={"relative flex-grow p-4 bg-white dark:bg-gray-950"}>
        <canvas className={"absolute"} style={{
            top: 16,
            width: size.width
        }}
                ref={canvasRef}/>
    </div>;
}
