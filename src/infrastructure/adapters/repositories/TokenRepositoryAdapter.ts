import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from '@prisma/client';

import { TokenDTO } from "src/domain/dtos/TokenDTO";
import { TokenRepository } from "src/domain/ports/out/TokenRepository";

@Injectable()
export class TokenRepositoryAdapter extends PrismaClient implements OnModuleInit, TokenRepository {
    async onModuleInit() {
        await this.$connect();
    }

    public async createToken(token: TokenDTO): Promise<string> {
        const newToken = await this.token.create({
            data: {
                token: token.token,
                user_uuid: token.user_uuid,
                type: token.type,
                created_at: token.created_at,
                expires_at: token.expires_at,
                status: token.status,
            }
        });
        if(!newToken) {
            throw new Error('Error creating token');
        }
        return 'Token Created';
    }

    public async searchToken(token: string, userUUID: string): Promise<string> {
        const tokenFound = await this.token.findUnique({
            where: {
                token: token,
                AND: {
                    user_uuid: userUUID
                }
            },
        });

        if(!tokenFound) {
            throw new Error('Token not found');
        }

        return tokenFound.token.toString(); // Posiblemente aqui debas retornar un boolean en vez de una cadena
    }

    public async getTokenByUser(uuid: string): Promise<string> {
        return "token"
    }

    public async getTokenStatus(token: string): Promise<string> {
        return "token"
    }
    
    public async getTokenType(token: string): Promise<string> {
        return "token"
    }
}