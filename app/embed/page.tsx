import type { FC } from 'react'
import React from 'react'

import type { IMainProps } from '@/app/components'
import Main from '@/app/components'

const EmbedApp: FC<IMainProps> = ({
    params,
}: any) => {
    return (
        <div className="h-screen w-full overflow-hidden bg-white">
            <Main params={params} />
        </div>
    )
}

export default React.memo(EmbedApp) 
