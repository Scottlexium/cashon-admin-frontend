export interface OverviewResponse {
    admin_name: string;
    metrics: {
        total_deposit: Metric;
        total_withdrawals: Metric;
        active_users: Metric;
    };
    transaction_data: {
        chart_data: ChartData[];
        total_value: number;
        period: string;
        formatted_total: string;
    };
    recent_transactions: Transaction[];
    pending_approvals: PendingApproval[];
    total_deposit: string;
    total_withdrawal: number;
    date_range: {
        start: string; // ISO date
        end: string;   // ISO date
        period: string;
    };
    timestamp: string; // e.g. "2025-09-23 15:55:52"
}

export interface Metric {
    value: string | number;
    formatted: string;
    percentage: number;
    trend: "up" | "down";
    comparison: string;
}

export interface ChartData {
    label: number;
    deposits: string | number;
    withdrawals: string | number;
    total: number;
}

export interface Transaction {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
        avatar: string | null;
    };
    type: string;
    amount: string;
    formatted_amount: string;
    status: string;
    status_color: string;
    date: string;      // formatted date
    timestamp: string; // ISO timestamp
}

export interface PendingApproval {
    id: number;
    name: string | null;
    email: string | null;
    avatar: string;
    date_registered: string;
    days_pending: number;
    timestamp: string;
}
