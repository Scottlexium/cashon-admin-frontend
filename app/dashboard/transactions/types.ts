export interface Wallet {
    id: number;
    user_id: number;
    type: string; // e.g. "pocket"
    balance: string;
    available_balance: string;
    lien_balance: string;
    currency: string; // e.g. "NGN"
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
}

export interface TransactionStats {
    total_deposits: {
        value: string;
        formatted: string;
        percent_change: number;
        trend: "up" | "down";
    };
    total_withdrawals: {
        value: number;
        formatted: string;
        percent_change: number;
        trend: "up" | "down";
    };
    pending_transactions: {
        value: number;
        percent_change: number;
        trend: "up" | "down";
    };
    failed_transactions: {
        value: number;
        percent_change: number;
        trend: "up" | "down";
    };
    period: {
        current: {
            start: string;
            end: string;
        };
        previous: {
            start: string;
            end: string;
        };
    };
}

// New interfaces for deposits API
export interface DepositRecord {
    id: number;
    user_id: number;
    wallet_id: number;
    amount: string;
    status: string;
    reference: string;
    meta: {
        sender_account_name: string;
        sender_account_number: string;
        sender_bank_code: string;
        sender_narration: string;
        sessionId: string;
        trx: string;
    } | null;
    created_at: string;
    updated_at: string;
    wallet: Wallet;
}

// New interfaces for withdrawals API
export interface WithdrawalRecord {
    id: number;
    user_id: number;
    wallet_id: number;
    bank_account_id: number;
    amount: string;
    status: string;
    reference: string;
    refunded: string;
    meta: {
        account_name: string;
        account_number: string;
        amount: string;
        bank_code: string;
        bank_name: string;
        currency: string;
        domain: string;
        event: string;
        fee: string;
        narration: string;
        note: string;
        reference: string;
        sessionid: string | null;
        status: string;
        statusMessage: string;
        timestamp: string;
        trx: string;
    } | null;
    created_at: string;
    updated_at: string;
    wallet: Wallet;
}
