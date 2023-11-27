import {create} from 'zustand'

export type ModalType = "createServer"

interface ModalStore {
    type: ModalType | null,
    isOpen: Boolean;
    onOpen: (type: ModalType) => void
    onClose: ()=>void
}