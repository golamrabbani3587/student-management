import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Hobby } from './hobby.interface';

@Injectable()
export class HobbyAssignmentService {
    private readonly redisClient: Redis;

    constructor() {
        this.redisClient = new Redis();
    }

    async assignRandomHobbyToStudent(studentId: string): Promise<void> {
        const hobbies: Hobby[] = ['Reading', 'Travelling', 'Movies', 'Games'];
        const randomIndex = Math.floor(Math.random() * hobbies.length);
        const randomHobby = hobbies[randomIndex];
        console.log(randomHobby);
        
        await this.redisClient.lpush('hobbyQueue', JSON.stringify({ studentId, hobby: randomHobby }));
    }
}

