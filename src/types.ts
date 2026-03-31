export type RedisConfig = {
  host: string;
  port: number;
  password?: string;
  db?: number;
  options?: {
    socketTimeout?: number;
    retryTimeout?: number;
    retryAttempts?: number;
  };
};