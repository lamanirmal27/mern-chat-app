import { create } from "zustand";

// Define the type for a conversation object
interface Conversation {
  fullName: string;
  gender: string;
  profilePic: string;
  username: string;
  _id: string;
  __v: number;
}

interface MessageType {
  _id: string;
  senderId: string;
  receiverId: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Define the state and actions interfaces
interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
  messages: MessageType[]; // Adjust the type based on your message structure
  setMessages: (messages: MessageType[]) => void;
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
