import { MutatingDots } from "react-loader-spinner"

const Loader = () => {
  return (
    <div className="loader" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <MutatingDots 
            visible={true}
            width="100"
            color="#03045E"
            secondaryColor="#0077B6"
            radius="15"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            wrapperClass="mutating-dots"
        />
    </div>
  )
}

export default Loader