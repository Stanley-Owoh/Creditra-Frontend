/**
 * Discriminator for the Stellar wallets we support in the UI.
 *
 * Each value must correspond to a branch in `src/utils/wallet.ts` and to
 * an option rendered by `WalletConnectionModal`.
 */
export type WalletType = 'freighter' | 'albedo' | 'xbull' | 'rabet';

export interface WalletInfo {
  type: WalletType;
  publicKey: string;
  network: string;
}

/**
 * Lifecycle states of the wallet connection, used by the WalletContext
 * reducer and surfaced to UI for spinners, retry buttons, and badges.
 */
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface WalletError {
  type: 'not_found' | 'connection_failed' | 'wrong_network' | 'user_rejected';
  message: string;
}
