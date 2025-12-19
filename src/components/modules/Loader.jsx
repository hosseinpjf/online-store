import { Puff } from 'react-loader-spinner'

function Loader() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100dvh - 200px)' }}>
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#53002b"
                ariaLabel="puff-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}

export default Loader