export interface TransactionsResponse {
    stats: {
        total: number;
        total_deposit: number;
        total_withdrawal: number;
        wallet: Wallet | null;
    };
    table: TransactionRecord[];
}

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

export interface TransactionRecord {
    id: number;
    user_id: number;
    wallet_id: number;
    reference: string;
    amount: string;
    type: "credit" | "debit";
    currency: string; // e.g. "NGN"
    source: string;   // e.g. "deposit", "withdrawal"
    note: string;
    previous_balance: string;
    new_balance: string;
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    wallet: Wallet;
}
