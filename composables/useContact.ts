
import { contactStore } from '~/store/contact'

export function useContact() {

    const contact = contactStore()
    const addContact = async (newContact: any) => {
        try {
            const data = await contact.create(newContact)
            return data
        } catch (error) {
            console.error('Error adding contact:', error)
            throw error
        }
    }
    return {
        addContact,
    }
}