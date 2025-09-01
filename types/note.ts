export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: NoteTag;
 }
type NoteTag = "Todo"|"Work"|"Personal"|"Meeting"|"Shopping";

export interface FormValues{
    title: string;
    content?: string;
    tag: NoteTag;
}