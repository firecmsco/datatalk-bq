import React, { useEffect } from "react";
import { DataTalkConfig } from "../DataTalkProvider";
import { CircularProgressCenter, EntityCollection } from "@firecms/core";
import { useLocation, useParams } from "react-router-dom";
import { Dashboard } from "../types";
import { DashboardView } from "../components/dashboards/DashboardView";

export function DashboardRoute({
                                   dataTalkConfig,
                                   onAnalyticsEvent,
                               }: {
    dataTalkConfig: DataTalkConfig,
    onAnalyticsEvent?: (event: string, params?: any) => void,
}) {

    const { dashboardId } = useParams();
    if (!dashboardId) throw Error("Dashboard id not found");

    return <DashboardRouteInner
        key={dashboardId}
        dashboardId={dashboardId}
        dataTalkConfig={dataTalkConfig}
        onAnalyticsEvent={onAnalyticsEvent}/>
}

interface DashboardRouteInnerProps {
    dashboardId: any;
    dataTalkConfig: DataTalkConfig;
    onAnalyticsEvent?: (event: string, params?: any) => void,
    collections?: EntityCollection[]
}

function DashboardRouteInner({
                                 dashboardId,
                                 dataTalkConfig,
                                 onAnalyticsEvent,
                             }: DashboardRouteInnerProps) {

    const location = useLocation();

    const params = new URLSearchParams(location.search);

    const [dashboard, setDashboard] = React.useState<Dashboard | undefined>(undefined);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        setLoading(true);
        return dataTalkConfig.listenDashboard(dashboardId, (dashboard) => {
            setDashboard(dashboard);
            setLoading(false);
        });
    }, [dashboardId]);

    if (loading) {
        return <CircularProgressCenter/>
    }

    if (!dashboard) {
        return <div>Dashboard not found</div>
    }

    return (
        <DashboardView
            dashboard={dashboard}
        />
    )
}
