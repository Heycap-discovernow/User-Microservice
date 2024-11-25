import { Injectable, OnModuleInit } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { PrismaClient } from "@prisma/client";

import { Contact } from "src/contacts/domain/models/Contact";
import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";

@Injectable()
export class ContactRepositoryAdapter extends PrismaClient implements OnModuleInit, ContactRepository {
    async onModuleInit() {
        await this.$connect();
    }

    public async createContact(contactData: ContactDTO): Promise<string> {
        const newContact = await this.contact.create({
            data: contactData
        });

        if(!newContact) {
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

        if(!contactFound) {
            throw new RpcException('Contact not found');
        }

        const contact = new Contact(contactFound.name, contactFound.last_name, contactFound.email, contactFound.phone);
        contact.uuid = contactFound.uuid;
        contact.code = contactFound.code;

        return contact;
    }
}