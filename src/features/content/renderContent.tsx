import React from 'react'

type File = {
    name: string
    url: string
}

type ApiRes = {
    code: number
    status: string
    data: {
        svg: File[]
    }
    error: string | null
}

const renderContent = (data: ApiRes | undefined, fileName: string ): JSX.Element => {

    const svg = data?.data?.svg || [];
    const file = svg.find((item: File) => item.name === fileName);
    
    return (
        <img 
            src={file?.url || ''}
            alt={file?.name || ''}     
        />
    )
}

export default renderContent