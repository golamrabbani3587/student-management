import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
    private readonly redisClient: Redis;

    constructor() {
        this.redisClient = new Redis(); // Initialize Redis client
    }

    async incrementCounter(): Promise<number> {
        return await this.redisClient.incr('studentCounter');
    }
    
    async decrementCounter(): Promise<number> {
        return await this.redisClient.decr('studentCounter');
    }
    
    async getCounter(): Promise<number> {
        const count = await this.redisClient.get('studentCounter');
        return parseInt(count || '0');
    }
}
