import {create} from 'zustand'

export type ModalType = "createServer"

interface ModalStore {
    type: ModalType | null,
    isOpen: Boolean;
    onOpen: (type: ModalType) => void
    onClose: ()=>void
}

export const useModal = create<ModalStore> ((set)=>({
    type: null,
    isOpen: false,
    onOpen:(type) => set({isOpen:true, type}),
    onClose: () => set({isOpen:false, type: null}),

}))