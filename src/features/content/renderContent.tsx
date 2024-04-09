import { Blocks } from "react-loader-spinner";
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
    const png = data?.data?.png || [];
    const file = svg.find((item: File) => item.name === fileName) || png.find((item: File) => item.name === fileName);
    
    return (
        isContentLoading ? <Blocks height={30} width={30}/> :
        contentError ? <div>Error</div> :
        <img 
            src={file?.url || ''}
            alt={file?.name || ''}     
        />
    )
}

export default renderContent