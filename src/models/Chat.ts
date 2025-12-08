import { Schema, model } from 'mongoose';

export interface IChatMongo {
  nom: string;
  race: string;
  numeroDossier: number;
  dateNaissance: Date;
  tauxEnergie: number;
  sociabiliteHumain: number;
  compatEnfants: number;
  compatChiens: number;
  compatChats: number;
  description: string;
  micropuce: boolean;
  sterilise: boolean;
  vaccinsBase: boolean;
  photos: string[];
  created?: Date;
}

const ChatSchema = new Schema<IChatMongo>({
  nom: { type: String, required: true },
  race: { type: String, required: true },
  numeroDossier: { type: Number, required: true, unique: true },
  dateNaissance: { type: Date, required: true },

  tauxEnergie: { type: Number, min: 1, max: 5, required: true },
  sociabiliteHumain: { type: Number, min: 1, max: 5, required: true },
  compatEnfants: { type: Number, min: 1, max: 5, required: true },
  compatChiens: { type: Number, min: 1, max: 5, required: true },
  compatChats: { type: Number, min: 1, max: 5, required: true },

  description: { type: String, required: true },

  micropuce: { type: Boolean, required: true },
  sterilise: { type: Boolean, required: true },
  vaccinsBase: { type: Boolean, required: true },

  photos: { type: [String], default: [] },

  created: { type: Date, default: Date.now },
});

export const Chat = model<IChatMongo>('Chat', ChatSchema);
export default Chat;
