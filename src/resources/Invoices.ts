import { ContactsStatic } from "./../interfaces/ContactsStatic";
import BaseCrud from "./BaseCrud";
import {InvoicesStatic} from "../interfaces/InvoicesStatic";

export default class Invoices extends BaseCrud<
    InvoicesStatic.Invoice,
    InvoicesStatic.Invoice,
    InvoicesStatic.Invoice,
    InvoicesStatic.InvoiceSearchParameters,
    InvoicesStatic.InvoiceCreate,
    InvoicesStatic.InvoiceOverwrite
> {
  constructor(apiToken: string) {
    super(apiToken, "/kb_invoice");
  }
  public async sent(id: number, ressource: Partial<InvoicesStatic.InvoiceSent>): Promise<InvoicesStatic.InvoiceSentAnswer> {
    return this.request<InvoicesStatic.InvoiceSentAnswer>(
        "POST",
        `${this.apiEndpoint}/${id}/send`,
        undefined,
        ressource
    );
  }
}
