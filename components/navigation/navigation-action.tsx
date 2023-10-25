import { Plus } from 'lucide-react'
import React from 'react'

import ActionTooltip from '@/components/action-tooltip'

export default function NavigationAction() {
  return (
    <div>
        <ActionTooltip side='right' align='center' label='Adicione um servidor'>
        <button className='group flex items-center'>
            <div className='flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500'>
                <Plus className='group-hover:text-white trasition text-emerald-500' size={25}/>
            </div>
        </button>
        </ActionTooltip>
    </div>
  )
}
