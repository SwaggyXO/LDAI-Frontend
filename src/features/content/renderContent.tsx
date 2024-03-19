import { useGetContentQuery } from "../../api/contentApiSlice";

type File = {
    name: string
    url: string
}

const renderContent = (contentParent: string, content: string, fileName: string ): JSX.Element => {

    const { 
        data, 
        error: contentError, 
        isLoading: isContentLoading 
      } = useGetContentQuery({ contentParent, content });

    const svg = data?.data?.svg || [];
    const file = svg.find((item: File) => item.name === fileName);
    
    return (
        isContentLoading ? <div>Loading...</div> :
        contentError ? <div>Error</div> :
        <img 
            src={file?.url || ''}
            alt={file?.name || ''}     
        />
    )
}

export default renderContent