import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

import { ContactRepository } from "src/domain/ports/out/ContactRepository";
import { ContactDTO } from "src/domain/dtos/ContactDTO";

@Injectable()
export class ContactRepositoryAdapter extends PrismaClient implements OnModuleInit, ContactRepository {
    async onModuleInit() {
        await this.$connect();
    }

    public async createContact(contactData: ContactDTO): Promise<string> {
        const newContact = await this.contact.create({
            data: contactData
        })

        if(!newContact) {
            throw new Error('Something wrong happened to create your contact, please verify your info');
        }

        return "contact_uuid: " + newContact.uuid;
    }

    public async searchContact(contact_uuid: string): Promise<ContactDTO> {
        const contact = await this.contact.findUnique({
            where: {
                uuid: contact_uuid
            }
        })

        if(!contact) {
            throw new Error('Contact not found');
        }

        return contact;
    }
}