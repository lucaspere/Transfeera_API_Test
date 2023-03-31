import { levelDB } from '../repositories/LevelRepository'
import RecipientData from './recipients.json'

(async () => {
    const recipients: any = RecipientData
    await levelDB.batch(recipients.map((recipient: any) => ({
        key: recipient.id!,
        type: 'put',
        value: recipient
    })))
})()