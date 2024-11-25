import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Contact } from "src/contacts/domain/models/Contact";
import { ContactDTO } from "src/contacts/domain/dtos/ContactDTO";
import { ContactRepository } from "src/contacts/domain/ports/out/ContactRepository";
export declare class ContactRepositoryAdapter extends PrismaClient implements OnModuleInit, ContactRepository {
    onModuleInit(): Promise<void>;
    createContact(contactData: ContactDTO): Promise<string>;
    searchContact(phone: string): Promise<Contact>;
}