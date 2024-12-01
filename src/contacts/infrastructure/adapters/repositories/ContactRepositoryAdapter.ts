import { Injectable, OnModuleInit } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaClient } from "@prisma/client";

import { Contact } from "src/contacts/domain/models/Contact";
import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";
import { CodeDTO } from "src/contacts/domain/dtos/CodeDTO";

@Injectable()
export class ContactRepositoryAdapter extends PrismaClient implements OnModuleInit, ContactRepository {
    async onModuleInit() {
        await this.$connect();
    }

    public async createContact(contactData: ContactDTO): Promise<string> {
        const newContact = await this.contact.create({
            data: contactData
        });

        if (!newContact) {
            throw new RpcException('Something wrong happened to create your contact, please verify your info');
        }

        return "contact_uuid: " + newContact.uuid;
    }

    public async searchContact(phone: string): Promise<Contact> {
        const contactFound = await this.contact.findUnique({
            where: {
                phone: phone
            }
        });

        if (!contactFound) {
            throw new RpcException('Contact not found');
        }

        const contact = new Contact(contactFound.name, contactFound.last_name, contactFound.email, contactFound.phone);
        contact.uuid = contactFound.uuid;
        // contact.code = contactFound.code;

        return contact;
    }

    public async createCode(code: CodeDTO): Promise<string> {
        const existingCode = await this.code.findFirst({
            where: {
                contact_uuid: code.contact_uuid,
                type: code.type
            }
        });

        if (existingCode) {
            // Actualizar el código existente
            const updatedCode = await this.code.update({
                where: {
                    id: existingCode.id
                },
                data: {
                    code: code.code,
                    expires_at: code.expires_at,
                    created_at: code.created_at
                }
            });

            if (!updatedCode) {
                throw new RpcException("Code not updated");
            }

            return "Code updated successfully";
        } else {
            // Crear un nuevo código
            const saveCode = await this.code.create({
                data: code
            });

            if (!saveCode) {
                throw new RpcException("Code not created");
            }

            return "Code created successfully";
        }
    }

    public async searchCode(contact_uuid: string, type: string): Promise<string> {
        const codeFound = await this.code.findFirst({
            where: {
                contact_uuid: contact_uuid,
                AND: {
                    type: type
                }
            }
        });

        if (!codeFound) {
            throw new RpcException("Code not found");
        }
        return codeFound.code;
    }
}